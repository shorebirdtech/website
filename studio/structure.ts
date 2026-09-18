import type { StructureResolver } from 'sanity/structure';

// Content-first sidebar: the three editorial lists, then the lookup types.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Blog posts'),
      S.documentTypeListItem('successStory').title('Success stories'),
      S.documentTypeListItem('changelogEntry').title('Changelog'),
      S.divider(),
      S.documentTypeListItem('author').title('Authors'),
    ]);
