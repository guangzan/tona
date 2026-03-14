# Tona TypeScript 主题模板

这是一个使用 TypeScript 编写的 Tona 博客主题模板。

## 特性

- 🚀 使用 Vite 作为构建工具，提供快速的开发体验
- 📦 TypeScript 支持，提供完整的类型提示
- 🎨 基于 Tona 框架，轻松开发博客主题
- 🔧 开箱即用的配置，快速开始开发

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

## 项目结构

```
.
├── src/
│   ├── main.ts      # 主题入口文件
│   └── style.css    # 样式文件
├── vite.config.ts   # Vite 配置文件
├── tsconfig.json    # TypeScript 配置文件
└── package.json     # 项目配置
```

## 开发指南

### 创建插件

在 `src/main.ts` 中，你可以通过 `createTheme().use()` 来注册插件：

```typescript
import { createTheme } from 'tona'
import './style.css'

function myPlugin() {
  // 你的插件逻辑
}

createTheme().use(myPlugin)
```

### 样式编写

在 `src/style.css` 中编写你的主题样式。

## 了解更多

- [Tona 文档](https://github.com/guangzan/tona)
- [Vite 文档](https://vitejs.dev/)
