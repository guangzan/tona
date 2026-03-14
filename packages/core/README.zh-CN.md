# tona

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  专为博客园（CNBlogs）设计的现代化主题开发框架。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona"><img src="https://img.shields.io/npm/v/tona?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona?style=flat-square" alt="license"></a>
  <a href="https://www.cnblogs.com"><img src="https://img.shields.io/badge/CNBlogs-博客园-green?style=flat-square" alt="CNBlogs"></a>
</p>

[English](./README.md) | **中文**

## 特性

- **插件系统** - 可扩展的插件架构，用于构建模块化主题
- **配置 API** - 使用 `defineOptions` 实现类型安全的配置管理
- **主题上下文** - 通过 `createTheme` 共享主题状态和工具
- **TypeScript 支持** - 包含完整的 TypeScript 定义
- **轻量级** - 极小的运行时开销

## 安装

```bash
npm install tona
```

```bash
pnpm add tona
```

```bash
yarn add tona
```

## 使用

### 创建主题

```typescript
import { createTheme } from 'tona'

const theme = createTheme()

// 使用插件
theme.use(myPlugin)
```

### 定义配置选项

```typescript
import { defineOptions } from 'tona'

const getBackgroundOptions = defineOptions('bodyBackground', {
  enable: false,
  value: '',
  opacity: 0.85,
  repeat: false,
})

// 在主题中使用
const options = getBackgroundOptions(userConfig)
```

### 创建插件

```typescript
import { defineOptions } from 'tona'

export function backgroundPlugin(theme, devOptions, pluginOptions) {
  const getBackgroundOptions = defineOptions('bodyBackground', {
    enable: false,
    value: '',
    opacity: 0.85,
    repeat: false,
  })

  const { enable, value, opacity, repeat } = getBackgroundOptions(devOptions)

  if (!enable) return

  const { opacitySelector } = Object.assign(
    {},
    { opacitySelector: '#main,#navigator' },
    pluginOptions,
  )

  setBackground(value, repeat)
  setOpacity(opacity, opacitySelector)
}
```

### 使用插件

```typescript
import { createTheme } from 'tona'
import { backgroundPlugin } from './plugin'

const theme = createTheme()

theme.use(
  backgroundPlugin,
  {
    // 主题默认配置
    enable: true,
    value: '#ffb3cc',
    opacity: 0.85,
  },
  {
    // 插件配置
    opacitySelector: '#main',
  },
)
```

## API 参考

### `createTheme()`

创建具有上下文管理功能的新主题实例。

**返回：** `ThemeInstance`

### `defineOptions(key, defaults)`

创建类型安全的配置获取器。

**参数：**

- `key` - 配置键或键数组（用于别名）
- `defaults` - 默认配置对象

**返回：** `(options: any) => Config`

## 相关包

- [tona-plugins](https://github.com/guangzan/tona/tree/main/packages/plugins) - 官方插件集合
- [tona-hooks](https://github.com/guangzan/tona/tree/main/packages/hooks) - 主题开发用的 React Hooks
- [tona-utils](https://github.com/guangzan/tona/tree/main/packages/utils) - 工具函数
- [tona-vite](https://github.com/guangzan/tona/tree/main/packages/tona-vite) - 主题开发的 Vite 插件

## 文档

详细的文档和示例，请访问 [Tona 文档](https://github.com/guangzan/tona)。
