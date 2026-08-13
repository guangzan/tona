# geek 主题

`tona-theme-geek`（`themes/geek`）—— 经典极客风格主题，是 Tona 功能最全面的参考实现，几乎用到了插件库的每一项能力。

## 特性

- 💻 兼容桌面、平板、手机
- 🎨 支持自定义主题色
- 🌗 支持深色、浅色模式
- 🥽 评论列表头像显示
- 🎊 代码高亮，可跟随深色 / 浅色模式切换（Markdown）
- 💬 代码语言显示（Markdown）
- ✔️ 代码一键复制
- 🥳 表情选择器，支持自定义文字、系统、网络图片表情
- 📑 博文信息显示优化
- 📷 完善的图片预览支持
- 📦 重构博客园相册，支持相片预览
- 🔐 自定义 license、签名
- 🌄 自定义个性签名
- 🔮 自定义网站图标、标题
- ⛳ 文章目录自动生成（博客园所有编辑器）
- 🎏 自定义背景色、背景图片，支持可重复的背景图片
- ✨ 炫酷可配置的点击特效
- 🔊 音乐播放器
- 🔨 工具栏：点赞、评论、收藏等
- 🔔 自定义通知
- 🧚‍♂️ 自定义 Live2D 模型

## 结构

```
themes/geek/src/
├── main.ts                  # 主题入口
├── constants/               # cnblog 常量与链接配置
├── modules/                 # 功能模块
│   ├── cards/               # 卡片布局
│   ├── footer/              # 页脚
│   ├── left-sidebar/        # 左侧边栏
│   ├── next-prev-post/      # 上下篇导航
│   ├── profile/             # 博主信息
│   ├── right-sidebar/       # 右侧边栏
│   ├── searchbar/           # 搜索栏
│   └── sidebar-toggle/      # 侧边栏开关
├── style/                   # SCSS 样式
│   ├── common/              # animate / hide / markdown / reset / tools
│   ├── plugins.css          # 插件样式
│   └── variables.scss       # 设计变量
└── utils/                   # 博客园上下文工具
```

## 插件使用

geek 在入口中组合了 `codeHighlight`、`codeLinenumbers`、`codeCopy`、`codeLang` 等代码类插件，以及目录、表情、图片预览、音乐播放器、Live2D、工具栏等交互插件，是观察**插件组合方式**的最佳示例。

## 开发

```bash
cd themes/geek
pnpm install
pnpm dev       # 开发（热更新）
pnpm build     # 构建 dist/geek.min.css 与 dist/geek.min.js
```

## 浏览器支持

支持所有现代浏览器（Internet Explorer 11+）。
