import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO & sharing' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      description: 'URL path under /blog/. Changing it breaks inbound links.',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publish date',
      type: 'date',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'One or two sentences. Shown on cards, in the RSS feed, and as the "In this article" summary unless Intro is set.',
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: 'intro',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Optional longer "In this article" summary for the sidebar.',
    }),
    defineField({
      name: 'cover',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'highlight',
      title: 'Feature on the blog index',
      type: 'boolean',
      group: 'content',
      initialValue: false,
      description:
        'The newest highlighted post fills the large card at the top of /blog.',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      description: 'Overrides the title in <title> and Open Graph.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Overrides the description in meta tags.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Share image',
      type: 'image',
      group: 'seo',
      description: '1200×630 recommended. Falls back to the site default.',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'cover',
    },
    prepare: ({ title, author, date, media }) => ({
      title,
      subtitle: [date, author].filter(Boolean).join(' · '),
      media,
    }),
  },
});
