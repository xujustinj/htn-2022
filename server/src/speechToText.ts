import * as dotenv from "dotenv";
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

import serviceAccount from "./service_key.json";

dotenv.config();


initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'hackthenorthproj-1663425489368.appspot.com'
});

const bucket = getStorage().bucket();


const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_KEY,
  }),
  serviceUrl: 'https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/c23b276d-bd22-4bba-b646-0f2d20aaa607',
});

export function tTS(summary: any, voiceMode: any, folderName: any) {
  console.log('test');

  const synthesizeParams = {
    text: `${summary}`,
    accept: 'audio/wav',
    voice: `${voiceMode}`,
  };



  textToSpeech.synthesize(synthesizeParams)
    .then(response => {
      return textToSpeech.repairWavHeaderStream(response.result);
    })
    .then(async buffer => {
      const file = bucket.file(`${folderName}/tts.wav`);

      await file.save(buffer, {
        contentType: 'audio/wav',
      }).catch(err => {
        console.log(err);
      })

    })
    .catch(err => {
      console.log('error:', err);
    })
}