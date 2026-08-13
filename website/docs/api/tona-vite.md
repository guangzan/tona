# Vite 插件（tona-vite）

`tona-vite`（`packages/tona-vite`）是 Tona 主题开发的 Vite 插件，提供开发服务器、动态脚本注入、共享资源服务与 IIFE 构建输出。

## 安装

```bash
pnpm add -D tona-vite
```

## 使用

```ts
// vite.config.ts
import tona from 'tona-vite'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  plugins: [tona()],
})
```

## 选项

```ts
interface TonaPluginOptions {
  /** 构建输出文件名的主题名称，@default 'theme' */
  themeName?: string
  /** 为 true 时产出 Inline CSS Dist（CSS 注入进 IIFE JS），@default false */
  inlineCss?: boolean
  /** 为 true 时在 JS 文件名中写入内容哈希，@default false */
  hash?: boolean
  /** 为 true 时在构建产物旁输出 sourcemap，@default false */
  sourcemap?: boolean
}
```

## 构建产物

插件自动检测 `src/main.ts` 或 `src/main.js` 作为入口，输出 IIFE 库格式。

### 默认产物（`inlineCss: false`）

| 设置 | 值 | 说明 |
| --- | --- | --- |
| 库格式 | IIFE | 立即执行函数表达式 |
| 入口点 | `src/main.ts` 或 `src/main.js` | 自动检测 |
| 输出文件名 | `{themeName}.min.js` | `hash: true` 时为 `{themeName}.[hash].min.js` |
| CSS | `{themeName}.min.css` | 独立样式表 |

### Inline CSS 产物（`inlineCss: true`）

| 设置 | 值 | 说明 |
| --- | --- | --- |
| 库格式 | IIFE | 立即执行函数表达式 |
| 入口点 | `src/main.ts` 或 `src/main.js` | 自动检测 |
| 输出文件名 | `{themeName}.min.js` | 单 JS 文件；CSS 运行时注入 |
| 主题 CSS 文件 | 无 | 样式经 `document.createElement('style')` 嵌入 |

## 开发服务器

开发期间插件提供以下静态资源路径：

| 路径 | 内容 |
| --- | --- |
| `/public/*` | 通用公共资源 |
| `/templates/*` | HTML 模板 |
| `/js/*` | JavaScript 文件 |
| `/css/*` | CSS 文件 |
| `/images/*` | 图片文件 |
| `/` 或 `/index.html` | 导航索引页面 |

## 项目结构示例

```
my-theme/
├── src/
│   ├── main.ts          # 主题入口
│   └── style.css        # 主题样式
├── vite.config.ts       # Vite + tona 插件配置
└── package.json
```

## 相关

- [核心 API（tona）](/api/core)
- [插件目录](/plugins/)
- [Monorepo 包结构](/monorepo/packages)
