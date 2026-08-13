# 指南

欢迎阅读 Tona 文档。本指南面向希望在博客园（CNBlogs）上开发、定制或分发自己皮肤的主题作者。

## 文档结构

| 栏目 | 内容 |
| --- | --- |
| [快速开始](/guide/quick-start) | 环境要求、脚手架创建项目、本地开发与构建、在博客园中使用 |
| [核心概念](/guide/concepts/create-theme) | `createTheme`、`defineOptions`、插件系统与配置的工作原理 |
| [API 参考](/api/) | 核心 API 与配置选项类型的完整说明 |
| [插件目录](/plugins/) | 全部 31 个内置插件的功能与配置项 |
| [内置主题](/themes/) | geek、simple、view、reacg、shadcn 五套主题 |
| [包结构](/monorepo/packages) | Monorepo 各包的分工与常用开发命令 |

## 核心心智模型

Tona 主题开发遵循一个简单的流程：

1. **创建主题实例** —— 通过 `createTheme()` 得到主题对象；
2. **组合插件** —— 通过 `theme.use(plugin, ...options)` 按需安装插件；
3. **配置驱动** —— 插件通过 `defineOptions` 声明默认配置，用户在 `window.opts` 中覆盖；
4. **构建分发** —— 通过 `tona-vite` 插件将主题构建为可直接部署到博客园的 IIFE 产物。

下面的「核心概念」章节会逐一展开这四个环节。如果你已经熟悉这些概念，可以直接跳到 [插件目录](/plugins/) 或 [API 参考](/api/)。
