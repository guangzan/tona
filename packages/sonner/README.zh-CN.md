# tona-sonner

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  受 sonner 启发的 Preact Toast 通知组件。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-sonner"><img src="https://img.shields.io/npm/v/tona-sonner?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-sonner?style=flat-square" alt="license"></a>
  <a href="https://preactjs.com"><img src="https://img.shields.io/badge/Preact->=10.0.0-673AB8?style=flat-square&logo=preact" alt="Preact"></a>
</p>

[English](./README.md) | **中文**

## 特性

- **精美设计** - 简洁现代的 Toast 通知
- **多种类型** - 成功、错误、警告、信息 Toast
- **高度可定制** - 外观和行为高度可配置
- **暗黑模式** - 内置暗黑主题支持
- **动画效果** - 平滑的进入/退出动画
- **TypeScript** - 包含完整的类型定义

## 安装

```bash
npm install tona-sonner
```

```bash
pnpm add tona-sonner
```

```bash
yarn add tona-sonner
```

## 使用

```tsx
import { Toaster, toast } from 'tona-sonner'

function App() {
  return (
    <div>
      <button onClick={() => toast.success('Hello World!')}>
        Show Toast
      </button>
      <Toaster />
    </div>
  )
}
```

## Toast 类型

```tsx
// 不同的 Toast 类型
toast.success('Success!')
toast.error('Error!')
toast.warning('Warning!')
toast.info('Info!')
toast.default('Default message')
```

## 带选项的 Toast

```tsx
// 带描述
toast.success('Success!', {
  description: 'Your action was completed successfully.'
})

// 带操作
toast.error('Error occurred', {
  description: 'Something went wrong',
  action: {
    label: 'Retry',
    onClick: () => console.log('Retrying...')
  }
})

// 自定义持续时间
toast.info('This will close in 5 seconds', {
  duration: 5000
})
```

## Toaster 组件

```tsx
<Toaster
  position="bottom-right"  // Toast 位置
  gap={14}                 // Toast 之间的间距
  visibleToasts={3}        // 最大可见 Toast 数量
/>
```

### 默认配置

- 位置: `bottom-right`
- 间距: `14px`
- 可见 Toast 数: `3`
- 持续时间: `3000ms`
- 关闭按钮: 始终可见
- 默认堆叠，悬停时展开

## 关闭 Toast

```tsx
const toastId = toast.success('Hello!')

// 关闭特定 Toast
toast.dismiss(toastId)

// 关闭所有 Toast
toast.dismiss()
```

## 自动挂载

Toaster 在导入时会自动挂载到 document body。您也可以手动挂载：

```tsx
import { mountToaster } from 'tona-sonner'

// 挂载到 document body
mountToaster()

// 挂载到自定义容器
const container = document.getElementById('toast-container')
mountToaster(container)
```

## 样式

导入 CSS 文件：

```tsx
import 'tona-sonner/dist/index.css'
```

或使用 CSS 变量自定义：

```css
:root {
  --toast-background: #fff;
  --toast-border: 1px solid #e5e5e5;
  --toast-border-radius: 8px;
}
```

## 对等依赖

```json
{
  "preact": ">=10.0.0"
}
```

## 相关

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - 核心框架
- [tona-ui](https://github.com/guangzan/tona/tree/main/packages/ui) - UI 组件
- [sonner](https://sonner.emilkowal.ski/) - 原版 React 版本
