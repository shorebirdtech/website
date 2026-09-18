import {
  changelogQuery,
  loadQuery,
  toDate,
  type ChangelogArea,
  type ChangelogEntry,
  type ChangelogKind,
} from '@/lib/sanity';

export const areaLabels: Record<ChangelogArea, string> = {
  'code-push': 'Code Push',
  console: 'Console',
  cli: 'CLI',
  docs: 'Docs',
  billing: 'Billing',
};

export const kindLabels: Record<ChangelogKind, string> = {
  new: 'New',
  improved: 'Improved',
  fixed: 'Fixed',
  deprecated: 'Deprecated',
};

export async function loadChangelog(
  preview = false,
): Promise<ChangelogEntry[]> {
  return loadQuery<ChangelogEntry[]>({ query: changelogQuery, preview });
}

/** The public JSON shape served at `/changelog.json`. Other apps read this,
 *  so fields are added, never renamed. */
export interface ChangelogFeedEntry {
  id: string;
  title: string;
  /** `YYYY-MM-DD` */
  date: string;
  area: ChangelogArea;
  area_label: string;
  kind: ChangelogKind;
  kind_label: string;
  summary: string;
  /** Permalink on shorebird.dev. */
  url: string;
  /** Where to read more, when the entry has one. */
  link?: string;
  min_flutter_version?: string;
}

export function toFeedEntry(
  entry: ChangelogEntry,
  site: URL,
): ChangelogFeedEntry {
  return {
    id: entry.slug,
    title: entry.title,
    date: entry.date,
    area: entry.area,
    area_label: areaLabels[entry.area],
    kind: entry.kind,
    kind_label: kindLabels[entry.kind],
    summary: entry.summary,
    url: new URL(`/changelog/#${entry.slug}`, site).toString(),
    ...(entry.link ? { link: entry.link } : {}),
    ...(entry.minFlutterVersion
      ? { min_flutter_version: entry.minFlutterVersion }
      : {}),
  };
}

/** Entries grouped by month, newest month first, for the timeline. */
export function groupByMonth(entries: ChangelogEntry[]) {
  const groups = new Map<
    string,
    { label: string; entries: ChangelogEntry[] }
  >();
  for (const entry of entries) {
    const date = toDate(entry.date);
    const key = entry.date.slice(0, 7);
    const group = groups.get(key) ?? {
      label: new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date),
      entries: [],
    };
    group.entries.push(entry);
    groups.set(key, group);
  }
  return [...groups.values()];
}
