import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const tupleStringString = z.tuple([z.string(), z.string()])

export const ArticleMetaSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.array(z.string()),
  date: z.string(),                        // 格式示例："2025/8/14"，可进一步用 regex 校验
  tags: z.array(tupleStringString),        // 例如 [["lang", "web"], ["inspiration", "localization"]]
  links: z.array(tupleStringString),       // 例如 [["https://...", "隐藏成就攻略"]]
  downloads: z.array(tupleStringString),   // 例如 [["/raw/xxx", "下载"]]
  hide: z.boolean()
})

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: ArticleMetaSchema
    })
  }
})