import { defineField, defineType } from 'sanity';

// Product changelog. Rendered at /changelog and exported as /changelog.json
// for the docs site and the console, so keep the field set stable.
export const changelogEntry = defineType({
  name: 'changelogEntry',
  title: 'Changelog entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Anchor on /changelog and the stable id in changelog.json.',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'area',
      type: 'string',
      options: {
        list: [
          { title: 'Code Push', value: 'code-push' },
          { title: 'Console', value: 'console' },
          { title: 'CLI', value: 'cli' },
          { title: 'Docs', value: 'docs' },
          { title: 'Billing', value: 'billing' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kind',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Improved', value: 'improved' },
          { title: 'Fixed', value: 'fixed' },
          { title: 'Deprecated', value: 'deprecated' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      description:
        'Plain text, one or two sentences. This is what other apps show.',
      validation: (r) => r.required().max(400),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      description: 'Optional detail shown only on /changelog.',
    }),
    defineField({
      name: 'link',
      type: 'url',
      description: 'Where to read more: a blog post, docs page, or release.',
      validation: (r) =>
        r.uri({ scheme: ['http', 'https'], allowRelative: true }),
    }),
    defineField({
      name: 'minFlutterVersion',
      title: 'Requires Flutter version',
      type: 'string',
      description:
        'Set when the change only applies from a Shorebird Flutter release onward, e.g. 3.47.4.',
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
    select: { title: 'title', date: 'date', area: 'area', kind: 'kind' },
    prepare: ({ title, date, area, kind }) => ({
      title,
      subtitle: [date, area, kind].filter(Boolean).join(' · '),
    }),
  },
});
