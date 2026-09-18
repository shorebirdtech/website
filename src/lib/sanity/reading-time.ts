import type { PortableTextBlock } from '@portabletext/types';

const WORDS_PER_MINUTE = 200;

/** "N min read" from the words in a Portable Text body. */
export function readingTime(body: PortableTextBlock[] | undefined): string {
  if (!body) return '1 min read';
  let words = 0;
  for (const block of body) {
    if (block._type !== 'block') continue;
    for (const child of block.children ?? []) {
      if (typeof child.text === 'string') {
        words += child.text.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}
