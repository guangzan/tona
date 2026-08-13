# 配置

Tona 的配置体系分为三层，配合 `defineOptions` 与 `tona-options` 使用：

1. **默认配置** —— 插件代码中通过 `defineOptions` 声明的默认值；
2. **开发配置（devOptions）** —— `theme.use(plugin, devOptions)` 的第二个及后续参数，供主题作者在安装插件时覆盖默认值；
3. **用户配置** —— 皮肤使用者注入的 `window.opts`，优先级最高。

## 配置分层示意

```
window.opts（用户配置，优先级最高）
   └── theme.use(plugin, devOptions)（开发配置）
          └── defineOptions(key, defaults)（默认配置）
```

```ts
import { createTheme } from 'tona'
import { background } from 'tona-plugins'

const theme = createTheme()

theme.use(
  background,
  {
    // 开发配置：安装插件时覆盖默认值
    enable: true,
    value: '#ffb3cc',
    opacity: 0.85,
  },
  {
    // 插件专属选项（第三个参数）
    opacitySelector: '#main',
  },
)
```

## 用户配置（window.opts）

皮肤使用者在博客园后台的「页脚 HTML 代码」中，于主题脚本**之前**注入配置：

```html
<script>
  window.opts = {
    // 键名与插件 defineOptions 声明的 userOptionName 一致
    bodyBackground: { enable: true, value: 'https://example.com/bg.jpg', opacity: 0.6 },
    darkMode: { enable: true, darkDefault: false, followSystem: true },
    musicPlayer: {
      enable: true,
      autoplay: false,
      audio: [
        { name: '曲名', artist: '歌手', url: '...', cover: '...', lrc: '...' },
      ],
    },
  }
</script>
<script src="./theme.min.js"></script>
```

`defineOptions` 支持传入**键名数组**读取用户配置（按顺序取第一个存在的键），便于兼容历史配置名。

## tona-options：预定义配置

`tona-options` 包为每个常用功能提供了**预定义的配置获取器**，插件直接引用它们，保证配置键名全局一致：

```ts
import { getDarkModeOptions, getMusicPlayerOptions } from 'tona-options'

const darkMode = getDarkModeOptions()       // 读取 window.opts.darkMode
const musicPlayer = getMusicPlayerOptions() // 读取 window.opts.musicPlayer
```

每个获取器接受可选的局部覆盖参数（`getter(partial)`），返回合并后的完整配置（`Partial<T> => T`）。

可用获取器覆盖：主题基本配置（`getThemeOptions`）、背景、弹幕、目录、图表、点击特效、代码复制、代码高亮、代码语言、代码行号、捐赠、表情、自定义链接、图片查看、Live2D、锁屏、深色模式、音乐播放器、笔注、公告、文末图、版权、题图、二维码、个性签名、工具栏、GitHub、Gitee、列表图、站点标签、代码红绿灯、关于我、图标分组。

完整类型列表见 [API 参考：选项类型](/api/options)。

## 主题侧配置与插件侧配置

部分插件（如 `catalog`、`signature`、`tools`）接受**第三个参数**作为插件侧配置（`PluginOptions`），用于声明插入位置、选择器等主题侧细节：

```ts
theme.use(catalog, { enable: true }, {
  mountedNode: '#cnblogs_post_body',
  fn: 'after',          // 'after' | 'append' | 'before' | 'prepend'
  scrollContainer: '#main',
  updateNavigation: true,
  showTitle: true,
  showScrollbar: false,
})

theme.use(tools, { enable: true, initialOpen: false }, {
  scrollContainer: '#main',
  toolbarItems: [...],
})
```

## 配置校验与类型安全

`tona-plugins` 的选项类型与 `tona-options` 同源：**选项形状一致，仅缺省为可选**（devOptions 本就是部分配置）。在 TypeScript 项目中，`theme.use(plugin, devOptions)` 的参数会获得完整的类型提示与校验。

## 下一步

- [API 参考：核心 API](/api/core)
- [API 参考：选项类型](/api/options)
- [插件目录](/plugins/)
