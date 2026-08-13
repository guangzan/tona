# FAQ

## 基础

### Tona 是什么？

Tona 是专为博客园（CNBlogs）设计的现代化皮肤开发框架，提供核心运行时（`createTheme` / `defineOptions`）、基于 Vite 的开发与构建流程（`tona-vite`）、30+ 个开箱即用插件（`tona-plugins`）以及多套内置主题。

### 我不会写代码，能用 Tona 吗？

可以。仓库内置的 geek、simple、view、reacg、shadcn 五套主题都是成品皮肤，可参考 [awescnb 皮肤文档](https://www.yuque.com/r/awescnb/books) 直接在博客园中使用。Tona 面向的是希望**开发或深度定制**皮肤的用户。

### 环境要求是什么？

Node.js >= 22.18、pnpm >= 10。如果你只想使用现成皮肤，则无需任何环境。

## 开发

### 如何开始开发自己的皮肤？

```bash
pnpm create tona
cd my-tona-theme
pnpm install
pnpm dev    # 本地开发，支持热更新
pnpm build  # 构建分发产物
```

详见[快速开始](/guide/quick-start)。

### `pnpm create tona` 支持哪些选项？

支持 `--template`（`minimal` / `preact`）与 `--package-manager`（自动识别 npm / yarn / pnpm），也可通过 `npm create tona@latest`、`yarn create tona` 调用。

### createTheme 和 defineOptions 是什么？

- `createTheme()` 创建主题实例，负责安装插件与承载配置上下文；
- `defineOptions(key, defaults)` 声明类型安全的配置获取器，按「用户配置 > 默认配置 > 开发配置」合并。

详见[核心概念](/guide/concepts/create-theme)与 [API 参考](/api/core)。

### 如何给用户提供可配置项？

插件用 `defineOptions` 声明默认值；用户在使用皮肤时，于主题脚本之前注入 `window.opts` 即可覆盖：

```html
<script>
  window.opts = {
    darkMode: { enable: true, followSystem: true },
  }
</script>
<script src="./theme.min.js"></script>
```

### 如何添加自己的工具栏按钮？

`tools` 插件提供按钮工厂：`createBackTopButton`、`createLikeButton`、`createCommentButton`、`createFavoriteButton`、`createFollowButton`、`createDarkModeButton`，也可以编写自己的工厂（见[编写自定义插件](/plugins/custom-plugin)）。

### 构建产物有哪些？

默认产出 IIFE 格式的 `{themeName}.min.js` 与独立 `{themeName}.min.css`；设置 `inlineCss: true` 时可把 CSS 注入 JS，只产出单个文件（见 [tona-vite API](/api/tona-vite)）。

## 主题

### 五套内置主题有什么区别？

| 主题 | 风格 |
| --- | --- |
| shadcn | 现代简洁，shadcn/ui 设计语言 + SPA 组件体系 |
| geek | 经典极客风，功能最全面 |
| simple | 极简，专注阅读 |
| view | 视图风格，内容展示为主 |
| reacg | ACG 风格 |

详见[主题概览](/themes/)。

### 如何修改内置主题？

`themes/` 下每套主题都是独立工作区包：修改 `src/` 后运行 `pnpm -F tona-theme-geek build`（以 geek 为例）即可产出新的 `dist` 产物。主题的 `vite.config.ts` 是 vite-plus + tona-vite 的标准配置。

### 浏览器兼容性如何？

geek / reacg / simple / view 支持所有现代浏览器及 Internet Explorer 11+；shadcn 基于现代 Web 技术（Preact / Tailwind 4），面向现代浏览器。

## 生态

### 有哪些包可以直接用？

| npm 包 | 用途 |
| --- | --- |
| `tona` | 核心运行时 |
| `tona-plugins` | 31 个皮肤插件 |
| `tona-options` | 预定义配置获取器 |
| `tona-vite` | 主题构建 Vite 插件 |
| `create-tona` | 脚手架 CLI |
| `tona-hooks` / `tona-ui` / `tona-sonner` | Preact 辅助库 |
| `tona-loader` | 主题加载器 |
| `tona-utils` | 博客园上下文工具 |
| `tona-themes` | 主题注册数据 |

### 如何反馈问题或提出建议？

通过 [GitHub Issues](https://github.com/guangzan/tona/issues) 报告 bug、提出建议，或直接提交 Pull Request（见[贡献指南](/contributing)）。

### 项目使用什么许可证？

MIT License。
