# Village of Chaos
!link https://github.com/IsBenben/village-of-chaos 关联仓库（本地化版）
!link https://github.com/Tearnote/village-of-chaos 关联仓库（英文原版）
!link https://isbenben.github.io/village-of-chaos/ 体验：本地化版
!link https://tearnote.github.io/village-of-chaos/ 体验：英文原版
!date 2026/3/6
!description 简短文字放置游戏，原生JS编写，轻松挂机发展村庄。
!description 支持多语言切换，覆盖中文简繁体。
!description 完全免费在线游玩，无需下载即开即玩。
!tag lang web
!tag inspiration localization
!tag content entertainment

## 游戏介绍

《混乱村庄》（Village of Chaos）是一个简短的文字放置游戏，由 [Tearnote](https://github.com/Tearnote) 使用原生 JavaScript 编写，最初为 [Code Institute](https://codeinstitute.net) 的第二次提交项目而制作。

### 游戏目标

游戏的目标是逐步建造村庄，管理村民的工作以最大化他们的潜力。玩家需要：

- 收集资源（木材、食物、石头）
- 邀请村民加入村庄
- 建造新建筑（码头、采石场、铁匠铺、学院）
- 分配村民到不同的工作岗位
- 升级建筑和技能
- 完成游戏目标

### 游戏特色

- **放置游戏机制**：游戏可以自动进行，玩家可以随时回来查看进度
- **资源管理**：管理木材、食物、石头三种基础资源
- **职业系统**：村民可以从事伐木工人、渔夫、矿工、铁匠、教授等职业
- **建筑升级**：升级建筑可以提高生产效率和容纳更多村民
- **混乱机制**：建筑升级会增加混乱值，影响生产效率
- **教程系统**：游戏通过弹窗教程引导玩家了解各项功能
- **存档系统**：支持自动保存和手动保存，每5分钟自动保存一次

### 技术栈

- **纯 JavaScript**：不依赖任何框架，使用原生 JavaScript 实现
- **HTML5**：使用语义化 HTML 标签
- **CSS3**：使用现代 CSS 进行样式设计
- **PWA 支持**：支持作为渐进式 Web 应用安装
- **响应式设计**：适配桌面和移动设备

## 游戏玩法

### 基础操作

1. **收集资源**：点击"采集木材"和"采集食物"按钮手动收集资源
2. **邀请村民**：使用食物邀请村民加入村庄
3. **分配工作**：在"分配"标签页中分配村民到不同的工作岗位
4. **升级建筑**：在"制造"标签页中使用资源升级建筑
5. **研究科技**：在"研究"标签页中解锁高级功能

### 职业系统

每个建筑都有三种角色：

- **村民**：基础工人，产生基础资源
- **导师**：提高村民的工作效率
- **经理**：提高导师的效率

### 混乱机制

建筑升级会增加混乱值，混乱值越高，生产效率越低。需要平衡建筑等级和混乱值。

### 游戏目标

摧毁巨石，达到游戏胜利条件。

### 调试模式

在浏览器控制台中执行以下代码可以快速获得资源：

```javascript
game.cheat();
```

## 本地化实现

### 支持的语言

- **英语 (en-US)**：原始语言
- **简体中文 (zh-CN)**：本地化版本
- **繁体中文 (zh-TW)**：本地化版本

### 本地化架构

游戏使用自定义的 i18n（国际化）系统，基于以下文件结构：

```
assets/js/i18n/
├── en_us.js      # 英语翻译
├── zh_cn.js      # 简体中文翻译
├── zh_hant.js    # 繁体中文翻译
└── main.js       # i18n 核心逻辑
```

### 翻译数据结构

每种语言的翻译文件导出一个包含所有翻译键值对的对象：

```javascript
// assets/js/i18n/zh_cn.js
const zh_cn = {
	"meta.language": "zh-CN",
	"meta.name": "简体中文",
	"text.title": "Village of Chaos",
    // ... 更多翻译
}
```

### 自定义元素 `<t-i18n>`

HTML 中使用自定义元素 `<t-i18n>` 标记需要翻译的文本：

```html
<h1><t-i18n k="text.title"></t-i18n></h1>
```

### 本地化核心逻辑

`main.js` 文件实现了以下功能：

- **语言切换**：支持动态切换语言
- **文本替换**：自动查找并替换 `<t-i18n>` 元素中的文本
- **回退机制**：当翻译缺失时显示原始键名

### 语言选择界面

游戏提供了语言选择界面，用户可以：

- 查看所有可用语言
- 选择首选语言

### 添加新语言

1. 在 `assets/js/i18n/` 目录下创建新的语言文件
2. 复制现有语言文件的结构并翻译所有文本
3. 在 `main.js` 中注册新语言

## 开发和构建

### 本地运行

1. 克隆仓库：
   ```bash
   git clone https://github.com/IsBenben/village-of-chaos.git
   cd village-of-chaos
   ```

2. 使用本地服务器运行（需要 HTTP 服务器）：
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx http-server
   ```

3. 在浏览器中访问 `http://localhost:8000`

## License

本项目基于 [MIT License](https://github.com/Tearnote/village-of-chaos/blob/main/LICENSE) 开源。
