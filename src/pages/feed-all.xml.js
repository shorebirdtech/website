import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    // `<title>` field in output xml
    title: 'Shorebird Blog (All Articles)',
    // `<description>` field in output xml
    description: 'The Shorebird Blog, All Articles',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: 'https://shorebird.dev/blog',
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map((post) => ({
      title: sanitizeHtml(post.data.title),
      pubDate: post.data.pubDate,
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: `/blog/${post.id}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
