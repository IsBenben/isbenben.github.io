# Oh my dear JavaScript
!link /raw/oh-my-dear-js.html 体验游戏
!link https://js.wdn.md/ 原作品（Vue）
!download /raw/oh-my-dear-js.sb3 下载：游戏SB3
!date 2025/2/9
!description 在JavaScript中，==相等运算符有一些特殊的行为。
!description 这个消消乐游戏利用了这一特点。
!description 只要每个选择的相邻元素满足==判断为true，就可以消除。消除的越多得分越多。
!tag lang scratch3
!tag inspiration adaptation
!tag content entertainment

## 介绍

这个游戏是一个Scratch消消乐游戏，改变了nice.js——js真值表消消乐。

在JavaScript中，`==` 相等是再正常不过的运算符：
```js
[]==[] // false
[]==![] // true
[1]==true // true
[2]==true // false
[2]==false // false
```

[Oh my dear JavaScript](https://www.thomas-yang.me/projects/oh-my-dear-js/)具体介绍了这一特点。

游戏正是利用了这一特点。只要每个选择的相邻元素满足==判断为 `true`，就可以消除。选择的越多得分越多。因为地方不够，这个游戏用 `void 0` 代替 `undefined`。

你可以修改随机数种子，让游戏生成相同的随机数，固定初始局面。也可以输入 `Today`，自动填充当天的日期作为随机数种子。

~~如果发现bug，欢迎提出。~~（这里没有评论区）但是像前文所述的==特性可不是bug哦！

## 游戏内截图

![使用种子0产生的初始局面](/raw/oh-my-dear-js-screenshot.png)
