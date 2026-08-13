#!/usr/bin/env node
/**
 * 站点内部链接检查脚本
 *
 * 遍历构建产物（默认 doc_build/）中的所有 HTML，提取内部链接
 * （<a href>、<img src>、<script src>、<link href>、<source src>），
 * 校验：
 *   1. 目标文件存在（支持 .html 后缀省略与目录 index.html 解析）；
 *   2. 锚点（#xxx）在目标页面中存在对应 id（支持 md 标题生成的锚点）；
 *   3. 资源（图片 / JS / CSS）文件存在。
 *
 * 外部链接（http(s)://、mailto:、tel:、javascript:、data:）跳过。
 * 发现任何死链时打印明细并以非零码退出。
 *
 * 用法：node scripts/check-links.mjs [--outDir <dir>] [--base <path>]
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, dirname, extname, posix } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const args = process.argv.slice(2)

function parseArg(name, fallback) {
  const i = args.indexOf(name)
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback
}

const outDir = join(root, parseArg('--outDir', 'doc_build'))
const base = parseArg('--base', '/')

/** 收集所有 HTML 文件路径 */
function collectHtmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      collectHtmlFiles(full, acc)
    } else if (entry.name.endsWith('.html')) {
      acc.push(full)
    }
  }
  return acc
}

/** 将站点 URL（如 /guide/quick-start）解析为构建产物中的文件路径 */
function resolveSiteUrl(url) {
  // 去掉 base 前缀
  let pathname = url.split('?')[0].split('#')[0]
  if (base !== '/' && pathname.startsWith(base)) {
    pathname = pathname.slice(base.length - 1) // 保留开头的 /
  }
  if (!pathname.startsWith('/')) {
    pathname = '/' + pathname
  }
  let file = join(outDir, pathname)
  if (existsSync(file) && statSync(file).isDirectory()) {
    file = join(file, 'index.html')
  }
  if (!existsSync(file) && !extname(file)) {
    const withHtml = file + '.html'
    if (existsSync(withHtml)) {
      file = withHtml
    }
  }
  return file
}

/** 提取 HTML 中的 id 锚点 */
function collectAnchors(html) {
  const anchors = new Set()
  const idRe = /\sid="([^"]+)"/g
  let m
  while ((m = idRe.exec(html)) !== null) {
    anchors.add(m[1])
  }
  return anchors
}

/** 从 md 标题推导 rspress 锚点（与 remark 默认 slug 规则一致） */
function collectHeadingAnchors(html) {
  const anchors = new Set()
  // rspress 为标题生成 header-anchor 链接，href 指向 #slug
  const re = /<a[^>]+class="[^"]*header-anchor[^"]*"[^>]+href="#([^"]+)"/g
  let m
  while ((m = re.exec(html)) !== null) {
    anchors.add(m[1])
  }
  return anchors
}

const errors = []
let checked = 0

function checkTarget(file, url, fromFile) {
  const target = resolveSiteUrl(url)
  if (!existsSync(target)) {
    errors.push(`${fromFile}: 目标不存在 -> ${url}`)
    return null
  }
  if (statSync(target).isDirectory()) {
    errors.push(`${fromFile}: 目标为目录 -> ${url}`)
    return null
  }
  return readFileSync(target, 'utf8')
}

const attrRe = /\b(?:href|src)\s*=\s*"([^"]*)"/g

for (const file of collectHtmlFiles(outDir)) {
  const html = readFileSync(file, 'utf8')
  const relative = posix.relative(outDir, file)
  const hashOnly = new Set()

  let m
  while ((m = attrRe.exec(html)) !== null) {
    const raw = m[1].trim()
    if (!raw || raw.startsWith('#') || raw.startsWith('?')) {
      if (raw.startsWith('#')) {
        hashOnly.add(raw.slice(1))
      }
      continue
    }
    if (/^(https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(raw)) {
      continue
    }
    checked++

    // 相对路径：基于当前页面目录解析
    let url = raw
    if (!raw.startsWith('/')) {
      const dir = posix.dirname(relative)
      url = posix.normalize('/' + (dir === '.' ? '' : dir + '/') + raw)
    }
    const [pathPart, hash] = url.split('#')

    if (extname(pathPart) && extname(pathPart) !== '.html') {
      // 静态资源
      const target = resolveSiteUrl(pathPart)
      if (!existsSync(target) || statSync(target).isDirectory()) {
        errors.push(`${relative}: 资源不存在 -> ${raw}`)
      }
      continue
    }

    const targetHtml = checkTarget(pathPart, raw, relative)
    if (targetHtml === null) {
      continue
    }
    if (hash) {
      const anchors = new Set([...collectAnchors(targetHtml), ...collectHeadingAnchors(targetHtml)])
      if (!anchors.has(decodeURIComponent(hash))) {
        errors.push(`${relative}: 锚点不存在 -> ${raw}`)
      }
    }
  }

  // 纯锚点链接（#xxx）应在当前页存在
  for (const anchor of hashOnly) {
    const anchors = new Set([...collectAnchors(html), ...collectHeadingAnchors(html)])
    if (anchor && !anchors.has(decodeURIComponent(anchor))) {
      errors.push(`${relative}: 本页锚点不存在 -> #${anchor}`)
    }
  }
}

console.log(`检查完成：共校验 ${checked} 个内部链接，${errors.length} 个错误。`)
for (const e of errors) {
  console.error(`  ✗ ${e}`)
}
process.exit(errors.length === 0 ? 0 : 1)
