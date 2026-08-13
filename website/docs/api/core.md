# 核心 API（tona）

核心运行时由 `packages/core`（npm 包名 `tona`）提供，导出 `createTheme` 与 `defineOptions` 两个 API 及其全部类型。

```ts
import { createTheme, defineOptions } from 'tona'
```

## createTheme

创建主题实例。

```ts
function createTheme(options?: CreateThemeConfig): Theme
```

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `options` | `CreateThemeConfig`（可选） | 当前仅 `log: boolean`，控制日志输出 |

返回 `Theme` 主题实例。

## Theme

```ts
interface Theme {
  version: string            // 当前为 '3.0'
  _context: ThemeContext
  config: ThemeConfig
  use: (plugin: Plugin, ...options: any[]) => this
}
```

### theme.use(plugin, ...options)

安装插件，返回主题实例本身（可链式调用）。

- 重复安装同一插件会被忽略，并在开发模式下警告；
- 插件为函数时以 `(theme, ...options)` 调用，为 `{ install }` 对象时调用其 `install`；
- 非法插件参数会被忽略，并在开发模式下警告。

### theme.config

只读 getter，返回 `ThemeConfig`（`{ globalProperties: Record<string, any> }`）。直接赋值无效并（开发模式下）警告。

## ThemeContext / ThemeConfig

```ts
interface ThemeContext {
  theme: Theme
  config: ThemeConfig
}

interface ThemeConfig {
  globalProperties: Record<string, any>
}
```

## Plugin

```ts
type PluginInstallFunction = (theme: Theme, ...options: any[]) => any

type Plugin =
  | (PluginInstallFunction & { install?: PluginInstallFunction })
  | {
      install: PluginInstallFunction
    }
```

## CreateThemeConfig

```ts
interface CreateThemeConfig {
  log: boolean
}
```

## defineOptions

创建类型安全的配置获取器。

```ts
function defineOptions<F extends object, D extends object, U extends object>(
  userOptionName: string | Array<string>,
  defaultOptions: F,
): (devOptions?: D) => F & U & D
```

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `userOptionName` | `string \| string[]` | 用户配置在 `window.opts` 中的键名；数组时按顺序取第一个存在的键 |
| `defaultOptions` | `F` | 默认配置对象 |

**返回**：配置获取器 `(devOptions?: D) => F & U & D`。

合并优先级：`window.opts[key]`（用户）> `defaultOptions`（默认）> `devOptions`（开发）。

```ts
const getOptions = defineOptions('myPlugin', { enable: false, color: '#000' })

const options = getOptions()                      // 读取 window.opts.myPlugin
const options2 = getOptions({ color: '#fff' })    // 开发配置覆盖
```

## 初始化行为

`createTheme()` 内部执行 `init()`：

- 开发模式下将 `window.opts` 初始化为 `{}`；
- 淡出隐藏页面上的 `#loading, .loading` 元素（300ms）。

## 类型导出一览

`tona` 的类型定义（`packages/core/src`）：

- `Theme`、`ThemeContext`、`ThemeConfig`
- `Plugin`、`PluginInstallFunction`
- `CreateThemeConfig`

> 说明：`tona-plugins` 从 `tona` 直接引用 `Theme` 类型（`import type { Theme } from 'tona'`），因此插件开发时无需额外安装类型包。
