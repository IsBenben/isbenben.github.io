---
{
  "description": ["本文介绍了在rehype中通过两个插件，实现的自定义哈希与章节符号，并提供其配置方法。"],
  "date": "2026/05/16",
  "tags":
    [["lang", "web"], ["inspiration", "original"], ["content", "snippet"]],
  "links": [],
  "downloads": [],
  "hide": false,
}
---

# Nuxt Content自定义哈希与章节符号

## 代码说明

Nuxt基于Vue，用于构建Web应用，支持文件路由，服务端渲染等功能。Nuxt Content可管理Markdown等内容并自动渲染。

本文介绍了在`rehype`中通过两个插件，实现的自定义哈希与章节符号，并提供其配置方法。

## 前置条件

本文基于`node v24`，`npm 11`，`nuxt 4`和`nuxt content 3`。

首先需要`rehype-slug`和`rehype-autolink-headings`两个插件，可以通过`npm`安装。

```bash
npm install rehype-slug
npm install rehype-autolink-headings
```

文档可以在`Github`上找到：
- https://github.com/rehypejs/rehype-slug
- https://github.com/rehypejs/rehype-autolink-headings

## 核心代码

<!-- prettier-ignore -->
```typescript
import { h } from 'hastscript';
import type { Nodes } from 'hast';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export default defineNuxtConfig({
  // 省略其他配置……
  content: {
    build: {
      markdown: {
        rehypePlugins: {
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
                  h('span', { ariaHidden: 'true', tabIndex: -1 }, ' §'),
                ];
              },
            },
          },
        },
      },
    },
  },
});
```

## 代码解释

在代码中，首先配置了`rehype-slug`插件生成`id`属性。该插件中使用了`github-slugger`的生成方式，兼容多语言。注意渲染未经授权的Markdown**可能造成跨站脚本攻击**，可参考文档配置单独前缀。

之后配置了`rehype-autolink-headings`插件。注意该插件仅对有id属性的元素生效。配置支持多种方式，可参考文档。本示例使用了追加（`append`）模式，添加`span`并带有分节符。在`properties`中可以配置元素的额外属性。
