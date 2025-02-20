export interface BibleBook {
  name: string;
  chapters: number[];
}

export interface BibleChapter {
  [verse: string]: string;
}

export interface BibleApiCache {
  books?: BibleBook[];
  chapters: {
    [key: string]: BibleChapter;
  };
}