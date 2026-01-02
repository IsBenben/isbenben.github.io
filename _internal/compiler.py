import json
import mistune
import os
import re
from typing import Optional
from datetime import datetime

os.chdir(os.path.dirname(__file__))

# 全局变量保存特殊标记字符串
DONT_COMPRESS_NEWLINE = '<dont-compress-newline>'
DONT_COMPRESS_SPACE = '<dont-compress-space>'

# 创建自定义渲染器来处理代码块
class CustomRenderer(mistune.HTMLRenderer):
    def block_code(self, code: str, info: Optional[str] = None) -> str:
        # 处理代码块中的换行和空格
        return super().block_code(code, info) \
                  .replace('\n', DONT_COMPRESS_NEWLINE) \
                  .replace(' ', DONT_COMPRESS_SPACE)

plugins = ['strikethrough', 'footnotes', 'table', 'url', 'task_lists', 'def_list', 'abbr', 'insert', 'superscript', 'subscript', 'ruby']
markdown = mistune.create_markdown(plugins=plugins, renderer=CustomRenderer())

whitespaces = re.compile(r'\s\s+')
css_comment = re.compile(r'/\*.*?\*/', re.DOTALL)
css_inset = re.compile(r'inset:\s*(.*?);', re.DOTALL)
def compress_code(code: str, lang: str = ''):
    if lang == 'css':
        code = css_comment.sub('', code)
        code = css_inset.sub(lambda m: f'left:{m.group(1)};right:{m.group(1)};top:{m.group(1)};bottom:{m.group(1)};', code)
    code = whitespaces.sub(' ', code)

    # 处理代码块中的特殊标记
    code = code.replace(DONT_COMPRESS_NEWLINE, '\n')
    code = code.replace(DONT_COMPRESS_SPACE, ' ')
    return code

def write(file: str, content: str | bytes):
    os.makedirs(os.path.dirname(file), exist_ok=True)
    if isinstance(content, str):
        content = content.encode('utf-8')
    with open(file, 'wb') as f:
        f.write(content)

with open('template/aside-item.html', 'r', encoding='utf-8') as f:
    aside_item_template = f.read()
def parse_aside(title: str, content: str):
    if not content:
        return ''
    return aside_item_template \
               .replace('{{title}}', title) \
               .replace('{{content}}', content)

with open('template/card.html', 'r', encoding='utf-8') as f:
    card_template = f.read()
def parse_card(id: str, title: str, description: list[str], date: str, tags_html: str):
    return card_template \
               .replace('{{id}}', id) \
               .replace('{{title}}', title) \
               .replace('{{descriptions}}', '<br />'.join(description)) \
               .replace('{{date}}', date) \
               .replace('{{tags}}', tags_html)

with open('template/tag.html', 'r', encoding='utf-8') as f:
    tag_template = f.read()
with open('tags.json', 'r', encoding='utf-8') as f:
    tags = json.load(f)
def parse_tag(type: str, text: str):
    width = round(sum(0.6 if ord(c) < 256 else 1 for c in text) + 1, 2)
    return tag_template \
               .replace('{{type}}', type) \
               .replace('{{type_name}}', tags[type]['name']) \
               .replace('{{type_description}}', tags[type]['description']) \
               .replace('{{text}}', text) \
               .replace('{{text_name}}', tags[type]['value'][text]['name']) \
               .replace('{{text_description}}', tags[type]['value'][text]['description']) \
               .replace('{{width}}', str(width))

with open('template/metadata-aside.html', 'r', encoding='utf-8') as f:
    metadata_aside_template = f.read()
def parse_metadata_aside(date: str, tags_html: str):
    return metadata_aside_template \
               .replace('{{date}}', date) \
               .replace('{{tags}}', tags_html)

cards = []
with open('template/page.html', 'r', encoding='utf-8') as f:
    page_template = f.read()
def parse_page(id: str):
    with open(f'pages/{id}.md', 'r', encoding='utf-8') as f:
        text = f.read()

    title = ''
    description: list[str] = []
    links: list[list[str]] = []
    downloads: list[list[str]] = []
    tags: list[list[str]] = []
    date = ''
    hide = False

    lines = text.splitlines()
    article_lines = []
    for line in lines:
        words = line.split(maxsplit=1)
        if len(words) < 2:
            article_lines.append(line)
            continue
        keyword = words[0]
        if keyword == '#':
            title = words[1]
        elif keyword == '!description':
            description.append(words[1])
        elif keyword == '!date':
            date = words[1]
        elif keyword == '!link':
            link = words[1].split(maxsplit=1)
            links.append(link)
        elif keyword == '!download':
            download = words[1].split(maxsplit=1)
            downloads.append(download)
        elif keyword == '!hide':
            if words[1] == 'True':
                hide = True
        elif keyword == '!tag':
            tag = words[1].split(maxsplit=1)
            tags.append(tag)
        else:
            article_lines.append(line)

    tags_html = ''.join([parse_tag(tag, text) for tag, text in tags])
    metadata_str = parse_metadata_aside(date, tags_html)
    links_str = ''
    for url, text in links:
        links_str += f'<li><a href="{url}">{text}</a></li>'
    if links:
        links_str = f'<ul>{links_str}</ul>'
    downloads_str = ''
    for url, text in downloads:
        target_file = url.split('/')[-1]
        downloads_str += f'<li><a download href="{url}" title="将下载为：{target_file}">{text}</a></li>'
    if downloads:
        downloads_str = f'<ul>{downloads_str}</ul>'
    aside = parse_aside('文章信息', metadata_str) + parse_aside('相关链接', links_str) + parse_aside('快捷下载', downloads_str)

    content = markdown('\n'.join(article_lines))
    assert isinstance(content, str)
    page = page_template \
               .replace('{{description}}', ' '.join(description)) \
               .replace('{{title}}', title) \
               .replace('{{aside}}', aside) \
               .replace('{{content}}', content)
    write(f'../pages/{id}.html', compress_code(page, 'html'))

    if not hide:
        card = parse_card(id, title, description, date, tags_html)
        global cards
        cards.append((card, date, tags))

for id in os.listdir('pages'):
    id = id.removesuffix('.md')
    parse_page(id)

sorted_cards = sorted(cards, key=lambda x: datetime.strptime(x[1], '%Y/%m/%d'), reverse=True)

with open('template/index.html', 'r', encoding='utf-8') as f:
        index_template = f.read()
def parse_index():
    cards_html = ''.join([card_tuple[0] for card_tuple in sorted_cards])
    index = index_template \
               .replace('{{cards}}', cards_html)
    write('../index.html', compress_code(index, 'html'))
parse_index()

with open('template/tags.html', 'r', encoding='utf-8') as f:
    tags_template = f.read()
for type in tags:
    type_name = tags[type]['name']
    type_description = tags[type]['description']
    for text in tags[type]['value']:
        text_name = tags[type]['value'][text]['name']
        text_description = tags[type]['value'][text]['description']
        text_cards = ''
        for card, date, card_tags in sorted_cards:
            if [type, text] in card_tags:
                text_cards += card
        tags_page = tags_template \
                   .replace('{{type}}', type) \
                   .replace('{{type_name}}', type_name) \
                   .replace('{{type_description}}', type_description) \
                   .replace('{{text}}', text) \
                   .replace('{{text_name}}', text_name) \
                   .replace('{{text_description}}', text_description) \
                   .replace('{{cards}}', text_cards)
        write(f'../tags/{type}-{text}.html', compress_code(tags_page, 'html'))

for public_file in os.walk('public'):
    dirpath, dirnames, filenames = public_file
    for file in filenames:
        file_suffix = file.split('.')[-1]
        should_compress = file_suffix in ['html', 'css', 'js']
        target_path = f'../{dirpath.replace("public", "")}/{file}'
        if should_compress:
            with open(f'{dirpath}/{file}', 'r', encoding='utf-8') as f:
                content = f.read()
            write(target_path, compress_code(content, file_suffix))
        else:
            with open(f'{dirpath}/{file}', 'rb') as f:
                content = f.read()
            write(target_path, content)

for raw_file in os.walk('raw'):
    dirpath, dirnames, filenames = raw_file
    for file in filenames:
        with open(f'{dirpath}/{file}', 'rb') as f:
            content = f.read()
        write(f'../{dirpath}/{file}', content)
