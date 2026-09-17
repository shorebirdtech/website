import type { CollectionEntry } from 'astro:content';

export type SuccessStory = CollectionEntry<'successStories'>;

const covers = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/success-stories/covers/*.{jpeg,jpg,png,gif,webp,avif}',
  { eager: true },
);

/** The cover image (`src/assets/success-stories/covers/<cover>`) of a story. */
export function coverFor(story: SuccessStory): ImageMetadata {
  const cover =
    covers[`/src/assets/success-stories/covers/${story.data.cover}`];
  if (!cover) {
    throw new Error(`Cover image for success story ${story.id} not found`);
  }
  return cover.default;
}

/** Newest first, matching the live index order (CMS `publish-date`). */
export function sortByDate(stories: SuccessStory[]): SuccessStory[] {
  return [...stories].sort(
    (a, b) =>
      b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id),
  );
}
