# simple 主题

`tona-theme-simple`（`themes/simple`）—— 极简风格主题，专注于阅读体验，代码量小、结构清晰，是**入门阅读** Tona 主题代码的首选。

## 特性

- 📖 极简排版，突出正文阅读
- 🌗 深色 / 浅色模式
- 📑 文章目录（`catalog` 模块）
- 🧭 页头导航与侧边栏（`header` / `side` 模块）
- 🖱️ 滚动行为处理（`scroll` 模块）
- 🚫 广告隐藏（`hideAds.scss`）
- 🎊 代码高亮、复制、语言标识、行号等插件能力

## 结构

```
themes/simple/src/
├── main.ts                  # 主题入口
├── constants/               # cnblog 常量与链接配置
├── modules/
│   ├── catalog/             # 文章目录
│   ├── header/              # 页头
│   ├── scroll/              # 滚动行为
│   └── side/                # 侧边栏
├── style/                   # SCSS 样式
│   ├── index.scss           # 主样式（含 .m 移动端变体）
│   ├── markdown.scss        # 正文排版
│   ├── plugins.css          # 插件样式
│   ├── hideAds.scss         # 广告隐藏
│   └── tools.scss
└── utils/                   # 博客园上下文工具
```

## 开发

```bash
cd themes/simple
pnpm install
pnpm dev       # 开发（热更新）
pnpm build     # 构建 dist/simple.min.css 与 dist/simple.min.js
```

## 学习建议

simple 只保留四个功能模块，入口 `main.ts` 与插件组合一目了然。如果你想在 Tona 基础上**从零构建自己的极简皮肤**，以 simple 为起点最合适。
