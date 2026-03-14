# tona-stylelint-one-utility-class-per-line

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  Stylelint plugin for Tona themes - Enforce one utility class per line.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-stylelint-one-utility-class-per-line"><img src="https://img.shields.io/npm/v/tona-stylelint-one-utility-class-per-line?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-stylelint-one-utility-class-per-line?style=flat-square" alt="license"></a>
  <a href="https://stylelint.io"><img src="https://img.shields.io/badge/stylelint-^15.0.0||^16.0.0-000?style=flat-square&logo=stylelint" alt="Stylelint"></a>
</p>

**English** | [中文](./README.zh-CN.md)

## Features

- **Clean Code** - Enforces one utility class per line for better readability
- **Tailwind Compatible** - Designed for Tailwind CSS and similar utility-first frameworks
- **Auto-fix Support** - Automatically formats class attributes
- **Configurable** - Customize the rule to fit your needs

## Installation

```bash
npm install -D tona-stylelint-one-utility-class-per-line
```

```bash
pnpm add -D tona-stylelint-one-utility-class-per-line
```

## Usage

Add the plugin to your Stylelint configuration:

```javascript
// .stylelintrc.mjs
export default {
  plugins: ['tona-stylelint-one-utility-class-per-line'],
  rules: {
    'tona/one-utility-class-per-line': true,
  },
}
```

## Rule Details

This rule enforces that HTML class attributes contain only one utility class per line when the line exceeds a certain length.

### Valid

```html
<!-- Short class attribute -->
<div class="flex items-center"></div>

<!-- One class per line -->
<div
  class="
    flex
    items-center
    justify-between
    p-4
  "
></div>
```

### Invalid

```html
<!-- Multiple classes on one long line -->
<div
  class="flex items-center justify-between p-4 m-4 bg-blue-500 text-white"
></div>
```

## Configuration Options

```javascript
{
  'tona/one-utility-class-per-line': [
    true,
    {
      // Maximum line length before enforcing the rule
      maxLineLength: 80,
      // Additional options
    }
  ]
}
```

## Auto-fix

The plugin supports automatic fixing:

```bash
stylelint "**/*.html" --fix
```

## Related

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - Core framework
- [Stylelint](https://stylelint.io) - CSS linter
