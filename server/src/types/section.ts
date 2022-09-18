export interface Section {
  readonly level: number;
  readonly header: string;
  readonly paragraphs: ReadonlyArray<string>;
  readonly subsections: ReadonlyArray<Section>;
}
