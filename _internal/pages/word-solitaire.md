# 单词接龙
!link https://github.com/IsBenben/Funny-Things/blob/main/word-solitaire.html 源代码
!download /raw/word-solitaire.html 下载
!link /raw/word-solitaire.html 体验
!date 2025/3/7
!description 单词接龙是一个经典的文字游戏，只要新单词的首字母和前一个单词的尾字母相同，就可以接上。
!description 这个网页版游戏支持不会时AI辅助和释义查询。
!tag lang web
!tag inspiration original
!tag content entertainment

单词接龙是一个经典的文字游戏，玩家需要根据前一个单词的尾字母，找到一个以该字母开头的新单词。这个网页版游戏支持 AI 辅助和单词释义查询。

## 基本规则

- **首尾相接**：新单词的首字母需要和前一个单词的尾字母完全相同。
- **单词有效**：单词必须在游戏字典中，否则无效。
- **无重复**：同一个单词在一轮游戏中不能重复使用。
- **大小写敏感**：只有小写字母被接受。

示例如下：

```
apple->elephant->tiger->rabbit
  ->monkey（首尾不相接，无效）
  ->tiger (重复，无效)
  ->ttt（不在字典中，无效）
  ->TURKEY（大小写错误，无效）
  ->turkey（正确接龙）
```

## 操作方法

输入框中输入单词即开始。若没有单词可接龙，会自动显示消息。

在游戏过程中，将鼠标放在单词上，可查看单词的意思。

如果不会，可以点击“询问AI”进行 `AI` 辅助，基于输入匹配单词。

## 游戏特色

词汇库支持约15000词接龙和释义查询，涵盖基础词汇、学术词汇等，自动验证输入的单词是否有效。

释义涵盖基本释义、词性、常见短语对照，可配合玩家理解、学习单词。
