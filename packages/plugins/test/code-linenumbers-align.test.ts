import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vite-plus/test'

/**
 * 代码行号对齐契约（codeLinenumbers ↔ 博客园 bundle）。
 *
 * 症状：Markdown 代码块的行号整体高于对应代码行（实测恒定 -16px，全站所有代码块）。
 *
 * 根因：行号容器是 `<ul class="awes-linenumber">`，而博客园 bundle 带有
 *   `#mainContent .cnblogs-markdown ul { margin: 22px 0; padding: 0 0 0 28px }`
 * 该选择器（1 id + 2 class + 1 元素）与插件原先的
 *   `#cnblogs_post_body pre .awes-linenumber`（1 id + 2 class + 2 元素）
 * 相比在 class 层更高，且 bundle 先加载，把插件的 `padding-top: 16px` 归零。
 * 代码文本位于 `code` 自身 padding-top（codeHighlight 的 `.hljs` 规则）之下，
 * 于是行号与代码文本相差一整个 padding（实测恒定 -16px）。
 *
 * 契约：行号 `<ul>` 的 padding 必须用 **严格高于** bundle 规则的特异性声明
 * （相等会因 bundle 先加载而被覆盖），保证 `padding-top` 生效。
 */

const pluginsRoot = path.resolve(__dirname, '../src/plugins')
// 注释里含反引号选择器示例，解析规则前必须先剔除注释
const css = fs
  .readFileSync(path.join(pluginsRoot, 'codeLinenumbers/index.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')

/** 计算选择器特异性 [id, class, element]，用于与 bundle 规则比较 */
function specificity(selector: string): [number, number, number] {
  const s = selector.trim()
  const ids = (s.match(/#[\w-]+/g) ?? []).length
  const classes =
    (s.match(/\.[\w-]+/g) ?? []).length +
    (s.match(/\[[^\]]+\]/g) ?? []).length +
    (s.match(/:(?!:)[\w-]+/g) ?? []).length
  const els =
    (s.match(/(^|[\s>+~])[a-zA-Z][\w-]*/g) ?? []).length +
    (s.match(/::[\w-]+/g) ?? []).length
  return [ids, classes, els]
}

/**
 * 严格大于。特异性相等时按源顺序决胜：bundle 先于插件加载，
 * 故插件必须严格更高特异性才能覆盖 `padding`。
 */
function strictGt(a: [number, number, number], b: [number, number, number]) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] > b[i]
  }
  return false
}

/** 取出所有「选择器 -> 声明体」中命中 .awes-linenumber 的规则 */
function linenumberUlRules(source: string) {
  const out: Array<{ selectors: string[]; body: string }> = []
  const re = /([^{}]+)\{([^{}]*)\}/g
  let m: RegExpExecArray | null
  while ((m = re.exec(source))) {
    const selectors = m[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    if (selectors.some((s) => s.includes('.awes-linenumber') && !s.includes(' li'))) {
      out.push({ selectors, body: m[2] })
    }
  }
  return out
}

describe('codeLinenumbers 行号 <ul> 对齐契约', () => {
  it('存在声明 padding-top 的正值规则（不被 bundle 归零）', () => {
    const rules = linenumberUlRules(css)
    const withPadding = rules.filter((r) => /padding:\s*[^;]*\d/.test(r.body))
    expect(
      withPadding.length,
      '应存在为 .awes-linenumber 声明 padding 的规则',
    ).toBeGreaterThan(0)
  })

  it('padding 规则的选择器特异性严格高于 bundle 的 #mainContent .cnblogs-markdown ul', () => {
    // 博客园 bundle 中把 ul padding 归零的规则
    const bundleRule = '#mainContent .cnblogs-markdown ul'
    const bundleSpec = specificity(bundleRule)

    const rules = linenumberUlRules(css).filter((r) =>
      /padding:\s*[^;]*\d/.test(r.body),
    )

    const covering = rules.filter((r) =>
      r.selectors.some((s) => strictGt(specificity(s), bundleSpec)),
    )

    expect(
      covering.length,
      `至少有一条 padding 规则的选择器特异性需 **严格高于** ${bundleRule} ` +
        `(${bundleSpec.join(',')})——相等会因 bundle 先加载而被覆盖，` +
        `导致 padding-top 归零、行号上移。` +
        `当前 padding 规则选择器：${rules.flatMap((r) => r.selectors).join(' | ')}`,
    ).toBeGreaterThan(0)
  })

  it('padding-top 与 codeHighlight 的 code padding-top 一致（同源 16px）', () => {
    const rules = linenumberUlRules(css)
    const allPadding = rules.map((r) => r.body).join('\n')
    // codeHighlight 的 .hljs 规则使用 padding: 16px 10px 8px 13px
    expect(
      allPadding,
      '行号容器 padding-top 应为 16px，与 code 的 padding-top 对齐',
    ).toMatch(/padding:\s*16px/)
  })
})
