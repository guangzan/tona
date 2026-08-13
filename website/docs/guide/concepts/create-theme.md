# createTheme：创建主题实例

`createTheme` 是 Tona 核心运行时（`tona` 包）的入口。它创建一个主题实例，主题实例承载配置上下文，并负责安装插件。

## 基本用法

```ts
import { createTheme } from 'tona'

const theme = createTheme()
```

主题实例（`Theme`）的结构：

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `version` | `string` | 主题 API 版本（当前为 `'3.0'`） |
| `_context` | `ThemeContext` | 内部上下文，包含 `theme` 与 `config` 的引用 |
| `config` | `ThemeConfig` | 配置对象（`{ globalProperties: Record<string, any> }`），只读获取 |
| `use` | `(plugin, ...options) => this` | 安装插件，返回主题实例本身，支持链式调用 |

## 安装插件

```ts
const theme = createTheme()

theme.use(background)
theme.use(darkMode, { enable: true })
theme.use(codeHighlight, { dark: 'github' })
```

`theme.use()` 的行为细节（与源码实现一致）：

- **重复安装保护**：同一插件重复 `use` 会被忽略，并在开发模式下打印警告 `Plugin has already been applied to target theme.`；
- **两种插件形态**：函数（`(theme, ...options) => void`）或带 `install` 方法的对象，二者都会被调用；
- **非法插件**：既不是函数也没有 `install` 方法的参数会被忽略，并在开发模式下警告；
- **链式调用**：`use` 返回主题实例，可以连续调用。

## 配置上下文

每个主题实例持有独立的配置上下文：

```ts
interface ThemeContext {
  theme: Theme
  config: ThemeConfig
}

interface ThemeConfig {
  globalProperties: Record<string, any>
}
```

`theme.config` 是一个只读 getter：直接赋值会被拒绝，并在开发模式下警告 `theme.config cannot be replaced. Modify individual options instead.`（应通过 `defineOptions` 管理配置，详见[下一节](/guide/concepts/define-options)）。

## 初始化行为

调用 `createTheme()` 时，核心运行时会执行 `init()`：

- 在开发模式下将 `window.opts` 初始化为空对象（供 `defineOptions` 读取用户配置）；
- 隐藏页面上的 `#loading, .loading` 加载指示元素（淡出 300ms）。

## 完整类型

```ts
export interface Theme {
  version: string
  _context: ThemeContext
  config: ThemeConfig
  use: (plugin: Plugin, ...options: any[]) => this
}

export interface CreateThemeConfig {
  log: boolean
}

export type PluginInstallFunction = (theme: Theme, ...options: any[]) => any

export type Plugin =
  | (PluginInstallFunction & { install?: PluginInstallFunction })
  | { install: PluginInstallFunction }
```

`createTheme` 接受可选的 `CreateThemeConfig`（当前仅 `log: boolean`，控制日志输出），默认无参数调用即可。

## 下一步

- 了解 [`defineOptions` 如何管理配置](/guide/concepts/define-options)
- 了解[插件系统](/guide/concepts/plugin-system)的完整机制
- 查看 [API 参考](/api/core) 中的完整类型定义
