import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import prefetch from "@astrojs/prefetch";
import solidJs from "@astrojs/solid-js";
import preact from "@astrojs/preact";
import vue from "@astrojs/vue";
import alpinejs from "@astrojs/alpinejs";
const env = loadEnv("", process.cwd(), 'STORYBLOK');


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    analytics: true
  }),
  integrations: [svelte(), tailwind({
    applyBaseStyles: true
  }), mdx(), storyblok({
    accessToken: env.STORYBLOK_TOKEN,
    components: {
      blogPost: 'storyblok/BlogPost',
      blogPostList: 'storyblok/BlogPostList',
      page: 'storyblok/Page'
    },
    apiOptions: {
      // Choose your Storyblok space region
      region: 'eu' // optional,  or 'eu' (default)
    }
  }), prefetch(), solidJs({
    include: ['**/solid/*']
  }), preact({
    include: ['**/preact/*']
  }), vue(), alpinejs()]
});