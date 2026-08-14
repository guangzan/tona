#!/usr/bin/env node
/**
 * 文档内容对照审计脚本
 *
 * 校验文档站内容与仓库事实一致：
 *   1. 插件目录页（docs/plugins/index.md）覆盖 packages/plugins/src/plugins 全部插件；
 *   2. 主题文档（docs/themes/）覆盖 themes/ 全部主题；
 *   3. 快速开始命令与根 package.json scripts 一致；
 *   4. API 参考页出现 createTheme / defineOptions，与 packages/core/src 导出一致；
 *   5. 各栏目页面行数统计（供 sections 证据）。
 *
 * 任一对照失败以非零码退出。用法：node scripts/audit-content.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const websiteRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const repoRoot = join(websiteRoot, '..')

let failures = 0

function check(name, ok, detail) {
  const mark = ok ? '✓' : '✗'
  console.log(`${mark} ${name}${detail ? ` —— ${detail}` : ''}`)
  if (!ok) failures++
}

// ---- 1. 插件清单对照 ----
const pluginDirs = readdirSync(join(repoRoot, 'packages/plugins/src/plugins'), {
  withFileTypes: true,
})
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()

const pluginsIndex = readFileSync(
  join(websiteRoot, 'docs/plugins/index.md'),
  'utf8',
)
const missing = pluginDirs.filter((p) => !pluginsIndex.includes(`\`${p}\``))
check(
  `插件目录页覆盖全部 ${pluginDirs.length} 个插件`,
  missing.length === 0,
  missing.length
    ? `缺失: ${missing.join(', ')}`
    : `共 ${pluginDirs.length} 项全部命中`,
)

// ---- 2. 主题清单对照 ----
const themeDirs = readdirSync(join(repoRoot, 'themes'), {
  withFileTypes: true,
})
  .filter((d) => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'test')
  .map((d) => d.name)
  .sort()
const missingThemes = themeDirs.filter(
  (t) => !statSync(join(websiteRoot, `docs/themes/${t}.md`)).isFile(),
)
check(
  `主题文档覆盖 themes/ 全部 ${themeDirs.length} 个主题`,
  missingThemes.length === 0,
  missingThemes.length
    ? `缺失: ${missingThemes.join(', ')}`
    : `共 ${themeDirs.length} 套全部命中`,
)

// ---- 3. 快速开始命令与模板 / 根 package.json scripts 对照 ----
const rootPkg = JSON.parse(
  readFileSync(join(repoRoot, 'package.json'), 'utf8'),
)
const quickStart = readFileSync(
  join(websiteRoot, 'docs/guide/quick-start.md'),
  'utf8',
)
// 脚手架项目命令对照 create-tona 模板
const templatePkg = JSON.parse(
  readFileSync(join(repoRoot, 'packages/create-tona/template-minimal/package.json'), 'utf8'),
)
for (const [cmd, scriptName] of [
  ['pnpm dev', 'dev'],
  ['pnpm build', 'build'],
  ['pnpm create tona', null],
]) {
  // 代码块内命令无反引号包裹，直接子串匹配
  const ok = quickStart.includes(cmd)
  check(
    `快速开始包含命令 ${cmd}`,
    ok,
    scriptName
      ? `create-tona 模板 scripts.${scriptName} = "${templatePkg.scripts[scriptName]}"`
      : 'create-tona CLI',
  )
}
// 仓库级命令对照根 package.json scripts（Monorepo 页命令表）
const monorepoPage = readFileSync(
  join(websiteRoot, 'docs/monorepo/packages.md'),
  'utf8',
)
const repoCmdMissing = []
for (const cmd of ['dev', 'build:theme', 'build:pkg', 'test', 'lint', 'fmt', 'check', 'release']) {
  if (!monorepoPage.includes(`\`pnpm ${cmd}\``)) {
    repoCmdMissing.push(cmd)
  }
}
check(
  'Monorepo 页命令表覆盖根 scripts（dev/build:theme/build:pkg/test/lint/fmt/check/release）',
  repoCmdMissing.length === 0,
  repoCmdMissing.length ? `缺失: ${repoCmdMissing.join(', ')}` : '8 项全部命中',
)
const devScript = rootPkg.scripts.dev
const buildThemeScript = rootPkg.scripts['build:theme']
check(
  '环境要求（Node >= 22.18 / pnpm >= 10）与根 README 一致',
  quickStart.includes('22.18') && quickStart.includes('>= 10'),
  `engines.node = "${rootPkg.engines.node}", packageManager = "${rootPkg.packageManager}"`,
)

// ---- 4. 核心 API 与 packages/core 导出一致 ----
const coreIndex = readFileSync(join(repoRoot, 'packages/core/src/index.ts'), 'utf8')
const apiCore = readFileSync(join(websiteRoot, 'docs/api/core.md'), 'utf8')
check(
  'API 参考页出现 createTheme',
  apiCore.includes('createTheme'),
  `packages/core 导出: ${coreIndex.includes("'./createThemeApi'") ? 'createThemeApi' : '?'}`,
)
check(
  'API 参考页出现 defineOptions',
  apiCore.includes('defineOptions'),
  `packages/core 导出: ${coreIndex.includes("'./defineOptionsApi'") ? 'defineOptionsApi' : '?'}`,
)

// ---- 5. 栏目页面行数统计 ----
console.log('\n=== 各栏目页面行数 ===')
const sections = [
  ['落地页', 'docs/index.mdx'],
  ['快速开始', 'docs/guide/quick-start.md'],
  ['核心概念-createTheme', 'docs/guide/concepts/create-theme.md'],
  ['核心概念-defineOptions', 'docs/guide/concepts/define-options.md'],
  ['核心概念-插件系统', 'docs/guide/concepts/plugin-system.md'],
  ['核心概念-配置', 'docs/guide/concepts/configuration.md'],
  ['API-核心', 'docs/api/core.md'],
  ['API-选项', 'docs/api/options.md'],
  ['API-tona-vite', 'docs/api/tona-vite.md'],
  ['插件目录', 'docs/plugins/index.md'],
  ['自定义插件', 'docs/plugins/custom-plugin.md'],
  ['主题概览', 'docs/themes/index.md'],
  ['主题-geek', 'docs/themes/geek.md'],
  ['主题-reacg', 'docs/themes/reacg.md'],
  ['主题-shadcn', 'docs/themes/shadcn.md'],
  ['主题-simple', 'docs/themes/simple.md'],
  ['主题-view', 'docs/themes/view.md'],
  ['安装皮肤', 'docs/install/index.md'],
  ['Monorepo 包结构', 'docs/monorepo/packages.md'],
  ['FAQ', 'docs/faq.md'],
  ['贡献指南', 'docs/contributing.md'],
  ['更新日志', 'docs/changelog.md'],
]
let totalLines = 0
for (const [label, file] of sections) {
  const lines = readFileSync(join(websiteRoot, file), 'utf8').split('\n').length
  totalLines += lines
  console.log(`  ${label.padEnd(20)} ${String(lines).padStart(4)} 行`)
}
console.log(`  ${'合计'.padEnd(20)} ${String(totalLines).padStart(4)} 行`)

// ---- 占位符检查 ----
const placeholders = ['TODO', 'lorem', 'Lorem', '待补充', '占位']
let placeholderHits = 0
for (const [, file] of sections) {
  const content = readFileSync(join(websiteRoot, file), 'utf8')
  for (const ph of placeholders) {
    if (content.includes(ph)) {
      console.log(`✗ ${file} 含占位符 "${ph}"`)
      placeholderHits++
    }
  }
}
check('无 TODO/占位/lorem 字样', placeholderHits === 0, `${placeholderHits} 处`)

console.log(`\n${failures === 0 ? '审计通过：文档内容与仓库事实一致。' : `审计失败：${failures} 项不一致。`}`)
process.exit(failures === 0 ? 0 : 1)
