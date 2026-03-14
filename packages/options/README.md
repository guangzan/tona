# tona-options

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  Pre-defined option utilities for Tona themes.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-options"><img src="https://img.shields.io/npm/v/tona-options?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-options?style=flat-square" alt="license"></a>
</p>

**English** | [中文](./README.zh-CN.md)

## Features

- **Pre-configured Options** - Common theme options ready to use
- **Type-safe** - Full TypeScript support
- **Composable** - Mix and match options as needed
- **Default Values** - Sensible defaults for all options

## Installation

```bash
npm install tona-options
```

```bash
pnpm add tona-options
```

```bash
yarn add tona-options
```

## Usage

```typescript
import { getBackgroundOptions } from 'tona-options'

// Get default options
const options = getBackgroundOptions()
console.log(options)
// {
//   enable: false,
//   value: "",
//   opacity: 0.85,
//   repeat: false,
// }
```

### With Custom Configuration

```typescript
import { getBackgroundOptions } from 'tona-options'

// Override defaults
const options = getBackgroundOptions({
  enable: true,
  value: '#f5f5f5',
})
console.log(options)
// {
//   enable: true,
//   value: "#f5f5f5",
//   opacity: 0.85,
//   repeat: false,
// }
```

## Available Options

### Background Options

```typescript
import { getBackgroundOptions } from 'tona-options'

const options = getBackgroundOptions({
  enable: true, // Enable background
  value: '#f5f5f5', // Background color or image URL
  opacity: 0.85, // Background opacity
  repeat: false, // Repeat background image
})
```

## Creating Custom Options

For creating your own options, use the core `defineOptions` API:

```typescript
import { defineOptions } from 'tona'

const getCustomOptions = defineOptions('customKey', {
  enable: false,
  color: '#000',
  size: 16,
})

// Use in your theme
const options = getCustomOptions(userConfig)
```

## Related

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - Core framework with `defineOptions`
- [tona-plugins](https://github.com/guangzan/tona/tree/main/packages/plugins) - Official plugins using these options
