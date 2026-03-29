// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';


import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math'

import remarkToc from 'remark-toc';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://sirlilpanda.studio',
  output: "server",
  markdown : {
    shikiConfig: {
      themes : {
        light : 'gruvbox-dark-medium',
        dark : 'gruvbox-light-hard'
      },
    },
    remarkPlugins: [
      [remarkMath, {}],
      [remarkToc, { heading: 'toc', maxDepth: 3 } ],
    ],
    rehypePlugins : [
      [rehypeKatex, {}],
    ]
  },
  integrations: [
    mdx(), 
    sitemap()
  ],
  adapter: cloudflare({
    platformProxy: {
			enabled: true,
		},
  }),
});