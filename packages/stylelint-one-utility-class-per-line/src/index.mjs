import stylelint from 'stylelint'

import { indentClassNames } from './utils.mjs'

const {
  createPlugin,
  utils: { report, ruleMessages },
} = stylelint

const name = 'tona/one-utility-class-per-line'

const messages = ruleMessages(name, {
  className: (classNames) =>
    `Each line should contain only one Tailwind utility class; "${classNames}"`,
  spacing: (classNames) =>
    `Each utility class used with @apply should be indented by 2 spaces on a new line; ${classNames}`,
})

const meta = {
  url: 'https://github.com/guangzan/tona/blob/main/packages/stylelint-one-utility-class-per-line/README.md',
  fixable: true,
}

/** Minimum indent (spaces) for continuation lines in @apply. */
const MIN_CONTINUATION_INDENT = 2

/**
 * @param {string} params - @apply params string
 * @returns {{ indent: number, classes: string[] }[]} - Per-line indent and class names
 */
function parseApplyLines(params) {
  const lines = params.split(/\r?\n/)
  return lines.map((line) => {
    const leading = line.match(/^\s*/)?.[0] ?? ''
    const content = line.trim()
    const classes = content ? content.split(/\s+/).filter(Boolean) : []
    return { indent: leading.length, classes }
  })
}

/** @type {import('stylelint').Rule} */
function rule() {
  return (root, result) => {
    root.walkAtRules('apply', (atRule) => {
      if (!atRule.params.includes(' ')) {
        return
      }

      const parsed = parseApplyLines(atRule.params)
      const hasMultipleLines = parsed.length > 1
      const multipleClassesOnLine = parsed.some((p) => p.classes.length > 1)

      if (multipleClassesOnLine) {
        return report({
          ruleName: name,
          result,
          message: messages.className(atRule.params),
          node: atRule,
          fix: indentClassNames(atRule),
        })
      }

      const continuationIndentTooSmall =
        hasMultipleLines &&
        parsed.some(
          (p, i) =>
            i > 0 &&
            p.classes.length > 0 &&
            p.indent < MIN_CONTINUATION_INDENT
        )

      if (continuationIndentTooSmall) {
        return report({
          ruleName: name,
          result,
          message: messages.spacing(JSON.stringify(atRule.params)),
          node: atRule,
          fix: indentClassNames(atRule),
        })
      }
    })
  }
}

rule.ruleName = name
rule.messages = messages
rule.meta = meta

export default createPlugin(name, rule)
