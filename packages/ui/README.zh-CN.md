# tona-ui

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  用于 Tona 主题的 UI 组件库，基于 Preact 构建。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-ui"><img src="https://img.shields.io/npm/v/tona-ui?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-ui?style=flat-square" alt="license"></a>
  <a href="https://preactjs.com"><img src="https://img.shields.io/badge/Preact->=10.0.0-673AB8?style=flat-square&logo=preact" alt="Preact"></a>
</p>

[English](./README.md) | **中文**

## 特性

- **基于 Preact** - 为 Preact 设计的轻量级组件
- **Slot 组件** - 受 Radix UI 启发的 Slot，用于属性转发
- **工具函数** - 用于合并类名的 `cn()`
- **TypeScript 支持** - 完整的类型定义
- **可摇树优化** - 只导入你需要的

## 安装

```bash
npm install tona-ui
```

```bash
pnpm add tona-ui
```

```bash
yarn add tona-ui
```

## 使用

```typescript
import { Slot, cn } from 'tona-ui'
```

## 组件

### Slot

Slot 组件将属性转发给其子元素，类似于 Radix UI 的 Slot。

```tsx
import { Slot } from 'tona-ui'

// 基础用法
<Slot className="custom-class">
  <button>点击我</button>
</Slot>
// 渲染: <button class="custom-class">点击我</button>

// 事件处理
<Slot onClick={() => console.log('clicked')}>
  <div>可点击的 div</div>
</Slot>

// 多个子元素 - 属性转发给所有子元素
<Slot className="item">
  <span>Item 1</span>
  <span>Item 2</span>
</Slot>
```

### cn

用于合并 CSS 类名的工具函数。

```tsx
import { cn } from 'tona-ui'

// 基础用法
const className = cn('base-class', 'conditional-class')
// 结果: "base-class conditional-class"

// 带条件
const className = cn('base-class', {
  'active-class': isActive,
  'disabled-class': isDisabled,
})
// 当 isActive=true, isDisabled=false 时的结果: "base-class active-class"

// 多个参数
const className = cn(
  'flex',
  'items-center',
  isLarge && 'p-4',
  isSmall && 'p-2'
)
```

## 对等依赖

```json
{
  "preact": ">=10.0.0"
}
```

## 开发

```bash
# 开发模式
pnpm dev

# 构建
pnpm build
```

## 相关

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - 核心框架
- [tona-hooks](https://github.com/guangzan/tona/tree/main/packages/hooks) - React hooks
- [tona-sonner](https://github.com/guangzan/tona/tree/main/packages/sonner) - Toast 通知
