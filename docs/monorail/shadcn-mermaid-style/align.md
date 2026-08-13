# Align: shadcn 皮肤 mermaid 样式对齐

## Intent

shadcn 皮肤随笔详情页中的 mermaid 图表目前是博客园默认渲染样式（淡紫节点 `#ECECFF`/`#9370DB`、黄绿簇 `#ffffde`/`#aaaa33`、`#333` 文字 + trebuchet ms 字体、直角无边框感、暗色下刺眼），与皮肤的 zinc 中性 shadcn 风格严重不符。目标是让 mermaid 图表与皮肤视觉统一（配色、字体、边框），并自动适配 light/dark 模式。

## Decisions settled

- **节点基调：中性灰块**。节点填充 `--muted`、边框 `--border`、文字 `--foreground`；簇（cluster）同规则。
- **覆盖范围：统一覆盖共享元素 + 常见图表**。mermaid 注入的 style 规则是统一的，`.node`/`.cluster`/`.edgeLabel`/`.marker`/`flowchart-link` 等 class 在 flowchart/classDiagram/stateDiagram/erDiagram 间大量复用，一份规则全部生效；字体、标题、文本色等基础项统一覆盖。sequenceDiagram 等结构差异大的只保证字体/文字色不违和，不做精修。
- **节点形状：保持直角**（用户明确选择，不加 rx 圆角）。节点与容器是两层：容器加外壳，节点仍直角。
- **容器外壳：代码块同款**。`.mermaid` 块容器加圆角 + 边框 + 内距，与正文代码块（`.custom-markdown pre`：`rounded-lg` 0.5rem 圆角、`px-4 py-3.5` 内距）同款：`border-radius: 0.5rem`、`border: 1px solid var(--border)`、`padding: 0.875rem 1rem`。不加背景（代码块 pre 亦无显式背景，SVG 自身有内容色）。
- **连线/箭头：`--muted-foreground` 弱化**，节点文字保持 `--foreground`，层次分明。
- **边标签背景**：`--background` 半透明，替代默认 `rgba(232,232,232,0.8)`。
- **字体**：覆盖为继承主题 `--font-sans`，字号由默认 16px 收敛到与正文协调（约 14px）。
- **实现机制：纯 CSS 覆盖**。博客园渲染的 mermaid 内联 `<style>` 为 `#mermaid-xxx` ID 级选择器，主题侧以 `!important` + 主题 CSS 变量覆盖（变量在 `.dark` 下自动切换，无需额外暗色规则）。不干预 mermaid 渲染流程。
- **落地位置**：新增 `themes/shadcn/src/styles/mermaid.css`，在 `src/styles/globals.css` 中 `@import`。选择器挂在 `.custom-markdown` 下（随笔详情页容器），列表页摘要实例同样受益。

## Deferred

- 其它皮肤（geek/reacg/simple/view）的 mermaid 样式：各皮肤风格独立，后续需要时各自单独做。
- sequenceDiagram / gantt / pie 等异结构图表的深度精修（actor 框、消息线、扇形配色）。

## Out of scope

- 修改博客园 mermaid 初始化/渲染逻辑（无法从主题侧干预）。
- 修改 mermaid 库源码或引入自研渲染。
- 修改 mermaid 图表内容/布局算法（仅视觉样式覆盖）。

## Domain pointers

- 新增 glossary 术语 **Mermaid Override**（见 `docs/monorail/CONTEXT.md`）：主题以 CSS 变量 + `!important` 覆盖博客园渲染的 mermaid 内联样式的机制。
