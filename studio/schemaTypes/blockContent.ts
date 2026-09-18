import { defineArrayMember, defineField, defineType } from 'sanity';

// Rich text for posts and stories. The set of styles, marks and block types
// is exactly what the existing Markdown corpus uses, so every post migrates
// losslessly and the site's renderer stays small.
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Strike', value: 'strike-through' },
          { title: 'Keyboard key', value: 'kbd' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                validation: (r) =>
                  r.uri({
                    scheme: ['http', 'https', 'mailto'],
                    allowRelative: true,
                  }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (r) => r.required(),
        }),
        defineField({ name: 'caption', type: 'string' }),
      ],
    }),
    defineArrayMember({
      type: 'code',
      options: {
        languageAlternatives: [
          { title: 'Dart', value: 'dart' },
          { title: 'Shell', value: 'sh' },
          { title: 'YAML', value: 'yaml' },
          { title: 'JSON', value: 'json' },
          { title: 'Kotlin', value: 'kotlin' },
          { title: 'Swift', value: 'swift' },
          { title: 'Groovy', value: 'groovy' },
          { title: 'XML', value: 'xml' },
          { title: 'Plain text', value: 'text' },
        ],
      },
    }),
    defineArrayMember({ type: 'table' }),
    defineArrayMember({ type: 'embed' }),
  ],
});
