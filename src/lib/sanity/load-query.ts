import type { QueryParams } from '@sanity/client';
import { client, previewClient } from './client';

export interface LoadQueryOptions {
  query: string;
  params?: QueryParams;
  /** `Astro.locals.preview`: read drafts and encode stega for click-to-edit. */
  preview?: boolean;
}

/**
 * Every page reads Sanity through this so one code path serves both the
 * static build (published content, CDN) and the preview server (drafts,
 * live). Content collections cannot do the latter: they snapshot at build.
 */
export async function loadQuery<T>({
  query,
  params = {},
  preview = false,
}: LoadQueryOptions): Promise<T> {
  if (preview) {
    return previewClient().fetch<T>(query, params, {
      perspective: 'drafts',
      stega: true,
      resultSourceMap: 'withKeyArraySelector',
    });
  }
  return client.fetch<T>(query, params);
}
