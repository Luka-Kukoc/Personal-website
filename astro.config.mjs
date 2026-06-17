// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Deployed at the root of a custom domain, so no `base` path is needed.
  // If you ever switch to a project site (username.github.io/repo), add:
  //   base: '/repo-name',
  site: 'https://koshchei.dev',
  markdown: {
    shikiConfig: {
      // Dark code theme that fits the cyberpunk palette.
      theme: 'github-dark-default',
      wrap: true,
    },
  },
});
