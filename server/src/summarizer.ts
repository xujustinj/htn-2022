import cohere from "cohere-ai";

export class CohereSummarizer {
  constructor(apiKey: string) {
    cohere.init(apiKey);
  }

  // TODO: improve this
  protected buildRequest(text: string) {
    return {
      prompt: `${text}\n\nTLDR:`,
      max_tokens: 99,
      stop_sequences: ["."],
      temperature: 0.2,
    };
  }

  public async summarize(text: string) {
    const request = this.buildRequest(text);
    console.log("Cohere request:", JSON.stringify(request, undefined, 2));

    const response = await cohere.generate(request);
    console.log("Cohere response:", JSON.stringify(response, undefined, 2));

    return { summary: response.body.generations[0].text.trim() };
  }
}
