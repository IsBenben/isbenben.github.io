---
{
  "description":
    [
      "在JavaScript中定义xor异或函数，传入两个布尔值，返回参数异或结果。",
      "本文介绍四种方法实现布尔值异或，可根据实际需求选择。",
    ],
  "date": "2026/09/03",
  "tags":
    [["lang", "web"], ["inspiration", "original"], ["content", "snippet"]],
  "links": [],
  "downloads": [],
  "hide": false,
}
---

# JavaScript布尔值异或（xor）

## 代码说明

定义`xor`异或函数，传入两个布尔值，返回参数异或结果（对应下列真值表）。

| 参数`a` | 参数`b` | 返回值  |
| :-----: | :-----: | :-----: |
| `false` | `false` | `false` |
| `false` | `true`  | `true`  |
| `true`  | `false` | `true`  |
| `true`  | `true`  | `false` |

本文介绍四种方法实现`JavaScript`布尔值异或，可根据实际需求选择。

## 示例代码

```javascript
function xor(a, b) {
  // 参数归一化（可选）
  a = Boolean(a);
  b = Boolean(b);
  // 方法一
  return a !== b;
  // 方法二
  return a ? !b : b;
  // 方法三
  return (a || b) && !(a && b);
  // 方法四
  return Boolean(a ^ b);
}
```

## 代码解释

在代码中，首先对参数进行归一化，确保类型正确。

1. 在方法一中，根据异或运算的定义，通过判断参数`a`与参数`b`是否相同实现。
2. 在方法二中，首先根据参数`a`来判断是否应该反转参数`b`进而实现。
3. 在方法三中，通过观察真值表并对参数`a`与`b`进行逻辑运算实现。
4. 在方法四中，通过隐式类型转换将参数`a`与`b`视为整数异或并转换类型实现。
