import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImage } from './image';

// Expands an image field with the asset dimensions the <SanityImage>
// component needs for width/height attributes.
const image = `{ ..., asset->{ _id, url, metadata { dimensions, lqip } } }`;

// Body blocks pass through as-is except images, which get their asset expanded.
const body = `body[]{ ..., _type == "image" => ${image} }`;

const author = `author->{ name, "slug": slug.current, jobTitle, github, twitter, avatar ${image} }`;

const postCard = `_id, title, "slug": slug.current, date, description, highlight, cover ${image}`;
const postFull = `${postCard}, intro, seoTitle, seoDescription, ogImage ${image}, ${author}, ${body}`;

// Newest first; same-day posts tie-break by slug the way the live site orders them.
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(date desc, slug.current desc) { ${postCard}, intro }`;
export const postSlugsQuery = `*[_type == "post" && defined(slug.current)].slug.current`;
export const postQuery = `*[_type == "post" && slug.current == $slug][0] { ${postFull} }`;
export const allPostsFullQuery = `*[_type == "post" && defined(slug.current)] { ${postFull} }`;

const storyCard = `_id, title, "slug": slug.current, date, description, cover ${image}`;
const storyFull = `${storyCard}, intro, industry, companySize, website, highlights, seoTitle, seoDescription, ${body}`;

export const storiesQuery = `*[_type == "successStory" && defined(slug.current)] | order(date desc, slug.current asc) { ${storyCard} }`;
export const storiesBySlugsQuery = `*[_type == "successStory" && slug.current in $slugs] { ${storyCard} }`;
export const storyQuery = `*[_type == "successStory" && slug.current == $slug][0] { ${storyFull} }`;
export const allStoriesFullQuery = `*[_type == "successStory" && defined(slug.current)] { ${storyFull} }`;

export const changelogQuery = `*[_type == "changelogEntry" && defined(slug.current)] | order(date desc, _createdAt desc) { _id, title, "slug": slug.current, date, area, kind, summary, link, minFlutterVersion, ${body} }`;

export interface Author {
  name: string;
  slug: string;
  jobTitle?: string;
  github?: string;
  twitter?: string;
  avatar: SanityImage;
}

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  description: string;
  highlight?: boolean;
  cover: SanityImage;
  intro?: string;
}

export interface Post extends PostCard {
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
  author: Author;
  body: PortableTextBlock[];
}

export interface StoryCard {
  _id: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  cover: SanityImage;
}

export interface Story extends StoryCard {
  intro?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  highlights?: string[];
  seoTitle?: string;
  seoDescription?: string;
  body: PortableTextBlock[];
}

export type ChangelogArea =
  'code-push' | 'console' | 'cli' | 'docs' | 'billing';
export type ChangelogKind = 'new' | 'improved' | 'fixed' | 'deprecated';

export interface ChangelogEntry {
  _id: string;
  title: string;
  slug: string;
  date: string;
  area: ChangelogArea;
  kind: ChangelogKind;
  summary: string;
  link?: string;
  minFlutterVersion?: string;
  body?: PortableTextBlock[];
}

/** Sanity `date` fields are `YYYY-MM-DD`; read them as UTC midnight so the
 *  rendered day never shifts with the build machine's zone. */
export const toDate = (date: string) => new Date(`${date}T00:00:00Z`);
