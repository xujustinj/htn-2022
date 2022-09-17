import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { CohereSummarizer } from "./summarizer";

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
