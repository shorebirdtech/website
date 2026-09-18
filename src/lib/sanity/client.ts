import { createClient, type SanityClient } from '@sanity/client';
import {
  apiVersion,
  dataset,
  previewDeployment,
  projectId,
  studioUrl,
} from './config';

/** Reads published content. The static build only ever uses this one. */
export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !previewDeployment,
  perspective: 'published',
  stega: { enabled: false, studioUrl },
});

let previewClientInstance: SanityClient | undefined;

/**
 * Reads drafts with stega-encoded source maps so the Studio can map any
 * rendered string back to its field. The token is a runtime secret on the
 * preview server, so it is read from `process.env` rather than baked in at
 * build time.
 */
export function previewClient(): SanityClient {
  if (previewClientInstance) return previewClientInstance;
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) {
    throw new Error('SANITY_API_READ_TOKEN is required for preview mode');
  }
  previewClientInstance = client.withConfig({
    token,
    useCdn: false,
    perspective: 'drafts',
    stega: { enabled: true, studioUrl },
  });
  return previewClientInstance;
}
