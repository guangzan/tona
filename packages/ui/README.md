# tona-ui

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  UI component library for Tona themes, built with Preact.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-ui"><img src="https://img.shields.io/npm/v/tona-ui?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-ui?style=flat-square" alt="license"></a>
  <a href="https://preactjs.com"><img src="https://img.shields.io/badge/Preact->=10.0.0-673AB8?style=flat-square&logo=preact" alt="Preact"></a>
</p>

**English** | [中文](./README.zh-CN.md)

## Features

- **Preact Based** - Lightweight components for Preact
- **Slot Component** - Radix UI-inspired Slot for prop forwarding
- **Utility Functions** - `cn()` for class name merging
- **TypeScript Support** - Full type definitions
- **Tree-shakeable** - Import only what you need

## Installation

```bash
npm install tona-ui
```

```bash
pnpm add tona-ui
```

```bash
yarn add tona-ui
```

## Usage

```typescript
import { Slot, cn } from 'tona-ui'
```

## Components

### Slot

The Slot component forwards props to its child element, similar to Radix UI's Slot.

```tsx
import { Slot } from 'tona-ui'

// Basic usage
<Slot className="custom-class">
  <button>Click me</button>
</Slot>
// Renders: <button class="custom-class">Click me</button>

// Event handling
<Slot onClick={() => console.log('clicked')}>
  <div>Clickable div</div>
</Slot>

// Multiple children - props forwarded to all
<Slot className="item">
  <span>Item 1</span>
  <span>Item 2</span>
</Slot>
```

### cn

Utility function for merging CSS class names.

```tsx
import { cn } from 'tona-ui'

// Basic usage
const className = cn('base-class', 'conditional-class')
// Result: "base-class conditional-class"

// With conditions
const className = cn('base-class', {
  'active-class': isActive,
  'disabled-class': isDisabled,
})
// Result when isActive=true, isDisabled=false: "base-class active-class"

// Multiple arguments
const className = cn('flex', 'items-center', isLarge && 'p-4', isSmall && 'p-2')
```

## Peer Dependencies

```json
{
  "preact": ">=10.0.0"
}
```

## Development

```bash
# Development mode
pnpm dev

# Build
pnpm build
```

## Related

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - Core framework
- [tona-hooks](https://github.com/guangzan/tona/tree/main/packages/hooks) - React hooks
- [tona-sonner](https://github.com/guangzan/tona/tree/main/packages/sonner) - Toast notifications
