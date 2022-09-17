import axios from "axios";
import { Section } from "./types/section";

interface MutableSection extends Section {
  level: number;
  header: string;
  body: Array<string>;
  subsections: Array<MutableSection>;
}

export class WikipediaExtractor {
  public async extract(title: string): Promise<Section> {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&formatversion=2&explaintext=1`;
    const text: string = (await axios.get(url)).data.query.pages[0].extract;

    const opening = text.substring(0, text.indexOf("\n\n\n"));
    const stack: Array<MutableSection> = [
      {
        level: 0,
        header: title,
        body: this.getParagraphs(opening),
        subsections: [],
      },
    ];
    for (const match of text.matchAll(/(={2,}) (\w+) ={2,}(.*?)\n\n\n/gms)) {
      const level = match[1].length - 1;
      const header = match[2];
      const body = this.getParagraphs(match[3]);
      while (stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      const section: MutableSection = { level, header, body, subsections: [] };
      stack[stack.length - 1].subsections.push(section);
      stack.push(section);
    }
    console.log(JSON.stringify(stack[0], undefined, 2));
    return stack[0];
  }

  protected getParagraphs(text: string) {
    return text
      .split("\n")
      .map((par) => par.trim())
      .filter((par) => par.length > 0);
  }
}
