# tona-options

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  Tona 主题的预定义配置工具集。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-options"><img src="https://img.shields.io/npm/v/tona-options?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-options?style=flat-square" alt="license"></a>
</p>

[English](./README.md) | **中文**

## 特性

- **预配置选项** - 即用的常用主题选项
- **类型安全** - 完整的 TypeScript 支持
- **可组合** - 按需混合搭配选项
- **默认值** - 所有选项都有合理的默认值

## 安装

```bash
npm install tona-options
```

```bash
pnpm add tona-options
```

```bash
yarn add tona-options
```

## 使用

```typescript
import { getBackgroundOptions } from 'tona-options'

// 获取默认选项
const options = getBackgroundOptions()
console.log(options)
// {
//   enable: false,
//   value: "",
//   opacity: 0.85,
//   repeat: false,
// }
```

### 使用自定义配置

```typescript
import { getBackgroundOptions } from 'tona-options'

// 覆盖默认值
const options = getBackgroundOptions({
  enable: true,
  value: '#f5f5f5',
})
console.log(options)
// {
//   enable: true,
//   value: "#f5f5f5",
//   opacity: 0.85,
//   repeat: false,
// }
```

## 可用选项

### 背景选项

```typescript
import { getBackgroundOptions } from 'tona-options'

const options = getBackgroundOptions({
  enable: true,           // 启用背景
  value: '#f5f5f5',       // 背景颜色或图片 URL
  opacity: 0.85,          // 背景透明度
  repeat: false,          // 重复背景图片
})
```

## 创建自定义选项

要创建自己的选项，请使用核心 `defineOptions` API：

```typescript
import { defineOptions } from 'tona'

const getCustomOptions = defineOptions('customKey', {
  enable: false,
  color: '#000',
  size: 16,
})

// 在主题中使用
const options = getCustomOptions(userConfig)
```

## 相关

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - 包含 `defineOptions` 的核心框架
- [tona-plugins](https://github.com/guangzan/tona/tree/main/packages/plugins) - 使用这些选项的官方插件
