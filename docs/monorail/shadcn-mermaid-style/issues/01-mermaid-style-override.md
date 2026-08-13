# 01 — shadcn mermaid 样式覆盖

Status: done
Blocked by: None

## What to build

shadcn 皮肤随笔详情页（`.custom-markdown` 容器）内的 mermaid 图表当前是博客园默认渲染样式（淡紫节点、黄绿簇、`#333` 文字 + trebuchet ms 字体、纯黑连线、暗色刺眼）。新增 `themes/shadcn/src/styles/mermaid.css` 并在 `src/styles/globals.css` 中 `@import`，以 `!important` + 主题 CSS 变量覆盖 mermaid 内联 style（ID 级选择器，见 Glossary「Mermaid Override」），使图表与皮肤视觉统一并自动适配 light/dark。

覆盖清单（以真实随笔元素中的 flowchart-v2 内联 style 为基线）：

- 节点/簇：`.node rect/circle/ellipse/polygon`、`.cluster rect` → `fill: var(--muted)`、`stroke: var(--border)`，保持直角（不加 rx）；节点/簇文字（`.node .label text`、`.cluster text/span` 及根 `#mermaid-xxx` 的 `fill`）→ `var(--foreground)`
- 连线/箭头：`.flowchart-link`、`.edgePath .path`、`.marker`、`.arrowheadPath` → `var(--muted-foreground)`
- 边标签：`.edgeLabel`、`.labelBkg` → 背景 `color-mix(in oklab, var(--background) 80%, transparent)`，文字 `var(--foreground)`
- 根规则字体/字号：`#mermaid-xxx` 的 `font-family` 继承 `--font-sans`，`font-size` 16px → 14px
- 标题：`.flowchartTitleText` → `var(--foreground)`
- 错误色：`.error-icon`、`.error-text` → `var(--destructive)`
- 容器外壳：`.mermaid` 块容器 → `border-radius: 0.5rem`、`border: 1px solid var(--border)`、`padding: 0.875rem 1rem`（与正文代码块 `.custom-markdown pre` 的 `rounded-lg px-4 py-3.5` 同款），不加背景；节点保持直角不受影响

选择器统一以 `.custom-markdown .mermaid` 为前缀（详情页 `post-details` 与列表摘要 `Markdown` 组件共用该容器）。全部引用主题 CSS 变量，`.dark` 下自动切换，不写额外暗色规则、不干预 mermaid 渲染流程、不动布局几何。

## Acceptance criteria

- [x] `src/styles/mermaid.css` 新建，`globals.css` 末尾 `@import './mermaid.css'`
- [x] 节点/簇为 `--muted` 底 + `--border` 边框 + `--foreground` 文字，保持直角
- [x] 连线与箭头为 `--muted-foreground`
- [x] 边标签背景为 `--background` 半透明（`color-mix`），文字 `--foreground`
- [x] 字体继承 `--font-sans`，字号 14px；标题 `--foreground`
- [x] 错误色为 `--destructive`
- [x] `.mermaid` 容器有代码块同款外壳：`0.5rem` 圆角 + `1px solid var(--border)` 边框 + `0.875rem 1rem` 内距，无背景；节点仍直角
- [x] 关键规则带 `!important`（可覆盖 mermaid 内联 style 的 ID 级选择器），每条有注释说明覆盖目标
- [x] 无硬编码色值/字体；无 `.dark` 专属 mermaid 规则（暗色由 CSS 变量自动适配）
- [x] `pnpm --filter tona-theme-shadcn build` 后 `dist/shadcn.min.css` 可 grep 到 `.mermaid` 覆盖规则
- [ ] 真实随笔页（含 mermaid flowchart）视觉验证：light/dark 两态下节点、连线、簇、边标签、标题均与皮肤一致；classDiagram 等共享 class 图表抽查生效
- [x] 无 mermaid 的随笔页无视觉回归（选择器限定 `.custom-markdown .mermaid` 内）；stylelint 通过

## Comments

2026-08-13 build（01 完成）：
- 新增 `themes/shadcn/src/styles/mermaid.css`（容器外壳 + 根规则 + 节点/簇 + 连线/箭头 + 边标签 + 标题 + 错误色，全部 `!important` + 主题 CSS 变量）；`globals.css` 末尾追加 `@import './mermaid.css'`
- `pnpm --filter tona-theme-shadcn build` 成功，`dist/shadcn.min.css` 134.10 kB；grep 命中全部 `.custom-markdown .mermaid` 规则，`color-mix` 带 fallback，选择器前缀完整
- stylelint：`mermaid.css`/`globals.css` 零错误（`shadcn/themes.css` 的 `@variant` 等为既有存量报错，与本任务无关）
- tsc：3 个存量错误（`post-hero`、`env.ts`，非本次文件）
- 待用户确认：真实随笔页 light/dark 视觉验证（构建缝已绿；如视觉有不符可在本 issue Comments 反馈）
