import { defineContentConfig, defineCollection, z } from '@nuxt/content';
import { defineSitemapSchema } from '@nuxtjs/sitemap/content';
import { defineSchemaOrgSchema } from 'nuxt-schema-org/content'
import { defineOgImageSchema } from 'nuxt-og-image/content';

const tupleStringString = z.tuple([z.string(), z.string()]);

export const ArticleMetaSchema = z.object({
  description: z.array(z.string()),
  date: z.string().date(),
  tags: z.array(tupleStringString),
  links: z.array(tupleStringString),
  downloads: z.array(tupleStringString),
  hide: z.boolean(),
  updatedAt: z.string().date(),
  sitemap: defineSitemapSchema(),
  schemaOrg: defineSchemaOrgSchema(),
  ogImage: defineOgImageSchema(),
});

export const InfoSchema = z.object({
  updatedAt: z.string().date(),
  sitemap: defineSitemapSchema(),
});

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
      schema: ArticleMetaSchema,
    }),
    infos: defineCollection({
      type: 'page',
      source: 'infos/**/*.md',
      schema: InfoSchema,
    }),
  },
});
