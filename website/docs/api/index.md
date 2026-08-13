# API 参考

本栏目是 Tona 工具链的完整 API 参考，全部内容与仓库源码逐项对照。

## 栏目导航

| 页面 | 内容 |
| --- | --- |
| [核心 API（tona）](/api/core) | `createTheme`、`defineOptions`、`Theme` / `Plugin` 等类型定义 |
| [选项类型（tona-options）](/api/options) | 全部预定义配置获取器与其选项类型 |
| [Vite 插件（tona-vite）](/api/tona-vite) | 构建插件选项、产物说明与开发服务器行为 |

## 包对应关系

| 包名 | npm 包 | 说明 |
| --- | --- | --- |
| `packages/core` | `tona` | 核心运行时，导出 `createTheme` 与 `defineOptions` |
| `packages/options` | `tona-options` | 预定义配置获取器 |
| `packages/plugins` | `tona-plugins` | 31 个内置插件（见[插件目录](/plugins/)） |
| `packages/tona-vite` | `tona-vite` | 主题开发的 Vite 插件 |
| `packages/hooks` | `tona-hooks` | 常用 Preact/React hooks |
| `packages/utils` | `tona-utils` | 博客园上下文工具函数 |
| `packages/loader` | `tona-loader` | 主题脚本加载器 |
| `packages/ui` | `tona-ui` | 基于 Preact 的 UI 组件 |
| `packages/sonner` | `tona-sonner` | toast 通知组件 |
| `packages/create-tona` | `create-tona` | 脚手架 CLI |
| `packages/data` | `tona-themes` | 主题注册数据 |
| `packages/stylelint-one-utility-class-per-line` | `tona-stylelint-one-utility-class-per-line` | stylelint 插件 |
