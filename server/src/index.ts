import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1'
import { IamAuthenticator } from 'ibm-watson/auth'
import { WikipediaExtractor } from "./extractor";
import { CohereSummarizer } from "./summarizer";
import { tTS } from "./speechToText";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const COHERE_API_KEY = process.env.COHERE_API_KEY!;
const summarizer = new CohereSummarizer(COHERE_API_KEY);
app.post("/summary", async (req, res) => {
  res.json(await summarizer.summarize(req.body.text));
});

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_KEY!,
  }),
  serviceUrl: 'https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/c23b276d-bd22-4bba-b646-0f2d20aaa607',
});
app.get("/voices", (req, res) => {
  textToSpeech.listVoices()
    .then(voices => {
      res.send(JSON.stringify(voices, null, 2))
    })
    .catch(err => {
      console.log('error:', err);
    });
});

app.post("/tts", (req, res) => {
  const { summary, model, folder } = req.body;
  console.log(summary, model, folder);

  tTS(summary, model, folder)
  res.send("success");
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
