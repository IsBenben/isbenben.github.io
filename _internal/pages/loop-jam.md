# 2^1024 Loops
!link https://www.bilibili.com/video/BV1vhbkzPEJv/ 隐藏成就攻略
!link https://github.com/IsBenben/loop-jam-cn 关联仓库（汉化插件版）
!link https://mrredshark77.github.io/loop-jam/ 关联仓库（英文原版）
!link https://isbenben.github.io/loop-jam-cn 体验：汉化插件版
!link https://html-classic.itch.zone/html/14534996/index.html 体验：英文原版（链接1）
!link https://mrredshark77.github.io/loop-jam/ 体验：英文原版（链接2）
!date 2025/8/14
!description 2^1024 Loops 是由 MrRedShark77 在 GMTK Game Jam 2025 上制作的游戏。游戏的目标是通过编程，达到 2^1024（约 1.8x10^308）。
!description 本文章提供游戏相关教程和攻略。
!tag lang scratch3
!tag inspiration localization
!tag content entertainment

## 游戏介绍

`2^1024 Loops` 是由[MrRedShark77](https://github.com/MrRedShark77)在[GMTK Game Jam 2025](https://gamemakerstoolkit.com/)上制作的游戏。游戏的目标是通过编程，达到 `2^1024`（约 `1.8x10^308`）。

通过鼠标操作，移动各种代码，拼接复杂的程序。说明见下图：

![代码操作说明示意图](https://isbenben.github.io/loop-jam-cn/textures/help.png)

单击"运行（Run）"按钮可以运行代码，依次运行成为一个"`loop`"。会实时展现当前运行状态，再按一次可以加速（Fast）运行一整轮代码。

游戏有一个个目标（goal）：让`P`变量达到一个值。达到的值随游戏进程而增大。

在完成目标后，可以从`6`项奖励（Reward）中选择最多`3`项奖励。奖励有`5`个等级，获得概率递减。若找不到自己想要的奖励，可以使用 3 次"重掷（Reroll）"机会，生成新的 6 项奖励。选择奖励代码后，可以在后续的 loop 中使用。

在达到 2^1024 后，还可以选择开启无尽模式（Endless Mode）。无尽模式顾名思义，没有真正的结束，但是你可以无限挑战自己的 P，冲向属于你的极限。

游戏还有一些成就（Achievement）等着你去挑战！

## 插件介绍

插件由我制作，提供五个可自由开关的功能：

- **使用弃用的奖励算法：**打开原作者注释掉的奖励算法。代码片段：`j === 2 ? 1 / Math.max(200, 1000 / player.nextP.add(9).log10().cbrt()) :`。
- **现代化样式：**启用现代化样式，包括弹框动画，图标修复，滚动条样式，圆角槽位等杂项修改。
- **无限重掷：**有无限次"重掷（Reroll）"机会。
- **获得无限块：**用于测试，启用后无限获得奖励块。
- **排序物品栏：**自动排序物品栏。数字，运算符，变量等均可自动排序。

插件的设置会保存在玩家数据中，默认启用现代化样式和排序物品栏。

## License

源代码改编以 MIT License 许可。

外部库引用：Lodash.js ([License](https://github.com/lodash/lodash/blob/main/LICENSE)) | Vue.js ([License](https://github.com/vuejs/vue/blob/main/LICENSE)) | Noto Sans SC ([License](https://github.com/notofonts/noto-fonts/blob/main/LICENSE)) | Google Sans Code ([License](https://github.com/googlefonts/googlesans-code/blob/main/OFL.txt)) | Roboto Mono ([License](https://github.com/googlefonts/RobotoMono/blob/main/OFL.txt)) | break_eternity.js ([License](https://github.com/Patashu/break_eternity.js/blob/master/LICENSE))