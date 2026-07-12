# @versemate/red-letter

Words-of-Jesus ("red-letter") verse dataset for VerseMate, shared by
`verse-mate-web` and `verse-mate-mobile` — the single source of truth so the
data lives in one place instead of being duplicated per client.

`src/redLetterVerses.json` marks every Bible verse containing words spoken by
Jesus, keyed by canonical `bookId` (1 = Genesis … 66 = Revelation) → chapter →
sorted verse numbers. It is derived from the public-domain **World English
Bible** `\wj` (words of Jesus) markers, so it is **translation-independent at
the verse level** — the same verses are red in any translation or language.
Currently 2,059 verses across the New Testament.

## Usage

```ts
import {
  getRedLetterVerses,
  isRedLetterVerse,
  bookHasRedLetter,
  RED_LETTER_COLOR,
} from '@versemate/red-letter';

getRedLetterVerses(41, 10);   // Mark 10 → [3, 5, 6, 7, 8, 9, 11, ...]
isRedLetterVerse(41, 10, 29); // true
bookHasRedLetter(1);          // false (Genesis has no words of Jesus)
```

Consumed as a github dependency, e.g.:

```json
"@versemate/red-letter": "github:verse-mate/verse-mate-red-letter#<sha>"
```

Both bundlers (Vite, Metro) resolve the TypeScript entry directly. The dataset
is tiny and static, so it ships in-bundle — no API, works offline and for
signed-out users.
