import * as dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import TextToSpeechV1 from "ibm-watson/text-to-speech/v1";
import { IamAuthenticator } from "ibm-watson/auth";
import Readable from "stream";

import serviceAccount from "./service_key.json";

dotenv.config();

initializeApp({
  // @ts-ignore
  credential: cert(serviceAccount),
  storageBucket: "hackthenorthproj-1663425489368.appspot.com",
});

const bucket = getStorage().bucket();

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_KEY!,
  }),
  serviceUrl:
    "https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/c23b276d-bd22-4bba-b646-0f2d20aaa607",
});

export function tts(summary: any, voiceMode: any, folderName: any) {
  console.log("test");

  const synthesizeParams = {
    text: `${summary}`,
    accept: "audio/wav",
    voice: `${voiceMode}`,
  };

  textToSpeech
    .synthesize(synthesizeParams)
    .then(({ result }) =>
      // @ts-ignore
      textToSpeech.repairWavHeaderStream(result)
    )
    .then(async (buffer: Buffer) => {
      const file = bucket.file(`${folderName}/tts.wav`);

      await file
        .save(buffer, {
          contentType: "audio/wav",
        })
        .catch((err: unknown) => {
          console.log(err);
        });
    })
    .catch((err: unknown) => {
      console.log("error:", err);
    });
}
