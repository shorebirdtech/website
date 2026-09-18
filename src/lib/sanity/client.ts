import {
  createClient,
  type SanityClient,
  type StegaConfig,
} from '@sanity/client';
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

// Fields whose values are prose an editor would click on. Everything else
// (enum values, code, language ids, slugs) must stay byte-exact because the
// site switches on it.
const editorialFields = new Set([
  'title',
  'description',
  'intro',
  'summary',
  'text',
  'alt',
  'caption',
  'name',
  'jobTitle',
  'industry',
  'companySize',
  'highlights',
]);

const isEditorialText: NonNullable<StegaConfig['filter']> = ({
  sourcePath,
}) => {
  const last = sourcePath[sourcePath.length - 1];
  const parent = sourcePath[sourcePath.length - 2];
  if (typeof last === 'number') return parent === 'highlights';
  return editorialFields.has(String(last));
};

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
    stega: { enabled: true, studioUrl, filter: isEditorialText },
  });
  return previewClientInstance;
}
