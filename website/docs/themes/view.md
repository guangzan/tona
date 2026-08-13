# view 主题

`tona-theme-view`（`themes/view`）—— 视图风格主题，以内容展示为核心，布局轻量、视觉干净。

## 特性

- 🖼️ 内容优先的视图布局
- 🌗 深色 / 浅色模式
- 🧭 页头导航（`header` 模块）
- 🚫 广告隐藏（`hideAds.scss`）
- 🎊 代码高亮、复制、语言标识、行号等插件能力
- 📄 markdown 正文优化排版

## 结构

```
themes/view/src/
├── main.ts                  # 主题入口
├── constants/               # cnblog 常量与链接配置
├── modules/
│   └── header/              # 页头
├── style/                   # SCSS 样式
│   ├── index.scss           # 主样式（含 .m 移动端变体）
│   ├── build.scss           # 构建相关样式
│   ├── header.scss
│   ├── markdown.scss        # 正文排版
│   ├── plugins.css          # 插件样式
│   ├── hideAds.scss         # 广告隐藏
│   ├── animate.scss
│   └── variables.scss       # 设计变量
└── utils/                   # 博客园上下文工具
```

## 开发

```bash
cd themes/view
pnpm install
pnpm dev       # 开发（热更新）
pnpm build     # 构建 dist/view.min.css 与 dist/view.min.js
```

## 学习建议

view 是五套主题中最精简的一套（单个 `header` 模块），适合快速理解 Tona 主题的**最小结构**：`main.ts` 入口 + 样式目录 + 构建配置，三部分即可构成一个可用皮肤。
