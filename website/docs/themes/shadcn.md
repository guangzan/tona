# shadcn 主题

`tona-theme-shadcn`（`themes/shadcn`）—— 现代简洁的 shadcn/ui 风格主题：卡片式布局、响应式设计、优雅排版。它是五套主题中技术栈最现代的一套，内置一整套 **SPA 组件体系**，是 Preact + Tailwind CSS 开发的完整范例。

## 特性

- 🎨 shadcn/ui 设计语言：卡片、圆角、阴影、间距遵循统一设计令牌
- 🌗 深色 / 浅色模式（`initial-mode` 插件处理初始模式，避免闪烁）
- 🏠 **SPA 首页**：博主信息卡、文章列表、分页、关于页、图标分组
- 📄 文章详情页：标题、目录（TOC）、阅读进度、上下篇、评论区（支持自定义评论输入框）
- ⚡ 平滑滚动、回到顶部、气泡背景、粒子 / 星系 / 六边形等装饰组件
- 🔔 sonner 风格 toast 通知
- 🧩 丰富的 UI 组件：`button`、`tooltip`、`separator`、`typography`、`portal` 等

## 结构

```
themes/shadcn/src/
├── main.ts                      # 主题入口
├── components/
│   └── ui/                      # UI 组件库
│       ├── button.tsx
│       ├── tooltip.tsx
│       ├── bubble-background.tsx
│       ├── dot-grid.tsx / galaxy.tsx / hexagon.tsx / particles.tsx
│       ├── letter-glitch.tsx / hyper-text.tsx / flickering-grid.tsx
│       ├── simple-markdown.tsx
│       ├── sonner.tsx
│       └── portal/
├── plugins/
│   ├── code-copy-button/        # 代码复制按钮
│   ├── initial-mode/            # 初始明暗模式（防闪烁）
│   ├── smooth-scroll/           # 平滑滚动
│   └── spa/                     # SPA 组件体系
│       ├── components/
│       │   ├── home-page/       # 首页：about / post-list / post-pagination / profile-cover / profile-header
│       │   ├── post-details/    # 文章详情
│       │   ├── post-comments/   # 评论区（含自定义评论输入框）
│       │   ├── post-toc/        # 目录（line-toc / title-toc / read-percent）
│       │   ├── post-actions/    # 文章操作：编辑 / 收藏 / 关注 / 投票
│       │   ├── left-sidebar/    # 左侧边栏（博客统计卡）
│       │   ├── top-nav-bar/     # 顶部导航
│       │   └── markdown/        # Markdown 渲染
│       └── hooks/               # use-avatar / use-follow / use-followers / use-nickname / use-theme
├── styles/                      # globals / markdown / reset / shadcn 主题令牌
└── vite.config.ts
```

## 技术栈

| 技术 | 用途 |
| --- | --- |
| Preact | UI 渲染 |
| Tailwind CSS 4 | 样式（utility-first） |
| Base UI（@base-ui/react） | 无头组件原语 |
| motion | 动画 |
| ogl | WebGL 装饰背景 |
| tona-sonner | toast 通知 |
| tona-hooks / tona-ui / tona-utils | 主题辅助库 |

## 开发

```bash
cd themes/shadcn
pnpm install
pnpm dev       # 开发（热更新）
pnpm build     # 构建 dist/shadcn.min.css 与 dist/shadcn.min.js
```

## 学习建议

shadcn 主题是学习**用 Preact + Tailwind 构建现代博客园皮肤**的最佳入口：SPA 组件的目录组织、`spa` 插件的上下文设计（`avatar-context` 等）、以及 `post-list` / `post-pagination` 的分页 hooks，都值得参考。
