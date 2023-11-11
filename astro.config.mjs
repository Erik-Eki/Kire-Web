import { defineConfig } from 'astro/config';
import legacy from '@vitejs/plugin-legacy'
import vercel from '@astrojs/vercel/serverless';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import prefetch from '@astrojs/prefetch';
import preact from '@astrojs/preact';
import vue from '@astrojs/vue';
// import alpinejs from '@astrojs/alpinejs';
// import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from './remark-reading-time.mjs';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

// markdown: {
//   remarkPlugins: [remarkReadingTime],
// },
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  integrations: [
    tailwind({
      applyBaseStyles: true
    }), 
    mdx(), 
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        blogPost: 'storyblok/BlogPost',
        blogPostList: 'storyblok/BlogPostList',
        page: 'storyblok/Page',
        //updatePost: "api/update-posts"
      },
      apiOptions: {
        // Choose your Storyblok space region
        region: 'eu' // optional,  or 'eu' (default)
      }
    }), 
    prefetch(),
    svelte(), 
    vue(),
    preact({
      include: ['**/preact/*']
    })
  ]
});