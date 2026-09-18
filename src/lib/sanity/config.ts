export const projectId = 'jrhcct5b';
export const dataset = import.meta.env.SANITY_DATASET || 'production';
export const apiVersion = '2026-09-01';
export const studioUrl =
  import.meta.env.SANITY_STUDIO_URL || 'https://shorebird.sanity.studio';

/**
 * True when built with `PREVIEW_MODE=true`: the server-rendered deployment
 * the Studio's Presentation tool loads. It can read drafts and turns on
 * click-to-edit overlays once `/api/preview/enable` has set the cookie.
 * The production build is static and never has this on.
 */
export const previewDeployment = import.meta.env.PREVIEW_MODE === 'true';

export const previewCookie = 'sanity_preview';
