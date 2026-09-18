import { defineMiddleware } from 'astro:middleware';
import { previewCookie, previewDeployment } from '@/lib/sanity/config';

export const onRequest = defineMiddleware((context, next) => {
  // Cookies are only read on the server-rendered preview deployment; the
  // static build has no request to read them from.
  context.locals.preview =
    previewDeployment && context.cookies.get(previewCookie)?.value === '1';
  return next();
});
