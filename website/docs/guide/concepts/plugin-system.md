# 插件系统

插件是 Tona 的功能单元。一个插件封装一项皮肤能力（暗色模式、代码高亮、目录……），通过 `theme.use()` 安装到主题上，可以任意组合与扩展。

## 插件形态

插件有两种合法形态（由 `Plugin` 类型定义）：

```ts
export type PluginInstallFunction = (theme: Theme, ...options: any[]) => any

export type Plugin =
  | (PluginInstallFunction & { install?: PluginInstallFunction })
  | {
      install: PluginInstallFunction
    }
```

- **函数形态**：插件本身就是一个函数，`theme.use(plugin, ...options)` 时会以 `(theme, ...options)` 调用；
- **对象形态**：插件是 `{ install(theme, ...options) }` 对象，安装时调用其 `install` 方法。

两种形态都支持在 `use` 时传入任意数量的附加参数，插件通过参数接收开发者传入的覆盖配置。

## 安装与去重

```ts
theme.use(pluginA)
theme.use(pluginB, { enable: true })  // 第二个参数是 devOptions
theme.use(pluginA)                    // 重复安装：被忽略并（开发模式下）警告
```

`theme.use()` 内部维护一个已安装插件集合：

- 已安装的插件重复 `use` 会被**忽略**，开发模式下打印警告；
- 返回值是主题实例本身，因此支持**链式调用**：`theme.use(a).use(b)`。

## 编写一个插件

结合 `defineOptions`，一个完整插件的骨架如下：

```ts
import { defineOptions } from 'tona'
import type { Theme } from 'tona'

// 1. 声明默认配置
const getMyOptions = defineOptions('myPlugin', {
  enable: false,
  color: '#000',
})

// 2. 实现插件逻辑
export function myPlugin(theme: Theme, devOptions?: { color?: string }) {
  const options = getMyOptions(devOptions)

  if (!options.enable) {
    return
  }

  document.body.style.color = options.color
}

// 3. 在主题中安装
const theme = createTheme()
theme.use(myPlugin, { color: '#ffb3cc' })
```

对象形态的写法：

```ts
export const myPlugin = {
  install(theme: Theme, options?: { color?: string }) {
    /* ... */
  },
}
```

## 内置插件

仓库 `tona-plugins`（`packages/plugins`）提供了 31 个开箱即用的插件，按功能分为：

- **外观**：`background`、`darkMode`、`colorMode`、`footer`、`postBottomImage`、`postTopImage`
- **代码**：`codeHighlight`、`codeCopy`、`codeLinenumbers`、`codeLang`、`codeTrafficLight`
- **交互**：`catalog`、`barrage`、`imagePreview`、`clickEffects`、`tools`
- **社交与变现**：`donation`、`qrcode`、`signature`、`commentsAvatars`、`notice`、`postMessage`
- **娱乐**：`live2d`、`musicPlayer`、`emoji`、`charts`
- **工具**：`lock`、`toast`、`webTag`、`license`、`notation`

完整列表、功能说明与配置项见[插件目录](/plugins/)。

## 工具栏按钮工厂

`tools` 插件配套一组**按钮工厂**（`tona-plugins` 的 `tools/buttons` 子模块），用于向工具栏添加自定义按钮：

```ts
import { createTheme } from 'tona'
import { tools, createBackTopButton, createLikeButton } from 'tona-plugins'

const theme = createTheme()

theme.use(tools, {
  toolbarItems: [
    createBackTopButton(),
    createLikeButton({ tooltip: '点赞' }),
  ],
})
```

可用工厂：`createBackTopButton`、`createCommentButton`、`createDarkModeButton`、`createFavoriteButton`、`createFollowButton`、`createLikeButton`，以及工具函数 `scrollToTop(container)`、`scrollToComment(container)`。

每个按钮工厂返回 `ToolbarItem`：

```ts
interface ToolbarItem {
  enable: boolean
  page: Page                    // 'all' | 'post' | 'index'
  icon: string
  iconType: IconType            // 'html' | 'className'
  tooltip: string
  className?: string
  setup?: (theme, pluginOptions) => void   // 渲染后初始化
  callback: (pluginOptions, event) => void // 点击行为
}
```

## 下一步

- [插件目录](/plugins/) —— 全部内置插件的配置项
- [编写自定义插件](/plugins/custom-plugin) —— 完整教程
- [API 参考](/api/core) —— `Theme` 与 `Plugin` 类型
