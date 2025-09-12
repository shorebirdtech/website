import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET({ site }: { site: URL }) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );
  return rss({
    title: 'Shorebird Blog',
    description:
      'Stay up-to-date with the latest news from the Shorebird team.',
    site: site,
    stylesheet: '/rss/styles.xsl',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}`,
    })),
  });
}
