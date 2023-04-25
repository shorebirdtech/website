import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://shorebirdtech.github.io',
  base: '/website',
  integrations: [react(), tailwind(), mdx()],
});
