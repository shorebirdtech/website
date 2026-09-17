import { buildBlogFeed } from '@/lib/blog-feed';

export async function GET({ site }: { site: URL }) {
  return buildBlogFeed(site);
}
