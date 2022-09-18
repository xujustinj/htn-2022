import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import fs from "fs";
import { CohereClient } from "./cohere/client";
import { FirebaseClient } from "./firebase/client";
import { PexelsClient } from "./pexels/client";
import { WatsonClient } from "./watson/client";
import { WikipediaClient } from "./wikipedia/client";

dotenv.config();
const CACHE_DIR = process.env.CACHE_DIR || "./.cache";
const COHERE_API_KEY = process.env.COHERE_API_KEY!;
const IBM_API_KEY = process.env.IBM_API_KEY!;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY!;
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const cohereClient = new CohereClient(COHERE_API_KEY);
const firebaseClient = new FirebaseClient();
const pexelsClient = new PexelsClient(PEXELS_API_KEY);
const watsonClient = new WatsonClient(IBM_API_KEY);
const wikipediaClient = new WikipediaClient();

app.post("/summary", async (req, res) => {
  try {
    const { title } = req.body;
    const cachePath = `${CACHE_DIR}/${title}.json`;
    if (fs.existsSync(cachePath)) {
      res.send(fs.readFileSync(cachePath));
    } else {
      const content = await wikipediaClient.extract(title);
      const summary = (await cohereClient.summarizeNode(content, 100)).trim();

      const sentences = (
        summary.endsWith(".")
          ? summary.split(".")
          : summary.split(".").slice(0, -1)
      ).map((s) => s.trim().concat("."));

      const fullSummary = await Promise.all(
        sentences.map(async (sentence, i) => {
          const keyphrase = await cohereClient.getKeyphrase(sentence);
          const visualSrc = await pexelsClient.getVisual(keyphrase);

          const audioPath = `${title}/tts-${i}.wav`;
          await firebaseClient.saveWAV(
            audioPath,
            await watsonClient.textToSpeech(sentence, "en-US_AllisonV3Voice")
          );

          return {
            text: sentence,
            keyphrase,
            visualSrc,
            audioPath,
          };
        })
      );

      const json = JSON.stringify(fullSummary, undefined, 2);
      res.send(json);
      fs.writeFileSync(cachePath, json);
    }
  } catch (e: unknown) {
    console.log(e);
  }
});

app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  console.log(`Server using cache directory ${CACHE_DIR}`);
});
