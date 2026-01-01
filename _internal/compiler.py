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

whitespaces = re.compile(r'\s+')
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
def parse_aside(title: str, links: list, download: bool):
    if not links:
        return ''
    links_str = ''
    for url, text in links:
        if download:
            target_file = url.split('/')[-1]
            links_str += f'<li><a download href="{url}" title="将下载为：{target_file}">{text}</a></li>'
        else:
            links_str += f'<li><a href="{url}">{text}</a></li>'
    return aside_item_template \
               .replace('{{title}}', title) \
               .replace('{{links}}', links_str)

with open('template/card.html', 'r', encoding='utf-8') as f:
    card_template = f.read()
def parse_card(id: str, title: str, description: list[str], date: str):
    return card_template \
               .replace('{{id}}', id) \
               .replace('{{title}}', title) \
               .replace('{{descriptions}}', '<br />'.join(description)) \
               .replace('{{date}}', date) \

cards = []
with open('template/page.html', 'r', encoding='utf-8') as f:
    page_template = f.read()
def parse_page(id: str):
    with open(f'pages/{id}.md', 'r', encoding='utf-8') as f:
        text = f.read()

    title = ''
    description = []
    links = []
    downloads = []
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
        else:
            article_lines.append(line)

    aside = parse_aside('相关链接', links, False) + parse_aside('快捷下载', downloads, True)
    content = markdown('\n'.join(article_lines))
    assert isinstance(content, str)
    page = page_template \
               .replace('{{description}}', ' '.join(description)) \
               .replace('{{title}}', title) \
               .replace('{{aside}}', aside) \
               .replace('{{content}}', content)
    write(f'../pages/{id}.html', compress_code(page, 'html'))

    if not hide:
        card = parse_card(id, title, description, date)
        global cards
        cards.append((card, date))

for id in os.listdir('pages'):
    id = id.removesuffix('.md')
    parse_page(id)

with open('template/index.html', 'r', encoding='utf-8') as f:
        index_template = f.read()
def parse_index():
    sorted_cards = sorted(cards, key=lambda x: datetime.strptime(x[1], '%Y/%m/%d'), reverse=True)
    cards_html = ''.join([card_tuple[0] for card_tuple in sorted_cards])
    index = index_template \
               .replace('{{cards}}', cards_html)
    write('../index.html', compress_code(index, 'html'))
parse_index()

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
