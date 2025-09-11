import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET({ site }: { site: URL }) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Shorebird Blog',
    description:
      'Stay up-to-date with the latest news from the Shorebird team.',
    site: site,
    stylesheet: '/rss/styles.xsl',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}`,
    })),
  });
}
