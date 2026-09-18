import { defineField, defineType } from 'sanity';

export const successStory = defineType({
  name: 'successStory',
  title: 'Success story',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'facts', title: 'Company facts' },
    { name: 'seo', title: 'SEO & sharing' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Customer name',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      description: 'URL path under /success-stories/.',
      options: { source: 'title', maxLength: 96 },
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
        'One-line summary shown on cards and under the customer name.',
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: 'intro',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Optional longer "In this story" summary for the sidebar.',
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
      name: 'highlights',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      description:
        'Short stats such as "Over 1,000 monthly active users". Kept for future layouts; not rendered today.',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'industry', type: 'string', group: 'facts' }),
    defineField({ name: 'companySize', type: 'string', group: 'facts' }),
    defineField({
      name: 'website',
      type: 'url',
      group: 'facts',
      validation: (r) => r.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
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
    select: { title: 'title', subtitle: 'date', media: 'cover' },
  },
});
