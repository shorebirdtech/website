import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from 'sanity/presentation';

// Maps site URLs to documents (so the Presentation tool lists what is on the
// page) and documents to the URLs they appear on (so editors can open a
// document's page from the Structure tool).
export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {
      route: '/blog/:slug',
      filter: `_type == "post" && slug.current == $slug`,
    },
    {
      route: '/success-stories/:slug',
      filter: `_type == "successStory" && slug.current == $slug`,
    },
  ]),
  locations: {
    post: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title ?? 'Untitled', href: `/blog/${doc?.slug}/` },
          { title: 'Blog', href: '/blog/' },
        ],
      }),
    }),
    successStory: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ?? 'Untitled',
            href: `/success-stories/${doc?.slug}/`,
          },
          { title: 'Customer stories', href: '/success-stories/' },
        ],
      }),
    }),
    changelogEntry: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: 'Changelog', href: `/changelog/#${doc?.slug ?? ''}` },
        ],
      }),
    }),
    author: defineLocations({
      message: 'Authors appear on every post they wrote.',
      tone: 'positive',
    }),
  },
};
