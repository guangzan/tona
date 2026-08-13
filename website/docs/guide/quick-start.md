# 快速开始

本页带你从零创建一个 Tona 主题项目，并在本地完成开发与构建。

## 环境要求

| 工具 | 版本要求 |
| --- | --- |
| Node.js | >= 22.18 |
| pnpm | >= 10 |

> 本仓库（Monorepo）使用 `pnpm@10.32.1` 管理，`packageManager` 字段已声明在根 `package.json` 中。

## 创建项目

使用脚手架 CLI 交互式创建：

```bash
pnpm create tona
```

按提示输入项目名、选择模板后，进入项目目录安装依赖：

```bash
cd my-tona-theme
pnpm install
```

### 模板选项

`create-tona` 内置两套模板，可通过 `--template` 指定：

- **minimal** —— 最小化模板：一个入口文件 `src/main.ts` 与一份样式 `src/style.css`，适合快速起步；
- **preact** —— Preact 模板：预置 `components/ui` 组件目录、`styles` 与 SPA 插件示例，适合构建复杂交互的皮肤。

### 其他选项

```bash
# 指定包管理器（npm / yarn / pnpm）
pnpm create tona --package-manager pnpm

# 也可以使用其他包管理器调用
npm create tona@latest
yarn create tona
```

## 开发与构建

项目初始化后，`package.json` 提供以下脚本：

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动开发服务器，支持热更新 |
| `pnpm build` | 构建主题分发产物（IIFE，含 `{themeName}.min.css` 与 `{themeName}.min.js`） |

开发模式由 `tona-vite` 插件驱动：它会自动检测 `src/main.ts`（或 `src/main.js`）作为入口，注入主题脚本，并在开发期间提供 `/public/`、`/templates/`、`/js/`、`/css/`、`/images/` 等共享资源路径。

## 一个最小主题

```ts
// src/main.ts
import { createTheme } from 'tona'
import { background, darkMode, codeHighlight } from 'tona-plugins'

const theme = createTheme()

theme.use(background)
theme.use(darkMode)
theme.use(codeHighlight)
```

```ts
// vite.config.ts
import tona from 'tona-vite'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  plugins: [tona()],
})
```

## 在博客园中使用

1. 登录博客园，进入「管理后台 → 设置 → 页面定制 CSS 代码」，粘贴构建产出的 CSS（`{themeName}.min.css`）；
2. 在「页脚 HTML 代码」中引入构建产出的 JS（`{themeName}.min.js`）；
3. 如需配置皮肤，在引入主题脚本 **之前** 注入 `window.opts`（详见[配置](/guide/concepts/configuration)）。

如果想直接使用现成的皮肤（而不是自己开发），可以参考 [awescnb 皮肤文档](https://www.yuque.com/r/awescnb/books)，Tona 的 geek / simple / view / reacg 等主题也以成品形态收录其中。

## 下一步

- 了解 [`createTheme` 与主题实例](/guide/concepts/create-theme)
- 了解 [`defineOptions` 配置管理](/guide/concepts/define-options)
- 浏览[插件目录](/plugins/)选择需要的插件
