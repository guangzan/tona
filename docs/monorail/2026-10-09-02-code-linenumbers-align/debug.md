# code-linenumbers-align — 行号对齐 debug 记录

## 症状

Markdown 代码块的行号**整体高于**对应代码行：编号 1、2、3 分别落在代码第 1、2、3 行的**上方**约一行位置，末行常常没有编号对应。全站**所有**代码块一致（非偶发）。

来源：用户提供的文章 <https://www.cnblogs.com/zaoshuizaoqizhenjun/p/21936069>，其页面上 15 个代码块全部可复现。

## 诊断方法

无浏览器验证授权，故用无头 Chromium（Playwright 缓存的 `chrome-headless-shell`）通过 CDP 直接**量测真实页面**：

- `Runtime.evaluate` + `document.createRange()` 取 `li` 与 `code` 每行文本的行盒 `top`；
- 差值 `liTextTop - codeTextTop` 即视觉偏移。

关键教训：**必须比文本行盒，不能比 border box**。早期用 `getBoundingClientRect()` 比元素盒得到 `delta = 0`（元素盒顶部都对齐），掩盖了真实 bug；换成 `Range` 取文本行盒后才暴露恒定 `-16px`。

## 根因

行号容器是 `<ul class="awes-linenumber">`，而博客园 bundle 中有一条：

```css
#mainContent .cnblogs-markdown ul { margin: 22px 0; padding: 0 0 0 28px; }
```

特异性 **1 id + 2 class + 1 元素**。插件原先的：

```css
#cnblogs_post_body pre .awes-linenumber { margin: 0; padding: 16px 16px 8px 16px; }
```

特异性 **1 id + 1 class + 2 元素**，class 层更低，且 bundle 先加载 → 插件的 `padding-top: 16px` 被 `padding: 0` 覆盖归零。

与此同时 `code` 自身有 `padding-top: 16px`（codeHighlight 的 `.hljs` 规则）。于是：

- 行号 `<li>` 从 `<ul>` 顶部开始；
- 代码文本从 `code` 顶部 + 16px 开始。

→ 行号整体上移 **16px**（实测恒定，不随行号累积）。

## 修复

把该规则的选择器提升到**严格高于** bundle 的特异性，并覆盖两种页面结构：

```css
#cnblogs_post_body pre ul.awes-linenumber,
#mainContent .cnblogs-markdown pre ul.awes-linenumber {
  margin: 0;
  padding: 16px 16px 8px 16px;
}
```

## 验证

真实文章页，15 个代码块全部：

| | 偏移（所有块） |
|---|---|
| 修复前 | 恒定 `-16px` |
| 修复后 | `0px` |

## 被证伪的假设（重要，避免下次重走）

1. **字号不一致导致行高漂移** —— 一度以为是行号 `font-size: 15px` 与代码字号脱钩、在相对 `line-height` 下逐行累积漂移。在**自建 harness** 里确实复现出累积漂移（14 行差 40px），但那是 harness 用了不符合真实的字号状态；真实页面两侧都是 `15px / 22.5px`，**不存在**累积漂移。据此写的 `--code-font-size` 变量方案已全部回退。
2. **`line-height` 需要改 `inherit`** —— 实测会变坏（`normal` 解析成 15px，反而重新引入漂移）。
3. **`1em` 方案**（`dist/` 里曾出现的旧写法）—— 看似「相对字号」，但真实页面 `code` 被 `codeHighlight` 的 `!important` 钉在 15px，而 `pre` 继承 16px，`1em` 仍会错位（实测 -18.5px）。
4. **单纯提升 `<ul>` 的 padding 特异性就能修好** —— 方向对，但早期误判为「font-size 问题」时改错了地方；且一度用元素盒测量得出 `delta=0`，差点误判为「无需修复」。

## 防复发

新增回归测试 `packages/plugins/test/code-linenumbers-align.test.ts`：

- 断言存在为 `.awes-linenumber` 声明 `padding` 的规则；
- 断言其选择器特异性**严格高于** `#mainContent .cnblogs-markdown ul`（相等会因源顺序被覆盖）；
- 断言 `padding-top` 为 `16px`（与 `code` 对齐）。

已验证该测试**具备红能力**：对 `git HEAD` 版本的 CSS 变红，对修复后的 CSS 变绿。

**并已在 vitest 下真实执行通过**（3 tests passed）—— 见下方构建修复。

---

# 附：构建失败修复（同轮完成）

修复行号期间发现 `pnpm dev` / `pnpm build:pkg` 全线失败，阻塞了测试链，一并处理。

## 症状

```
packages/hooks build: Failed
Error: Cannot find native binding. npm has a bug related to optional dependencies...
  [cause]: ERR_PACKAGE_PATH_NOT_EXPORTED: Package subpath './binding' is not defined
           by "exports" in node_modules/vite-plus/package.json
```

## 根因

`pnpm-workspace.yaml` 的 catalog 里：

```yaml
vitest: npm:@voidzero-dev/vite-plus-test@latest   # → 0.1.24
vite-plus: latest                                  # → 1.1.0
```

`@voidzero-dev/vite-plus-test@0.1.24`（**已是该包最新版**）硬依赖 `vite-plus-core@0.1.24`
（精确版本 `"0.1.24"`）。而 core@0.1.24 的原生 binding 加载器走**两代契约**：

```js
// dist/rolldown/shared/binding-*.mjs
__require("./rolldown-binding.darwin-arm64.node")   // ① 同目录相对文件 —— 不存在
__require("vite-plus/binding")                       // ② 回退到 vite-plus 包，要求版本 === "0.1.24"
```

但仓库装的 `vite-plus@1.1.0` **已移除 `./binding` 导出**（二进制迁移到独立平台包
`@voidzero-dev/vite-plus-darwin-arm64`，文件名也改为 `vite-plus.darwin-arm64.node`）。
两条路都断 → `Cannot find native binding`。

**本质：catalog 把两条不同发布线的包凑到了一起**（`vite-plus` 1.x 与 `vite-plus-test` 0.1.x）。

## 验证与修复

- 先验证 `pnpm install` **无效**（`Already up to date`，lockfile 未变）——lockfile 已是最新组合。
- 决定性实验：把平台包二进制符号链接到 core@0.1.24 期望路径 → `vp pack` **立即成功**（1334ms）；
  移除后恢复失败。根因坐实。（实验链接已清理）
- 修复：`vite-plus@1.1.0` 自身依赖 **`vitest: 5.0.3`**（精确），故把 catalog 的 `vitest`
  别名指向真正的 `vitest@5.0.3`；同时把 `@vitest/ui` 从 `^4.1.0` 对齐到 `5.0.3`
  （vitest@5 要求 `@vitest/ui@5`）。

```yaml
vitest: 5.0.3
'@vitest/ui': 5.0.3
```

## 结果

| 项目 | 修复前 | 修复后 |
|---|---|---|
| `pnpm build:pkg` | Failed | ✅ 25 个包全部 Done |
| `pnpm -C themes/geek build` | Failed | ✅ built in 515ms |
| `pnpm dev --theme geek` | 失败 | ✅ 皮肤 geek 启动成功 |
| `vp test` / `vp lint` / `vp fmt` | 不可用 | ✅ 全部可用 |
| 依赖树中的 `vite-plus-test` | 存在 | 0（完全移出） |
| `vite-plus-core` | 0.1.24 + 1.1.0 并存 | 仅 1.1.0 |

全量测试 **295/296 通过**。唯一失败 `packages/tona-vite/test/cold-start.test.ts`
（`expected 403 to be 200`）为**既有环境问题**，与本次改动无关：独立诊断显示
`http://localhost:PORT/src/main.js` 返回 403、`http://127.0.0.1:PORT/` 直接 fetch failed，
指向本机网络环境（`/etc/hosts` 含深信服 `localhost.sangfor.com.cn` 条目）。

## 教训

catalog 用 `latest` 会让**不同发布线**的包漂到一起。`vite-plus` 与其官方 vitest 封装
（`vite-plus-test`）版本号不同步时，应显式对齐到 `vite-plus` 自身依赖声明的版本。

