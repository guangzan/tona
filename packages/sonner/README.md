# tona-sonner

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  Preact toast notification component inspired by sonner.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-sonner"><img src="https://img.shields.io/npm/v/tona-sonner?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-sonner?style=flat-square" alt="license"></a>
  <a href="https://preactjs.com"><img src="https://img.shields.io/badge/Preact->=10.0.0-673AB8?style=flat-square&logo=preact" alt="Preact"></a>
</p>

**English** | [中文](./README.zh-CN.md)

## Features

- **Beautiful Design** - Clean and modern toast notifications
- **Multiple Types** - Success, error, warning, info toasts
- **Customizable** - Highly configurable appearance and behavior
- **Dark Mode** - Built-in dark theme support
- **Animations** - Smooth enter/exit animations
- **TypeScript** - Full type definitions included

## Installation

```bash
npm install tona-sonner
```

```bash
pnpm add tona-sonner
```

```bash
yarn add tona-sonner
```

## Usage

```tsx
import { Toaster, toast } from 'tona-sonner'

function App() {
  return (
    <div>
      <button onClick={() => toast.success('Hello World!')}>Show Toast</button>
      <Toaster />
    </div>
  )
}
```

## Toast Types

```tsx
// Different toast types
toast.success('Success!')
toast.error('Error!')
toast.warning('Warning!')
toast.info('Info!')
toast.default('Default message')
```

## Toast with Options

```tsx
// With description
toast.success('Success!', {
  description: 'Your action was completed successfully.',
})

// With action
toast.error('Error occurred', {
  description: 'Something went wrong',
  action: {
    label: 'Retry',
    onClick: () => console.log('Retrying...'),
  },
})

// Custom duration
toast.info('This will close in 5 seconds', {
  duration: 5000,
})
```

## Toaster Component

```tsx
<Toaster
  position="bottom-right" // Toast position
  gap={14} // Gap between toasts
  visibleToasts={3} // Max visible toasts
/>
```

### Default Configuration

- Position: `bottom-right`
- Gap: `14px`
- Visible toasts: `3`
- Duration: `3000ms`
- Close button: Always visible
- Stacked by default, expands on hover

## Dismissing Toasts

```tsx
const toastId = toast.success('Hello!')

// Dismiss specific toast
toast.dismiss(toastId)

// Dismiss all toasts
toast.dismiss()
```

## Auto-mounting

The Toaster automatically mounts to document body when imported. You can also manually mount it:

```tsx
import { mountToaster } from 'tona-sonner'

// Mount to document body
mountToaster()

// Mount to custom container
const container = document.getElementById('toast-container')
mountToaster(container)
```

## Styling

Import the CSS file:

```tsx
import 'tona-sonner/dist/index.css'
```

Or customize with CSS variables:

```css
:root {
  --toast-background: #fff;
  --toast-border: 1px solid #e5e5e5;
  --toast-border-radius: 8px;
}
```

## Peer Dependencies

```json
{
  "preact": ">=10.0.0"
}
```

## Related

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - Core framework
- [tona-ui](https://github.com/guangzan/tona/tree/main/packages/ui) - UI components
- [sonner](https://sonner.emilkowal.ski/) - Original React version
