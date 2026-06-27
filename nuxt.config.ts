import { h } from 'hastscript';
import type { Nodes } from 'hast';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import postcssPresetEnv from 'postcss-preset-env';
import remarkCjkFriendly from 'remark-cjk-friendly';
import { themes, defaultTheme } from './config/themes';

function jsObjectToScssMap(obj: Record<string, any>): string {
  const entries = Object.entries(obj).map(([key, value]) => {
    if (typeof value === 'object') {
      return `"${key}": ${jsObjectToScssMap(value)}`;
    }
    return `"${key}": ${value}`;
  });
  return '(' + entries.join(', ') + ')';
}

const scssAdditionalData = `
  @use 'sass:map';
  $themes: (${jsObjectToScssMap(themes)});
  $defaultTheme: "${defaultTheme}";
  @import '~/assets/themes';
`;

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2026-04-29',
  modules: [
    '@nuxt/content',
    'nuxt-github-pages',
    '@nuxtjs/sitemap',
    '@nuxtjs/color-mode',
  ],
  plugins: ['~/plugins/fontawesome.ts'],
  site: { url: 'https://isbenben.github.io' },
  sitemap: {
    autoLastmod: true,
    exclude: ['/404', '/405'],
    zeroRuntime: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
    },
  },
  css: ['~/assets/index.scss', '@fortawesome/fontawesome-svg-core/styles.css'],
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssAdditionalData,
        },
      },
    },
  },
  colorMode: {
    preference: 'system',
    fallback: defaultTheme,
    storage: 'localStorage',
    storageKey: 'benben-color-mode',
    classPrefix: 'theme-',
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
                if (node.type === 'element' && node.tagName === 'h1') {
                  return [];
                }
                return [
                  h('span.visually-hidden', '章节'),
                  h('span', { ariaHidden: 'true', tabIndex: -1 }, ' §'),
                ];
              },
            },
          },
        },
        highlight: {
          theme: {
            default: 'one-dark-pro',
            dark: 'one-dark-pro',
            light: 'one-light'
          },
        },
        toc: { depth: 3 },
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
