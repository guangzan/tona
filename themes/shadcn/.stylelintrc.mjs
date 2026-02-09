// These are all the custom `@` (at) rules that we use within our custom PostCSS plugins
const CUSTOM_AT_RULES = [
  // Tailwind-specific at-rules
  'apply',
  'layer',
  'plugin',
  'responsive',
  'reference',
  'utility',
  'theme',
  'custom-variant',
  'screen',
  'source',
  'tailwind',
  'variants',
]

// Enforces certain selectors to be only in camelCase notation
// We use these for id selectors and classname selectors
// const ONLY_ALLOW_CAMEL_CASE_SELECTORS = [
//   /^(?:[a-z]+(?:[A-Z][a-z]*)*)$/,
//   { message: s => `Expected '${s}' to be in camelCase` },
// ]

export default {
  extends: ['stylelint-config-standard'],
  plugins: [
    'stylelint-order',
    'stylelint-selector-bem-pattern',
    'tona-stylelint-one-utility-class-per-line',
  ],
  ignoreFiles: ['dist/**/*'],
  rules: {
    // Enforces Element IDs to be camelCase
    // 'selector-id-pattern': ONLY_ALLOW_CAMEL_CASE_SELECTORS,
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*(-[a-z0-9]+)*|[a-z][a-zA-Z0-9]+|[A-Z][a-zA-Z0-9]+|[a-z][a-z0-9]*(_[a-z0-9]+)*)$',
      {
        message:
          'Expected class selector to be kebab-case or lowerCamelCase or UpperCamelCase or snake_case',
      },
    ],
    'selector-id-pattern': [
      '^([a-z][a-z0-9]*(-[a-z0-9]+)*|[a-z][a-zA-Z0-9]+|[A-Z][a-zA-Z0-9]+|[a-z][a-z0-9]*(_[a-z0-9]+)*)$',
      {
        message:
          'Expected id selector to be kebab-case or lowerCamelCase or UpperCamelCase or snake_case',
      },
    ],
    // Allow Tailwind-based CSS Rules
    'at-rule-no-unknown': [true, { ignoreAtRules: CUSTOM_AT_RULES }],
    // Allow the Global CSS Selector
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
    // Enforces the order of the CSS properties to be in alphabetical order
    'order/properties-alphabetical-order': true,
    'no-descending-specificity': null,
    // Disables the Level-4 Media Queries; Since they're more exotic and less known
    'media-feature-range-notation': 'prefix',
    // Adopts the import notation from `postcss-import`
    'import-notation': 'string',
    // Allow the `@apply` at rule as its part of Tailwind
    'at-rule-no-deprecated': [true, { ignoreAtRules: CUSTOM_AT_RULES }],
    'tona/one-utility-class-per-line': true,
    'hue-degree-notation': null,
    'lightness-notation': null,
    'custom-property-empty-line-before': null,
    'rule-empty-line-before': null,
    'color-function-alias-notation': null,
    'nesting-selector-no-missing-scoping-root': null,
    'comment-empty-line-before': null,
    'alpha-value-notation': null,
    'color-function-notation': null,
  },
}
