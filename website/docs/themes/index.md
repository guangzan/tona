# 主题概览

Tona 仓库自带五套内置主题，位于 `themes/` 目录。它们既是**可直接使用的成品皮肤**，也是**最佳实践参考**：每套主题都展示了如何组织模块、组合插件、管理样式与配置。

## 主题对比

| 主题 | 包名 | 特点 | 技术栈 |
| --- | --- | --- | --- |
| [shadcn](/themes/shadcn) | `tona-theme-shadcn` | 现代简洁的 shadcn/ui 风格，卡片式布局、响应式设计、优雅排版，内置 SPA 组件体系 | Preact + Tailwind CSS 4 + Base UI + motion |
| [geek](/themes/geek) | `tona-theme-geek` | 经典极客风，功能全面（目录、表情、图片预览、音乐播放器、Live2D 等） | TypeScript + SCSS |
| [simple](/themes/simple) | `tona-theme-simple` | 极简风格，专注于阅读体验 | TypeScript + SCSS |
| [view](/themes/view) | `tona-theme-view` | 视图风格，内容展示为主 | TypeScript + SCSS |
| [reacg](/themes/reacg) | `tona-theme-reacg` | ACG 风格，适合二次元内容 | TypeScript + SCSS |

## 目录结构

每套主题都遵循统一的 `tona-vite` 项目结构：

```
themes/geek/
├── src/
│   ├── main.ts            # 主题入口：createTheme + 插件组合
│   ├── modules/           # 功能模块（导航、侧边栏、页脚……）
│   ├── style/             # SCSS 样式（变量、mixins、markdown……）
│   └── utils/             # 博客园上下文工具
├── dist/                  # 构建产物
│   ├── geek.min.css
│   └── geek.min.js
├── vite.config.ts         # vite-plus + tona-vite
└── package.json
```

## 开发主题

```bash
cd themes/geek
pnpm install
pnpm dev      # 开发（热更新）
pnpm build    # 构建 dist 产物
```

构建产物可直接部署到博客园（CSS 粘贴到「页面定制 CSS」，JS 放入「页脚 HTML」），也可由发布流水线自动打包上传。

## 主题数据

`tona-themes`（`packages/data`）包维护了各主题在博客园的注册数据（别名、CDN 脚本地址），`dist/themes.json` 提供机器可读的 JSON 导出，供博客园皮肤市场类应用使用。

## 下一步

- [shadcn](/themes/shadcn) —— 现代 SPA 主题
- [geek](/themes/geek) —— 功能最全面的主题
- [Monorepo 包结构](/monorepo/packages)
