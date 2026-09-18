import rss from '@astrojs/rss';
import { loadQuery, postsQuery, toDate, type PostCard } from '@/lib/sanity';

/** Builds the blog RSS feed; served at `/rss.xml` and `/blog/rss.xml`. */
export async function buildBlogFeed(site: URL) {
  const posts = await loadQuery<PostCard[]>({ query: postsQuery });
  return rss({
    title: 'Shorebird Blog',
    description:
      'Stay up-to-date with the latest news from the Shorebird team.',
    site,
    stylesheet: '/rss/styles.xsl',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: toDate(post.date),
      description: post.intro ?? post.description,
      link: `/blog/${post.slug}`,
    })),
  });
}
