# tona-hooks

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  用于博客园主题开发的 React Hooks 集合。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-hooks"><img src="https://img.shields.io/npm/v/tona-hooks?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-hooks?style=flat-square" alt="license"></a>
  <a href="https://preactjs.com"><img src="https://img.shields.io/badge/Preact->=10.0.0-673AB8?style=flat-square&logo=preact" alt="Preact"></a>
</p>

[English](./README.md) | **中文**

## 特性

- **Preact 兼容** - 为 Preact 构建，兼容 React
- **博客园优化** - 专为博客园环境设计的 Hooks
- **TypeScript 支持** - 包含完整的类型定义
- **轻量级** - 可摇树优化，占用空间小

## 安装

```bash
npm install tona-hooks
```

```bash
pnpm add tona-hooks
```

```bash
yarn add tona-hooks
```

## 使用

```typescript
import { useQueryDOM, useLocalStorage, useScroll } from 'tona-hooks'
```

## 可用的 Hooks

### `useAjaxComplete`

监听 AJAX 请求完成。

```typescript
import { useAjaxComplete } from 'tona-hooks'

useAjaxComplete((event, xhr, settings) => {
  console.log('AJAX completed:', settings.url)
})
```

### `useEffectOnce`

仅在挂载时运行一次 effect。

```typescript
import { useEffectOnce } from 'tona-hooks'

useEffectOnce(() => {
  console.log('Component mounted')
})
```

### `useEventCallback`

创建稳定的回调引用。

```typescript
import { useEventCallback } from 'tona-hooks'

const handleClick = useEventCallback(() => {
  console.log('Clicked!')
})
```

### `useIsomorphicLayoutEffect`

适用于 SSR 和浏览器的安全 layout effect。

```typescript
import { useIsomorphicLayoutEffect } from 'tona-hooks'

useIsomorphicLayoutEffect(() => {
  // DOM 测量
}, [])
```

### `useLocalStorage`

将状态持久化到 localStorage。

```typescript
import { useLocalStorage } from 'tona-hooks'

const [value, setValue] = useLocalStorage('key', 'defaultValue')
```

### `useQueryDOM`

查询和观察 DOM 元素。

```typescript
import { useQueryDOM } from 'tona-hooks'

const element = useQueryDOM('#my-element')
```

### `useRafState`

与 requestAnimationFrame 同步的状态更新。

```typescript
import { useRafState } from 'tona-hooks'

const [position, setPosition] = useRafState({ x: 0, y: 0 })
```

### `useScroll`

跟踪元素的滚动位置。

```typescript
import { useScroll } from 'tona-hooks'

const [x, y] = useScroll(ref)
```

### `useUnmount`

在组件卸载时运行清理。

```typescript
import { useUnmount } from 'tona-hooks'

useUnmount(() => {
  console.log('Component unmounted')
})
```

### `useWindowScroll`

跟踪窗口滚动位置。

```typescript
import { useWindowScroll } from 'tona-hooks'

const [x, y] = useWindowScroll()
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
