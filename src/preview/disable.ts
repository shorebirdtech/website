import type { APIRoute } from 'astro';
import { previewCookie } from '@/lib/sanity/config';

export const GET: APIRoute = ({ cookies, redirect, url }) => {
  cookies.delete(previewCookie, { path: '/' });
  return redirect(url.searchParams.get('to') ?? '/', 307);
};
