export interface Section {
  readonly level: number;
  readonly header: string;
  readonly body: ReadonlyArray<string>;
  readonly subsections: ReadonlyArray<Section>;
}
