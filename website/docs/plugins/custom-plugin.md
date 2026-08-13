# 编写自定义插件

本页演示如何为 Tona 编写、发布与分发自己的插件。内置插件的源码位于 `packages/plugins/src/plugins/`，是最好的参考。

## 插件骨架

```ts
// my-plugin.ts
import { defineOptions } from 'tona'
import type { Theme } from 'tona'

// 1. 声明默认配置（键名即用户配置在 window.opts 中的键）
const getMyOptions = defineOptions('myPlugin', {
  enable: false,
  color: '#000',
})

// 2. 实现插件：函数形态
export function myPlugin(theme: Theme, devOptions?: MyOptions) {
  const options = getMyOptions(devOptions)

  if (!options.enable) return

  // 3. 在此实现皮肤功能（可访问 theme.config 等上下文）
  document.body.style.color = options.color
}

// 类型与 tona-options 同源：形状一致，仅缺省为可选
export interface MyOptions {
  enable?: boolean
  color?: string
}
```

## 安装与使用

```ts
import { createTheme } from 'tona'
import { myPlugin } from './my-plugin'

const theme = createTheme()
theme.use(myPlugin, { color: '#ffb3cc' })
```

## 对象形态

当插件需要更多结构（例如导出多个辅助函数）时，使用 `install` 对象形态：

```ts
export const myPlugin = {
  install(theme: Theme, devOptions?: MyOptions) {
    const options = getMyOptions(devOptions)
    if (!options.enable) return
    /* ... */
  },
}
```

## 带插件侧配置的插件

某些插件需要主题作者指定挂载节点、选择器等细节，接受**第三个参数**作为插件侧配置：

```ts
export const myPlugin = {
  install(
    theme: Theme,
    devOptions?: MyOptions,
    pluginOptions?: { selector?: string },
  ) {
    const options = getMyOptions(devOptions)
    const { selector = '#main' } = pluginOptions ?? {}
    /* ... */
  },
}

theme.use(myPlugin, { enable: true }, { selector: '#cnblogs_post_body' })
```

## 为 tools 插件贡献按钮

`tools` 插件支持通过[按钮工厂](/guide/concepts/plugin-system#工具栏按钮工厂)扩展工具栏。自定义按钮工厂返回 `ToolbarItem`：

```ts
import type { Theme } from 'tona'
import type { ToolbarButtonOptions, ToolbarItem, ToolsPluginOptions } from 'tona-plugins'

export function createShareButton(
  options: ToolbarButtonOptions = {},
): ToolbarItem {
  const { enable = true, page = 'all', icon = 'fa-share', tooltip = '分享' } = options

  return {
    enable,
    page,
    icon,
    iconType: 'className',
    tooltip,
    callback(pluginOptions: ToolsPluginOptions, event) {
      // 点击行为：滚动、跳转、弹出等
      console.log('share clicked', pluginOptions)
    },
  }
}
```

然后与内置按钮一起安装：

```ts
import { tools, createBackTopButton } from 'tona-plugins'
import { createShareButton } from './share-button'

theme.use(tools, { enable: true }, {
  toolbarItems: [createBackTopButton(), createShareButton({ tooltip: '分享' })],
})
```

## 发布插件

1. 将插件发布为 npm 包（建议命名 `tona-plugin-*`）；
2. 使用 `tona-vite` 构建分发产物；
3. 在文档中说明安装方式与配置项；
4. 欢迎将插件提交到 Tona 仓库的 [plugins 目录](https://github.com/guangzan/tona/tree/main/packages/plugins/src/plugins) 或通过 [Issue](https://github.com/guangzan/tona/issues) 推荐。

## 最佳实践

- **始终使用 `defineOptions`** 声明默认配置，保证与 `tona-options` 的键名约定一致；
- **尊重 `enable` 开关**：`enable: false` 时插件应直接返回，不做任何 DOM 操作；
- **类型与 tona-options 同源**：选项类型形状与 `tona-options` 保持一致，仅缺省为可选；
- **页面/设备感知**：需要时使用 `Page`（`'all' | 'post' | 'index'`）与设备判断，避免在无关页面执行；
- **参考内置插件**：`packages/plugins/src/plugins/` 下每个插件都是一个完整示例。
