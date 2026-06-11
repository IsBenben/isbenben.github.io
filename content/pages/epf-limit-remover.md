---
{
  "description":
    [
      "EPFLimitRemover是一个可配置的Minecraft模组，用于修改原版魔咒保护系数EPF的上限。",
      "兼容Minecraft 1.21~1.21.11全系列版本。通过轻量级Mixin注入原版游戏。",
    ],
  "date": "2026/5/30",
  "tags":
    [["lang", "minecraft"], ["inspiration", "adaptation"], ["content", "tool"]],
  "links":
    [
      ["https://github.com/CHJWOS/EPFLimitRemover/", "原始项目"],
      ["https://github.com/IsBenben/EPFLimitRemover/", "关联仓库"],
    ],
  "downloads": [],
  "hide": false,
}
---

# EPFLimitRemover

[![license](https://img.shields.io/github/license/IsBenben/EPFLimitRemover)](https://github.com/IsBenben/EPFLimitRemover/blob/main/LICENSE)
[![NeoForge](https://img.shields.io/badge/NeoForge-21.11.42+-orange)](https://neoforged.net/)
[![Minecraft](https://img.shields.io/badge/Minecraft-1.21.x-brightgreen)](https://minecraft.net/)

EPFLimitRemover是一个可配置的`Minecraft`模组，用于修改原版魔咒保护系数（`EPF`）的上限。原版EPF上限固定为`20`，而本模组允许你根据需要调整该值，从而改变盔甲保护机制的计算结果。

## 功能特性

- 自由配置魔咒保护系数的上限（默认25，原版为20），支持范围为0.0~25.0。
- 兼容Minecraft 1.21~1.21.11全系列版本。
- 修改配置文件后自动生效，无需重启游戏。
- 通过轻量级Mixin注入原版战斗规则类，无侵入式修改。
- 源码完全开放，可自由使用、修改和分发。

## 安装方式

模组支持NeoForge 21.11.42+（MC版本见功能特性）。

1. 下载适用于你的Minecraft版本的模组JAR文件。
2. 确保已安装对应版本的[NeoForge](https://neoforged.net/)。
3. 将JAR文件放入`.minecraft/mods/`目录。
4. 启动游戏，模组会自动加载。

## 配置说明

配置文件位于`.minecraft/config/epflimitremover-common.toml`（首次运行游戏后自动生成）。

```toml
#魔咒保护系数(EPF)上限，原版为20
# Default: 25.0
# Range: 0.0 ~ 25.0
epfLimit = 25.0
```

本模组使用`epfLimit`配置EPF上限。设置为`20.0`可还原原版行为。调低该值会削弱魔咒保护效果，调高则增强。

修改配置文件后，模组会自动重载配置并立即生效，无需重启游戏。

## 技术细节

Minecraft原版通过`CombatRules`类的以下两个方法计算伤害减免：

- `getDamageAfterAbsorb`：计算护甲和盔甲韧性之后的伤害。
- `getDamageAfterMagicAbsorb`：计算魔咒保护（如保护、弹射物保护等）之后的伤害。

这两个方法内部均使用`Mth.clamp(epf, 0.0F, 20.0F)`将EPF限制在`[0, 20]`区间。本模组通过Mixin修改该`clamp`调用的最大值参数，将其替换为配置文件中的`epfLimit`值。

本模组通过如下代码修改该行为：

- `EpfLimitRemover.java`：模组主类，负责注册配置文件。
- `Config.java`：使用NeoForge配置API定义配置项，并监听配置重载事件。
- `CombatRulesMixin.java`：Mixin注入类，修改两处`Mth.clamp`的最大值参数。
