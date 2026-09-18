import rss from '@astrojs/rss';
import { kindLabels, loadChangelog } from '@/lib/changelog';
import { toDate } from '@/lib/sanity';

export async function GET({ site }: { site: URL }) {
  const entries = await loadChangelog();
  return rss({
    title: 'Shorebird Changelog',
    description: 'Every improvement to Shorebird, as it ships.',
    site,
    stylesheet: '/rss/styles.xsl',
    items: entries.map((entry) => ({
      title: `${kindLabels[entry.kind]}: ${entry.title}`,
      pubDate: toDate(entry.date),
      description: entry.summary,
      link: `/changelog/#${entry.slug}`,
    })),
  });
}
