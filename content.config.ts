import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const tupleStringString = z.tuple([z.string(), z.string()]);

export const ArticleMetaSchema = z.object({
  description: z.array(z.string()),
  date: z.string(),
  tags: z.array(tupleStringString),
  links: z.array(tupleStringString),
  downloads: z.array(tupleStringString),
  hide: z.boolean(),
});

export const InfoSchema = z.object({
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
