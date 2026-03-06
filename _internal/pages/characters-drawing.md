# 字符画
!link https://www.bilibili.com/video/BV17SDrYEEVS/ 演示视频
!link https://github.com/IsBenben/Funny-Things/blob/main/%E5%AD%97%E7%AC%A6%E7%94%BB.py 源代码
!date 2024/11/9
!description Python制作的字符画程序，可以把图片用字符显示出来。
!description 使用方法：安装pillow库，在相同目录放置字体font.ttf
!download /raw/characters-drawing.py 下载：字符画程序
!tag lang python3
!tag inspiration original
!tag content art

Python制作的字符画程序，可以把任意图片用字符画的形式显示出来。

## 功能特点

- 支持多种图片格式（`JPG`、`PNG`等）
- 可自定义字符集
- 可调整输出尺寸

## 使用方法

### 环境准备

1. 安装 Python 3.x
2. 安装依赖库 `pillow`：
   ```bash
   pip install pillow
   ```
3. 准备字体文件：
   - 下载或准备一个 TrueType 字体文件（如 `font.ttf`）
   - 将字体文件放在与程序相同的目录下

### 运行程序

```bash
python characters-drawing.py
```

即打开`tkinter`窗口，选择图片，调整参数，点击转换即可。

## 技术原理

### 图像处理流程

1. **图像读取**：使用 Pillow 库读取原始图片
2. **尺寸调整**：根据指定的缩放调整图像尺寸
3. **灰度转换**：将彩色图像转换为灰度图像
4. **像素映射**：将每个像素的灰度值映射到对应的字符
5. **字符输出**：生成最终的字符画

### 字符映射原理

程序首先读取字体文件，将字符集中的每个字符逐个渲染到一张临时灰度图上，并统计该字符所占像素的平均灰度值，建立灰度与字符的映射表。随后计算目标图片每个像素灰度，再依据映射表二分查找最接近的字符，最终拼接成完整的字符画。

## 注意事项

- 字体文件必须与程序在同一目录下
- 调整尺寸再转换，建议调小，过大会影响显示效果
