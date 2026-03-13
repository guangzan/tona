# create-tona

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  用于脚手架搭建 Tona 主题项目的交互式 CLI 工具。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/create-tona"><img src="https://img.shields.io/npm/v/create-tona?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/create-tona?style=flat-square" alt="license"></a>
</p>

[English](./README.md) | **中文**

## 特性

- **交互式设置** - 引导式提示进行项目配置
- **多模板支持** - 可选择 minimal、Preact 等模板
- **包管理器支持** - 自动检测 npm、yarn、pnpm
- **TypeScript 就绪** - 所有模板都包含 TypeScript 支持
- **最佳实践** - 预配置 Vite 和现代化工具链

## 使用

### 创建新项目

```bash
npm create tona@latest
```

```bash
pnpm create tona
```

```bash
yarn create tona
```

### 命令行选项

```bash
create-tona [project-name] [options]
```

**选项：**
- `-t, --template <template>` - 指定模板 (minimal, preact)
- `-p, --package-manager <pm>` - 指定包管理器 (npm, yarn, pnpm)
- `-h, --help` - 显示帮助

## 模板

### minimal

一个极简的 TypeScript 启动模板，包含基础的 Tona 设置。

**特性：**
- TypeScript 支持
- Vite 构建工具
- 基础插件示例

### preact

基于 Preact 的模板，用于构建现代化响应式主题。

**特性：**
- Preact 用于 UI 组件
- SPA 路由支持
- UI 组件库
- Tailwind CSS 就绪

## 项目结构

```
my-theme/
├── src/
│   ├── main.ts          # 主题入口文件
│   └── style.css        # 主题样式
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 项目配置
```

## 开发

创建项目后：

```bash
cd my-theme
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
```

## 创建插件

```typescript
// src/main.ts
import { createTheme } from 'tona'
import './style.css'

function myPlugin(theme) {
  // 你的插件逻辑
  console.log('Plugin initialized!')
}

createTheme().use(myPlugin)
```

## 相关

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - 核心框架
- [tona-vite](https://github.com/guangzan/tona/tree/main/packages/tona-vite) - Vite 插件
