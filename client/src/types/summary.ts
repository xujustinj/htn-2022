export interface Sentence {
  readonly text: string;
  readonly keyphrase: string;
  readonly visualSrc: string;
  readonly audioPath: string;
}

export interface Summary extends ReadonlyArray<Sentence> {}

export interface SentenceDetail extends Sentence {
  readonly audioSrc: string;
  readonly durationInSeconds: number;
}

export interface SummaryDetail extends ReadonlyArray<SentenceDetail> {}
