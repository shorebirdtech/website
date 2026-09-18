import type { APIRoute } from 'astro';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { previewClient } from '@/lib/sanity/client';
import { previewCookie } from '@/lib/sanity/config';

/**
 * The Studio's Presentation tool opens this with a short-lived secret it
 * stored in the dataset. A valid secret sets the preview cookie and lands on
 * the requested page; anything else is refused, so the preview host serves
 * only published content to the public.
 */
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    previewClient(),
    request.url,
  );
  if (!isValid) return new Response('Invalid preview secret', { status: 401 });
  // The site runs inside the Studio's iframe, a third-party context, so the
  // cookie has to be SameSite=None.
  cookies.set(previewCookie, '1', {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  return redirect(redirectTo, 307);
};
