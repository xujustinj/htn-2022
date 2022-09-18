import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import TextToSpeechV1 from "ibm-watson/text-to-speech/v1";
import { IamAuthenticator } from "ibm-watson/auth";
import { WikipediaExtractor } from "./extractor";
import { CohereClient } from "./cohere/client";
import { tts } from "./textToSpeech";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_KEY!,
  }),
  serviceUrl:
    "https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/c23b276d-bd22-4bba-b646-0f2d20aaa607",
});
app.get("/voices", (req, res) => {
  textToSpeech
    .listVoices()
    // @ts-ignore
    .then((voices) => {
      res.send(JSON.stringify(voices, null, 2));
    })
    .catch((err: unknown) => {
      console.log("error:", err);
    });
});

app.post("/tts", (req, res) => {
  const { summary, model, folder } = req.body;
  console.log(summary, model, folder);

  tts(summary, model, folder);
  res.send("success");
});

const COHERE_API_KEY = process.env.COHERE_API_KEY!;
const cohereClient = new CohereClient(COHERE_API_KEY);
const extractor = new WikipediaExtractor();
app.post("/summary", async (req, res) => {
  const { title } = req.body;

  const content = await extractor.extract(title);
  const summary = (await cohereClient.summarizeNode(content, 100)).trim();

  const sentences = (
    summary.endsWith(".") ? summary.split(".") : summary.split(".").slice(0, -1)
  ).map((s) => s.trim().concat("."));

  const fullSummary = await Promise.all(
    sentences.map(async (sentence) => ({
      text: sentence,
      keyphrase: await cohereClient.getKeyphrase(sentence),
    }))
  );

  res.json(fullSummary);

  // coming soon
  // sentences.forEach((s, i) => tts(s, "en-US_AllisonV3Voice", title));
});

app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
});
