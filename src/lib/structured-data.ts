/**
 * schema.org nodes shared by the pages that emit JSON-LD, so the home and
 * About pages describe the company identically.
 */

const siteUrl = 'https://shorebird.dev/';

export const founder = {
  '@type': 'Person',
  '@id': `${siteUrl}#eric-seidel`,
  name: 'Eric Seidel',
  jobTitle: 'CEO and Founder',
  description: 'Creator of Flutter.',
  sameAs: ['https://www.linkedin.com/in/ericseidel/'],
};

export const organization = {
  '@type': 'Organization',
  '@id': `${siteUrl}#organization`,
  name: 'Shorebird',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}shorebird-logo-wordmark.png`,
    width: 2568,
    height: 560,
  },
  description:
    'Shorebird builds developer tools for Flutter teams. Its flagship service, Code Push, delivers over-the-air Dart updates to released Flutter apps without waiting for app store review.',
  foundingDate: '2023',
  founder,
  funder: {
    '@type': 'Organization',
    name: 'Accel',
    url: 'https://www.accel.com/',
  },
  sameAs: [
    'https://github.com/shorebirdtech',
    'https://www.linkedin.com/company/shorebirddev/',
    'https://discord.gg/shorebird',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${siteUrl}pricing`,
    },
    {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      url: 'https://discord.gg/shorebird',
    },
  ],
  legalName: 'Code Town Inc',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2261 Market Street #5112',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94114-1612',
    addressCountry: 'US',
  },
};

export const website = {
  '@type': 'WebSite',
  '@id': `${siteUrl}#website`,
  url: siteUrl,
  name: 'Shorebird',
  publisher: { '@id': `${siteUrl}#organization` },
  inLanguage: 'en-US',
};
