# 更新日志

本页汇总 Tona 各版本的变更摘要。完整提交历史见 [GitHub Commits](https://github.com/guangzan/tona/commits/main)。

## v1.0.25（2025-08）

- **TypeScript 迁移**：`tona-plugins` 与 geek / reacg / simple / view 四套主题迁移为 TypeScript，全链路类型化；
- **产物契约（ADR-004）**：插件 `dist` 产物与入口契约落地，插件 CSS 通过包子路径（`tona-plugins/xxx`）按需引入；
- **深色模式三态**：`darkMode` 插件支持深色 / 浅色 / 跟随系统三态循环，选择持久化到 `localStorage.modeType`，跟随系统时实时监听 OS 明暗变化；
- **工具栏按钮工厂化**：`tools` 插件重构为可插拔按钮工厂（`createBackTopButton` / `createLikeButton` 等），支持自定义按钮；
- **文档**：重写根 README，完整呈现项目概览。

## v1.0.24

- Node.js 版本更新至 24.15.0，CI 与 `.node-version` 同步；
- 发布流程构建并上传主题资产。

## v1.0.23

- 引入 `@chenglou/pretext` 依赖，升级 `@base-ui/react`；
- 样式细节优化（选区样式、lrc 对齐）。

## v1.0.22

- 新增 `initial-mode` 插件（shadcn 主题）：处理初始明暗模式，避免首屏闪烁；
- 重构 `tona-vite` 构建配置，构建脚本迁移至 TypeScript。

## v1.0.21

- 新增 `LineTocCard` / `ReadPercent` 组件，增强文章目录交互（悬停、固定）；
- hooks 改为具名导出，新增 `useLocalStorage`；
- 文章页模板新增多个区块。

## v1.0.20 – v1.0.16

- 发布与 CI 流程完善（GitHub Actions、npm publish、主题资产上传）。

## v1.0.15

- **SPA 核心**：shadcn 主题实现 SPA 首页 / 文章页 / 评论区组件体系（`spa` 插件）；
- 重构 `create-tona` 项目创建流程。

## v1.0.14 – v1.0.11

- 主题迁移进 Monorepo：simple、view、reacg、geek 陆续迁移为工作区包（`tona-theme-*`），恢复各模块功能（icons、mobileMenu、profile、scroll 等）；
- `darkMode` 支持跟随系统色彩模式；
- Live2D 插件新增 `mute` 配置。

## v1.0.10

- 新增 GitHub Actions 工作流，实现自动化发布（`pnpm release` → npm publish）。

## v1.0.3 – v1.0.9

- 建立发布脚本与 CI 流程；
- 文档完善（多语言 README）；
- 文章操作组件（编辑按钮、关注、点赞等）与 hooks。

## v0.0.1

- Tona 初始版本：核心运行时、插件库与 geek 主题的雏形。

---

> 版本采用语义化版本（SemVer），标签格式为 `vX.Y.Z`（含 `-beta.N` 预发布版本）。
