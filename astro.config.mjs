import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";

import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    analytics: true,
  }),
  integrations: [svelte(), tailwind(), mdx()]
});