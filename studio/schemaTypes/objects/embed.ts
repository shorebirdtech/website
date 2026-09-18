import { defineField, defineType } from 'sanity';

const providers = [
  { title: 'YouTube', value: 'youtube' },
  { title: 'Arcade demo', value: 'arcade' },
  { title: 'X / Twitter post', value: 'tweet' },
] as const;

export type EmbedProvider = (typeof providers)[number]['value'];

export const embed = defineType({
  name: 'embed',
  title: 'Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'provider',
      type: 'string',
      options: { list: [...providers], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      description:
        'YouTube: the watch or embed URL. Arcade: the share URL. X: the post URL.',
      validation: (r) => r.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Accessible name for the frame.',
    }),
  ],
  preview: {
    select: { provider: 'provider', url: 'url', title: 'title' },
    prepare: ({ provider, url, title }) => ({
      title: title || providers.find((p) => p.value === provider)?.title,
      subtitle: url,
    }),
  },
});
