import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

/** Builds the blog RSS feed; served at `/rss.xml` and `/blog/rss.xml`. */
export async function buildBlogFeed(site: URL) {
  const posts = (await getCollection('blog')).sort(
    (a, b) =>
      b.data.date.valueOf() - a.data.date.valueOf() || b.id.localeCompare(a.id),
  );
  return rss({
    title: 'Shorebird Blog',
    description:
      'Stay up-to-date with the latest news from the Shorebird team.',
    site,
    stylesheet: '/rss/styles.xsl',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.intro ?? post.data.description,
      link: `/blog/${post.id}`,
    })),
  });
}
