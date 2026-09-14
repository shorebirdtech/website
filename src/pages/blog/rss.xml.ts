// The live site links the feed at `/blog/rss.xml` (footer + blog `<link>`);
// `/rss.xml` is the historical location. Serve the same feed at both.
import { buildBlogFeed } from '@/lib/blog-feed';

export async function GET({ site }: { site: URL }) {
  return buildBlogFeed(site);
}
