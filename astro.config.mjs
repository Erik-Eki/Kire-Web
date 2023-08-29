import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import prefetch from "@astrojs/prefetch";
const env = loadEnv("", process.cwd(), 'STORYBLOK');


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    analytics: true
  }),
  experimental: {
    assets: true
  },
  integrations: [svelte(), tailwind(), mdx(), storyblok({
    accessToken: env.STORYBLOK_TOKEN,
    components: {
      blogPost: 'storyblok/BlogPost',
      blogPostList: 'storyblok/BlogPostList',
      page: 'storyblok/Page'
      // Add your components here
    },

    apiOptions: {
      // Choose your Storyblok space region
      region: 'eu' // optional,  or 'eu' (default)
    }
  }), prefetch()]
});