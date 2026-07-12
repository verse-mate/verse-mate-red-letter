/**
 * @versemate/red-letter — words-of-Jesus (red-letter) verse dataset + accessors.
 *
 * `redLetterVerses.json` is the portable source of truth, shared verbatim by
 * verse-mate-web and verse-mate-mobile. It marks every verse that contains any
 * words spoken by Jesus, keyed by canonical bookId (1 = Genesis … 66 =
 * Revelation) → chapter → sorted verse numbers. Derived from the public-domain
 * World English Bible `\wj` markers, so it is translation-independent at the
 * verse level (the same verses are "red letter" in any translation/language).
 */
import redLetterData from './redLetterVerses.json';

export interface RedLetterBook {
  /** Display name, e.g. "Mark". */
  name: string;
  /** USFM book code, e.g. "MRK". */
  usfm: string;
  /** chapter number (as string) → sorted verse numbers containing Jesus's words. */
  chapters: Record<string, number[]>;
}

export interface RedLetterDataset {
  name: string;
  description: string;
  source: string;
  license: string;
  translationBasis: string;
  versification: string;
  /** Semantic highlight color key for the words of Jesus ("red"). */
  color: string;
  granularity: string;
  note: string;
  totalVerses: number;
  /** canonical bookId (as string) → book. */
  books: Record<string, RedLetterBook>;
}

export const RED_LETTER: RedLetterDataset = redLetterData as RedLetterDataset;

/** Highlight color key used for the words of Jesus. */
export const RED_LETTER_COLOR = 'red';

/**
 * Verse numbers in the given chapter that contain words of Jesus.
 * Returns an empty array for chapters (or books) with none.
 */
export function getRedLetterVerses(bookId: number, chapter: number): number[] {
  return RED_LETTER.books[String(bookId)]?.chapters[String(chapter)] ?? [];
}

/** Fast membership check for a single verse. */
export function isRedLetterVerse(bookId: number, chapter: number, verse: number): boolean {
  return getRedLetterVerses(bookId, chapter).includes(verse);
}

/** Whether a book contains any words of Jesus at all. */
export function bookHasRedLetter(bookId: number): boolean {
  return Boolean(RED_LETTER.books[String(bookId)]);
}
