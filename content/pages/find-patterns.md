---
{
  "description":
    [
      'Python程序，可以通过多项式拟合几乎任意的数列，即"找规律"。',
      "原理是一种类似于拉格朗日插值的算法。",
    ],
  "date": "2025/02/03",
  "tags":
    [["lang", "python3"], ["inspiration", "original"], ["content", "tool"]],
  "links":
    [
      ["https://www.bilibili.com/video/BV1D9PQeaEBf/", "演示视频"],
      [
        "https://github.com/IsBenben/Funny-Things/blob/main/%E6%89%BE%E8%A7%84%E5%BE%8B.py",
        "源代码",
      ],
    ],
  "downloads": [["/raw/find-patterns.py", "下载：Python程序"]],
  "hide": false,
}
---

# “找规律”

## 介绍

Python程序，可以通过多项式拟合几乎任意的数列，即“找规律”。

最上方可以设置数列的每一项，同时支持分数和小数输入，点击“添加”（快捷键`Enter`）按钮加入列表。选中数列项目，点击“删除”（快捷键`Delete`）按钮从列表删除。

中央可设置拟合输出格式，有LaTeX分数和小数两种格式。

点击“确定”按钮后，下方会显示输出结果。示例：

```
容易注意到多项式函数：
f(x)=x
满足
- f(2)=2
- f(3)=3
- f(1)=1
```

原理：一种类似于拉格朗日插值的算法。

## 截图

![多项式拟合几乎任意的数列的工具界面](/raw/find-patterns-gui.png)
