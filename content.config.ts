import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const tupleStringString = z.tuple([z.string(), z.string()]);

export const ArticleMetaSchema = z.object({
  description: z.array(z.string()),
  date: z.string().date(),
  tags: z.array(tupleStringString),
  links: z.array(tupleStringString),
  downloads: z.array(tupleStringString),
  hide: z.boolean(),
  updatedAt: z.string().date(),
});

export const InfoSchema = z.object({
  updatedAt: z.string().date(),
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
