import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

console.log(yaml);

const pagesDir = './original-pages'   // 原 pages 目录
const outDir = './content/articles'
fs.mkdirSync(outDir, { recursive: true })

for (const file of fs.readdirSync(pagesDir)) {
  if (!file.endsWith('.md')) continue
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8')
  const slug = file.slice(0,file.length-3)
  const lines = content.split(/\r?\n/)
  let title = '', description = [], date = '', tags = [], links = [], downloads = [], hide = false
  const bodyLines = []

  for (const line of lines) {
    const words = line.trim().split(/\s+/)
    if (words[0] === '#') {
      title = line.slice(1).trim()
    } else if (words[0] === '!description') {
      description.push(line.slice('!description'.length).trim())
    } else if (words[0] === '!date') {
      date = words[1]
    } else if (words[0] === '!tag') {
      const [, type, value] = line.match(/!tag\s+(\S+)\s+(.+)/) || []
      if (type && value) tags.push([type, value])
    } else if (words[0] === '!link') {
      const [, url, text] = line.match(/!link\s+(\S+)\s+(.+)/) || []
      if (url && text) links.push([url, text])
    } else if (words[0] === '!download') {
      const [, url, text] = line.match(/!download\s+(\S+)\s+(.+)/) || []
      if (url && text) downloads.push([url, text])
    } else if (words[0] === '!hide') {
      hide = words[1] === 'True'
    } else {
      bodyLines.push(line)
    }
  }

  const frontMatter = {
    slug,
    title,
    description,
    date,
    tags,
    links,
    downloads,
    hide
  }

  const yaml1 = `---\n${JSON.stringify(frontMatter, null, 2)}\n---\n${bodyLines.join('\n')}`
  fs.writeFileSync(path.join(outDir, file), yaml1)
}
