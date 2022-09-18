import axios from "axios";
import { TextNode } from "../types/textTree";

interface TextNodeWithLevel extends TextNode {
  level: number;
  children: Array<TextNodeWithLevel>;
}

export class WikipediaClient {
  public async extract(title: string): Promise<TextNode> {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&formatversion=2&explaintext=1`;
    const text: string = (await axios.get(url)).data.query.pages[0].extract;

    const opening = text.substring(0, text.indexOf("\n\n\n"));
    const stack: Array<TextNodeWithLevel> = [
      {
        level: 0,
        value: this.getText(opening),
        children: [],
      },
    ];
    for (const match of text.matchAll(/(={2,}) (.*?) ={2,}(.*?)\n\n\n/gms)) {
      const level = match[1].length - 1;
      const value = this.getText(match[3]);
      while (stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      const node = {
        level,
        value,
        children: [],
      };
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    }
    console.log(JSON.stringify(stack[0], undefined, 2));
    return stack[0];
  }

  protected getText(text: string) {
    return text
      .split(/\n+/gms)
      .map((par) => par.trim())
      .filter((par) => par.length > 0)
      .join("\n");
  }
}
