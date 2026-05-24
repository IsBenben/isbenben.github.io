import { h } from 'hastscript';
import { toString } from 'hast-util-to-string';
import type { Nodes } from 'hast';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import postcssPresetEnv from 'postcss-preset-env';
import remarkCjkFriendly from 'remark-cjk-friendly';

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2026-04-29',
  modules: ['@nuxt/content', 'nuxt-github-pages', '@nuxtjs/sitemap'],
  plugins: ['~/plugins/fontawesome.ts'],
  site: { url: 'https://isbenben.github.io' },
  sitemap: {
    autoLastmod: true,
    exclude: ['/404', '/405'],
  },
  css: ['~/assets/index.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  nitro: {
    prerender: {
      crawlLinks: true, // 自动抓取所有动态路由
    },
  },
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
  content: {
    build: {
      markdown: {
        rehypePlugins: {
          'remark-cjk-friendly': {
            instance: remarkCjkFriendly,
            options: {},
          },
          'rehype-slug': {
            instance: rehypeSlug,
            options: {},
          },
          'rehype-autolink-headings': {
            instance: rehypeAutolinkHeadings,
            options: {
              behavior: 'append',
              headingProperties: { class: 'section-heading' },
              properties: { class: 'section-link' },
              content(node: Nodes) {
                return [
                  h('span.visually-hidden', '章节', toString(node)),
                  h('span', { ariaHidden: 'true', tabIndex: -1 }, ' §'),
                ];
              },
            },
          },
        },
        highlight: {
          theme: 'dracula',
        },
      },
    },
    renderer: {
      anchorLinks: false,
      alias: {
        code: 'CopyableCode',
        img: 'TitledImg',
      },
    },
  },
  postcss: {
    plugins: {
      'postcss-preset-env': postcssPresetEnv({
        autoprefixer: { grid: true },
      }),
    },
  },
});
