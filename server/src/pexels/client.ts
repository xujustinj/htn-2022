import { createClient } from "pexels";

export class PexelsClient {
  protected client: ReturnType<typeof createClient>;

  constructor(apiKey: string) {
    this.client = createClient(apiKey);
  }

  public async getVisual(phrase: string): Promise<string | null> {
    const result = await this.client.photos.search({
      query: phrase,
      per_page: 1,
    });
    if (!("photos" in result)) {
      return null;
    }
    if (result.total_results < 1) {
      return null;
    }
    const photo = result.photos[0];
    return photo.src.medium;
  }
}
