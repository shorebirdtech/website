import { author } from './author';
import { blockContent } from './blockContent';
import { changelogEntry } from './changelogEntry';
import { embed } from './objects/embed';
import { post } from './post';
import { successStory } from './successStory';

export const schemaTypes = [
  post,
  successStory,
  changelogEntry,
  author,
  blockContent,
  embed,
];
