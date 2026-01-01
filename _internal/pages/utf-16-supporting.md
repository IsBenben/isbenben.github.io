# Scratch支持UTF-16
!link https://github.com/IsBenben/Funny-Things/blob/main/UTF-16支持.sb3 查看示例程序
!link https://www.bilibili.com/video/BV1iawdejEnG 演示视频
!download /raw/utf-16-supporting.sb3 下载示例程序
!date 2025/2/17
!description Scratch将UTF-16错误地由UCS-2读取。
!description 而Scratch不支持直接获取包含特殊表情字符的长度，或某个字符。
!description 本示例展示如何手动处理字符串，解决该问题。

## 复现过程

```plain
😊😇🥰😍🤩
```

如该表情字符串。如果使用基本的字符串转列表，会将这些表情符号转换成乱码。

## 问题原因

这主要是因为 `UTF-16` 字符串错误地被 `UCS-2` 读取。
* UTF-16是一个**变长表示**，一个Unicode字符可能由1个或2个16位长的码元表示。2个16位长的码元被称为一个代理对，第一个码元为UTF-16标志位。
* UCS-2是一个**固定表示**，每个Unicode字符由2个字节表示。
则UTF-16中由2个16位长的码元表示的字符，在UCS-2中读取会变成两个乱码字符。

## 解决方法

手动处理字符串。当遇到UTF-16标志位，将两个码元合并为一个字符加入列表，否则直接将一个码元加入列表。然后列表中就是正确的字符列表。这样可以通过列表实现正确的字符操作，并同时支持UTF-16中用一个码元表示的字符和代理对。
