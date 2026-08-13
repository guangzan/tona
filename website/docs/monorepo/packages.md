# Monorepo 包结构

Tona 采用 **pnpm workspace** 管理的 Monorepo 架构。仓库根目录的 `pnpm-workspace.yaml` 声明了所有工作区包：

```yaml
packages:
  - packages/*
  - themes/*
  - docs
  - website
```

工作区通过 `catalog:` 协议统一管理依赖版本（见 `pnpm-workspace.yaml` 的 `catalog` 段），并通过 `overrides` 统一锁定 vite / vitest。

## 包一览

| 目录 | npm 包名 | 说明 |
| --- | --- | --- |
| `packages/core` | `tona` | 核心运行时：`createTheme`、`defineOptions`、插件系统 |
| `packages/create-tona` | `create-tona` | 交互式脚手架 CLI，提供 minimal / preact 模板 |
| `packages/tona-vite` | `tona-vite` | Vite 插件：动态脚本注入、共享资源服务、IIFE 构建输出 |
| `packages/plugins` | `tona-plugins` | 插件库，31 个开箱即用的皮肤插件 |
| `packages/options` | `tona-options` | 主题配置选项定义（预定义配置获取器） |
| `packages/hooks` | `tona-hooks` | 常用 Preact/React hooks 集合 |
| `packages/ui` | `tona-ui` | 基于 Preact 的 UI 组件库（Slot 组件、`cn()` 等） |
| `packages/sonner` | `tona-sonner` | 基于 sonner 的 Preact toast 通知组件 |
| `packages/loader` | `tona-loader` | 主题脚本加载器（按名称或 URL 动态加载主题） |
| `packages/utils` | `tona-utils` | 博客园上下文工具函数（页面判定、关注、点赞等） |
| `packages/data` | `tona-themes` | 主题列表数据（含 `dist/themes.json` 机器可读导出） |
| `packages/stylelint-one-utility-class-per-line` | `tona-stylelint-one-utility-class-per-line` | 强制一行一个 utility class 的 stylelint 插件 |
| `themes/geek`、`themes/reacg`、`themes/shadcn`、`themes/simple`、`themes/view` | `tona-theme-*` | 内置主题（见[主题概览](/themes/)） |
| `website` | `website` | 本文档站（Rspress） |

## 依赖关系

```
tona-plugins ──► tona（core）＋ tona-options
tona-theme-* ──► tona ＋ tona-options ＋ tona-plugins（＋ tona-vite 构建）
tona-theme-shadcn ──► tona-hooks / tona-ui / tona-sonner / tona-utils
tona-vite ──► 构建工具链（vite-plus / vite）
create-tona ──► 模板（minimal / preact）依赖 tona 生态
```

所有包在 `packages/*/node_modules` 中以 workspace 链接（`workspace:*`）互相引用，修改源码即时生效，无需手动 link。

## 常用开发命令

所有命令在仓库根目录执行（对应根 `package.json` scripts）：

| 命令 | 说明 |
| --- | --- |
| `pnpm install` | 安装全部工作区依赖 |
| `pnpm dev` | 开发主题（热更新） |
| `pnpm build:theme` | 构建主题（`node scripts/build-theme.ts`） |
| `pnpm build:pkg` | 构建所有包（`pnpm -F './packages/**' build`） |
| `pnpm test` | 运行测试（vite-plus test） |
| `pnpm lint` | 代码检查（oxlint） |
| `pnpm fmt` | 代码格式化（oxfmt） |
| `pnpm check` | 综合检查 |
| `pnpm release` | 发布版本（bumpp 版本管理 + 发布脚本） |
| `pnpm publish-ci` | CI 发布流程（构建并上传主题资产） |

环境要求：**Node.js >= 22.18**，**pnpm >= 10**（仓库声明 `packageManager: pnpm@10.32.1`）。

### 针对单个包执行

```bash
pnpm -F tona-plugins build     # 构建 plugins 包
pnpm -F tona-theme-geek build  # 构建 geek 主题
pnpm -F website build          # 构建文档站
```

## 发布流程

版本发布由 `scripts/release.ts`（bumpp）驱动：提升版本 → 更新各包版本 → 打 git tag → 发布 npm。CI（GitHub Actions）在 `publish-ci` 流程中构建并上传五套主题的产物到博客园静态资源。

## 相关

- [贡献指南](/contributing)
- [更新日志](/changelog)
- [API 参考](/api/)
