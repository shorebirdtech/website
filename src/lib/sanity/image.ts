import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { dataset, projectId } from './config';

const builder = createImageUrlBuilder({ projectId, dataset });

/** Image dimensions the queries expand from `asset->metadata`. */
export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: { width: number; height: number; aspectRatio: number };
    lqip?: string;
  };
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset;
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

/** A URL builder for `source`, already set to serve WebP/AVIF where supported. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format');
}

/** `srcset` at the given widths; crop/hotspot on the image are honoured. */
export function srcSet(image: SanityImage, widths: number[]): string {
  return widths.map((w) => `${urlFor(image).width(w).url()} ${w}w`).join(', ');
}

/** 1200×630 JPEG for Open Graph cards; social crawlers do not take AVIF/WebP. */
export function ogImageUrl(image: SanityImage): string {
  return builder
    .image(image)
    .width(1200)
    .height(630)
    .fit('crop')
    .format('jpg')
    .url();
}
