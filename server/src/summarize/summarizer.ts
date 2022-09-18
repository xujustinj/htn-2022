import cohere from "cohere-ai";
import { Section } from "../types/section";
import { shortSamples, longSamples } from "./samples";

const PROMPT_HEAD =
  "Summarize the following in an informal and accessible way.";
const TLDR_PROMPT = "Summary";
const DELIMITER = "--";
export class CohereSummarizer {
  constructor(apiKey: string) {
    cohere.init(apiKey);
  }

  protected buildSample(sample: {
    readonly headers: ReadonlyArray<string>;
    readonly paragraphs: ReadonlyArray<string>;
    readonly summary?: string;
  }) {
    return [
      sample.headers.join(" - "),
      sample.paragraphs.join("\n"),
      sample.summary === undefined
        ? `${TLDR_PROMPT}:`
        : `${TLDR_PROMPT}: ${sample.summary}`,
    ].join("\n\n");
  }

  protected buildRequest(
    headers: ReadonlyArray<string>,
    paragraphs: ReadonlyArray<string>,
    long: boolean
  ) {
    const prompt = [
      PROMPT_HEAD,
      ...(long ? longSamples : shortSamples).map((sample) =>
        this.buildSample(sample)
      ),
      this.buildSample({ headers, paragraphs }),
    ].join(`\n${DELIMITER}\n`);

    return {
      model: "large",
      prompt,
      max_tokens: 256,
      stop_sequences: ["--"],
      temperature: 0.3,
    };
  }

  protected async summarize(
    headers: ReadonlyArray<string>,
    paragraphs: ReadonlyArray<string>,
    long: boolean
  ) {
    if (paragraphs.length === 1 && paragraphs[0].split(" ").length < 32) {
      return paragraphs[0];
    }

    const request = this.buildRequest(headers, paragraphs, long);
    console.log("Cohere request:", JSON.stringify(request, undefined, 2));

    const response = await cohere.generate(request);
    console.log("Cohere response:", JSON.stringify(response, undefined, 2));

    return response.body.generations[0].text.split("--")[0].trim();
  }

  public async summarizeSection(
    section: Section
  ): Promise<ReadonlyArray<string>> {
    let summaries: Array<Promise<string>> = [];

    const traverse = (
      parentHeaders: ReadonlyArray<string>,
      { header, paragraphs, subsections }: Section
    ) => {
      const headers = [...parentHeaders, header];
      if (section.paragraphs.length > 0) {
        summaries.push(this.summarize(headers, paragraphs, false));
      }
      subsections.forEach((sub) => traverse(headers, sub));
    };
    traverse([], section);

    const summary = await Promise.all(summaries);
    console.log(summary.join("\n"));
    const finalSummary = (
      await this.summarize([section.header], summary, true)
    ).trim();

    return (
      finalSummary.endsWith(".")
        ? finalSummary.split(".")
        : finalSummary.split(".").slice(undefined, -1)
    )
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => s.concat("."));
  }
}
