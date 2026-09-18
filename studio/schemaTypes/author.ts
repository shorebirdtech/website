import { defineField, defineType } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description:
        'Stable key, e.g. the GitHub handle. Used in URLs and imports.',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Title',
      type: 'string',
      description: 'Shown next to the name on posts, e.g. "Founding Engineer".',
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'github', title: 'GitHub handle', type: 'string' }),
    defineField({
      name: 'twitter',
      title: 'X / Twitter handle',
      type: 'string',
      description: 'With the leading @. Emitted as twitter:creator on posts.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'jobTitle', media: 'avatar' },
  },
});
