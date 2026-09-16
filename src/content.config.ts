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
    // Fields imported from the Webflow CMS (scripts/import_webflow.py).
    intro: z.string().optional(),
    readingTime: z.string().optional(),
    ogImage: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    highlight: z.boolean().default(false),
  }),
});

const successStoriesCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/success-stories',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    date: z.date().transform(convertDateToUTC),
    highlights: z.array(z.string()).default([]),
    // Fields imported from the Webflow CMS (scripts/import_webflow.py).
    industry: z.string().optional(),
    companySize: z.string().optional(),
    website: z.string().optional(),
    intro: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  successStories: successStoriesCollection,
};
