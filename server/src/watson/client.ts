import { IamAuthenticator } from "ibm-watson/auth";
import TextToSpeechV1 from "ibm-watson/text-to-speech/v1";

export class WatsonClient {
  protected tts: TextToSpeechV1;

  constructor(apiKey: string) {
    this.tts = new TextToSpeechV1({
      authenticator: new IamAuthenticator({
        apikey: apiKey,
      }),
      serviceUrl:
        "https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/c23b276d-bd22-4bba-b646-0f2d20aaa607",
    });
  }

  public async textToSpeech(text: string, voice: string): Promise<Buffer> {
    const { result } = await this.tts.synthesize({
      text,
      accept: "audio/wav",
      voice,
    });

    // @ts-ignore
    return await this.tts.repairWavHeaderStream(result);
  }
}
