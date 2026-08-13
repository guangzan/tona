# Spec: shadcn 皮肤 mermaid 样式对齐

## Problem Statement

shadcn 皮肤随笔详情页中的 mermaid 图表目前是博客园默认渲染样式：节点淡紫底 `#ECECFF` + 紫框 `#9370DB`、簇黄底绿框 `#ffffde`/`#aaaa33`、文字 `#333` + trebuchet ms 字体、边 `#333333` 纯黑、边标签灰底 `rgba(232,232,232,0.8)`、无圆角无边框感，暗色模式下直接刺眼。全仓库（所有皮肤）对 mermaid 零定制，与 shadcn 皮肤的 zinc 中性、CSS 变量驱动的风格严重不符。

博客园渲染的 mermaid 为内联 SVG + 带 `#mermaid-xxx` ID 作用域的 `<style>`（ID 级选择器），主题侧必须以 `!important`（或等效高特异性）+ 主题 CSS 变量覆盖（见 Glossary「Mermaid Override」）。

## Solution

在 shadcn 主题新增 `src/styles/mermaid.css`（`src/styles/globals.css` 中 `@import`），选择器挂在随笔内容容器 `.custom-markdown` 下，用主题 CSS 变量覆盖 mermaid 内联样式的视觉元素：

- **节点**（`.node rect/circle/polygon`、`.cluster rect`）：`fill: var(--muted)`、`stroke: var(--border)`；节点/簇文字 `--foreground`。保持直角（不加 rx）。
- **连线/箭头**（`.flowchart-link`、`.edgePath .path`、`.marker`、`.arrowheadPath`）：`--muted-foreground`。
- **边标签**（`.edgeLabel`、`.labelBkg`）：背景 `color-mix(in oklab, var(--background) 80%, transparent)`，文字 `--foreground`。
- **根规则**（`#mermaid-xxx` 的 `font-family`/`font-size`/`fill`）：继承主题 `--font-sans`，字号 16px → 14px，文本色 `--foreground`。
- **标题**（`.flowchartTitleText`）：`--foreground`。
- **错误色**（`.error-icon`/`.error-text`）：`--destructive`。
- **容器外壳**：`.mermaid` 块容器加代码块同款外壳——`border-radius: 0.5rem`（同 `rounded-lg`）、`border: 1px solid var(--border)`、`padding: 0.875rem 1rem`（同 `py-3.5 px-4`），与正文代码块 `.custom-markdown pre` 一致；不加背景。节点仍保持直角，容器外壳与节点形状互不冲突。
- 全部引用主题 CSS 变量，`.dark` 下自动适配，无需额外暗色规则。

不干预 mermaid 渲染流程，不修改布局/几何（宽度、间距保持博客园渲染结果）。

## User Stories

1. As a 阅读含 mermaid 随笔的访客, I want 图表的节点、连线、文字与皮肤同为中性色系, so that 图表不再像"贴了一张别处的图"，与正文观感一致。
2. As a 暗色模式用户, I want mermaid 图表自动跟随皮肤暗色配色, so that 深夜阅读时图表不刺眼。
3. As a shadcn 主题维护者, I want 覆盖规则集中在独立 css 文件且引用 CSS 变量, so that 后续调色/其它皮肤复用成本低。

## Implementation Decisions

- 新文件 `themes/shadcn/src/styles/mermaid.css`；`src/styles/globals.css` 末尾 `@import './mermaid.css'`（Tailwind v4 `@import` 链，CSS 变量已定义，变量引用在编译期保留为 `var()`）
- 选择器统一以 `.custom-markdown .mermaid` 为前缀（随笔详情页 `post-details` 与列表摘要 `Markdown` 组件共用此容器 class）
- 关键规则带 `!important`（对抗 mermaid 内联 style 的 ID 级特异性）；可读性注释标注每条的覆盖目标
- 覆盖面：flowchart/classDiagram/stateDiagram/erDiagram 等共享 `.node`/`.cluster`/`.edgeLabel`/`.marker` class 的图表全生效；sequenceDiagram 等异结构仅根级字体/文本色收敛
- 字号收敛 14px；`font-family` 继承 `--font-sans`
- 不引入 JS、不改 `post-details`/`markdown` 组件、不动博客园 mermaid 初始化

## Testing Decisions

- 无单元测试缝（纯样式任务）。构建缝：`pnpm --filter tona-theme-shadcn build` 后，`dist/shadcn.min.css` 中 grep 到 `.mermaid` 覆盖规则（`!important` 关键规则存在）
- 视觉验证（手动）：在含 mermaid 的真实随笔页加载构建产物，检查 light/dark 两态下：flowchart 节点（`--muted` 底 + `--border` 边 + 直角）、连线箭头（`--muted-foreground`）、簇、边标签、标题、字体与正文一致；抽查一份 classDiagram 确认共享 class 覆盖生效
- 回归：无 mermaid 的随笔页不受影响（选择器限定 `.custom-markdown .mermaid` 内）
- 样式规范：新 css 过 stylelint（仓库已配置，与现有 css 文件同规则）

## Out of Scope

- 其它皮肤（geek/reacg/simple/view）的 mermaid 样式
- sequenceDiagram/gantt/pie 等异结构图表的深度精修
- 修改 mermaid 渲染流程、图表内容或布局算法
- 节点圆角（用户明确保持直角）

## Further Notes

- 对齐来源：`docs/monorail/shadcn-mermaid-style/align.md`
- 术语：`docs/monorail/CONTEXT.md` — Mermaid Override
- 博客园 mermaid 内联 style 的实际选择器清单以用户提供的真实随笔元素（flowchart-v2）为准，覆盖规则以此为基线
