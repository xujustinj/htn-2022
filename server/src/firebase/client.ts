import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

import serviceAccount from "./service_key.json";

export class FirebaseClient {
  protected readonly bucket;

  constructor() {
    initializeApp({
      // @ts-ignore
      credential: cert(serviceAccount),
      storageBucket: "hackthenorthproj-1663425489368.appspot.com",
    });

    this.bucket = getStorage().bucket();
  }

  public async saveWAV(path: string, buffer: Buffer) {
    await this.bucket.file(path).save(buffer, { contentType: "audio/wav" });
  }
}
