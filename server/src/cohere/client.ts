import cohere from "cohere-ai";
import { TextNode } from "../types/textTree";
import { Sample } from "../types/sample";
import {
  keyphraseSamples,
  longSummarySamples,
  shortSummarySamples,
} from "./samples";

const DELIMITER = "--";

function wordCount(text: string) {
  return text.split(/\s+/gms).length;
}

export class CohereClient {
  constructor(apiKey: string) {
    cohere.init(apiKey);
  }

  protected buildSample(signifier: string, { query, response }: Sample) {
    return `${query}\n${signifier} ${response}`;
  }

  protected buildRequest(
    preamble: string,
    signifier: string,
    trainingSamples: ReadonlyArray<Sample>,
    job: Sample,
    maxTokens: number
  ) {
    const prompt = [
      preamble,
      ...trainingSamples.map((sample) => this.buildSample(signifier, sample)),
      this.buildSample(signifier, job),
    ].join(`\n\n${DELIMITER}\n\n`);

    return {
      model: "large",
      prompt: prompt.trim(),
      max_tokens: maxTokens,
      stop_sequences: [DELIMITER],
      temperature: 0.3,
    };
  }

  protected async cohere(
    preamble: string,
    signifier: string,
    trainingSamples: ReadonlyArray<Sample>,
    job: Sample,
    options: {
      maxTokens?: number;
      bounceLength?: number;
    } = {}
  ) {
    const maxTokens = options.maxTokens ?? 128;
    const bounceLength = options.bounceLength ?? 0;

    if (wordCount(job.query) < bounceLength) {
      return job.query;
    }

    const request = this.buildRequest(
      preamble,
      signifier,
      trainingSamples,
      job,
      maxTokens
    );
    // console.log("Cohere request:", JSON.stringify(request, undefined, 2));

    const response = await cohere.generate(request);
    // console.log("Cohere response:", JSON.stringify(response, undefined, 2));

    console.log(
      `\n\n========\n\n${request.prompt}${response.body.generations[0].text}`
    );

    return response.body.generations[0].text.split(DELIMITER)[0].trim();
  }

  public async summarizeNode(node: TextNode, quota: number): Promise<string> {
    const preamble =
      "Summarize the following in an informal and accessible way.";
    const signifier = "Summary:";

    if (node.children.length === 0) {
      return this.cohere(
        preamble,
        signifier,
        shortSummarySamples,
        {
          query: node.value,
          response: "",
        },
        { bounceLength: 32 }
      );
    } else {
      let summaries: Array<Promise<string>> = [];

      if (wordCount(node.value) > 0) {
        summaries.push(
          this.cohere(
            preamble,
            signifier,
            shortSummarySamples,
            {
              query: node.value,
              response: "",
            },
            { bounceLength: 32 }
          )
        );
      }

      summaries.push(
        ...node.children.map((child) => this.summarizeNode(child, quota))
      );

      const summary = (await Promise.all(summaries)).join(" ");
      let condensate = "";
      while (wordCount(condensate) < quota) {
        condensate +=
          " " +
          (await this.cohere(
            preamble,
            signifier,
            longSummarySamples,
            {
              query: summary,
              response: condensate,
            },
            { bounceLength: 0 }
          ));
      }

      return condensate;
    }
  }

  public async getKeyphrase(text: string): Promise<string> {
    const preamble = "Generate a visual description of each phrase.";
    const signifier = "Visual:";

    return this.cohere(
      preamble,
      signifier,
      keyphraseSamples,
      {
        query: text,
        response: "",
      },
      { maxTokens: 8 }
    );
  }
}
