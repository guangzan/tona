# reacg 主题

`tona-theme-reacg`（`themes/reacg`）—— ACG（二次元）风格主题，通过 iconfont 图标系统与模块化结构实现独特的视觉风格。

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
themes/reacg/src/
├── main.ts                  # 主题入口
├── common/                  # 跨模块公共代码
│   ├── constants/           # cnblog 常量与链接配置
│   ├── style/               # animate / hide / markdown / reset / tools
│   └── utils/               # cnblog 上下文工具
├── modules/
│   ├── icons/               # iconfont 图标系统
│   ├── mobileMenu/          # 移动端侧边按钮菜单
│   ├── profile/             # 侧边栏头像与信息
│   └── scroll/              # 滚动时隐藏页头
└── style/                   # SCSS 样式
    ├── index.scss
    ├── markdown.scss
    ├── plugins.css          # 插件样式
    ├── response.scss        # 响应式
    └── variables.scss       # 设计变量
```

## 开发

```bash
cd themes/reacg
pnpm install
pnpm dev       # 开发（热更新）
pnpm build     # 构建 dist/reacg.min.css 与 dist/reacg.min.js
```

## 浏览器支持

支持所有现代浏览器（Internet Explorer 11+）。
