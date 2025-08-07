import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const convertDateToUTC = (date: Date) =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  );

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.date().transform(convertDateToUTC),
    cover: z.string(),
  }),
});

const successStoriesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/success-stories' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    date: z.date().transform(convertDateToUTC),
    highlights: z.array(z.string()),
  }),
});

const jobsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    type: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  successStories: successStoriesCollection,
  jobs: jobsCollection,
};
