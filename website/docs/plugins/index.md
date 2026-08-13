# 插件目录

`tona-plugins`（`packages/plugins`）提供 31 个开箱即用的插件。除 `toast`、`postMessage` 两个独立工具函数外，其余均可通过 `theme.use()` 安装：

```ts
import { createTheme } from 'tona'
import { background, darkMode, codeHighlight } from 'tona-plugins'

const theme = createTheme()
theme.use(background)
theme.use(darkMode)
theme.use(codeHighlight)
```

## 分类总览

| 分类 | 插件 |
| --- | --- |
| [外观](#外观) | `background`、`darkMode`、`colorMode`、`footer`、`postBottomImage`、`postTopImage` |
| [代码](#代码) | `codeHighlight`、`codeCopy`、`codeLinenumbers`、`codeLang`、`codeTrafficLight` |
| [交互](#交互) | `catalog`、`barrage`、`imagePreview`、`clickEffects`、`tools` |
| [社交与变现](#社交与变现) | `donation`、`qrcode`、`signature`、`commentsAvatars`、`notice`、`postMessage` |
| [娱乐](#娱乐) | `live2d`、`musicPlayer`、`emoji`、`charts` |
| [工具](#工具) | `lock`、`toast`、`webTag`、`license`、`notation` |

> 所有选项均为可选（`enable?: boolean` 等），未配置时使用 `tona-options` 中的默认值。

---

## 外观

### background

自定义页面背景图片或颜色。

```ts
theme.use(background, { enable: true, value: '#f5f5f5' })
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `value` | `string` | 背景色或背景图片 URL |
| `opacity` | `number` | 背景透明度 |
| `repeat` | `boolean` | 背景是否可重复平铺 |
| `opacitySelector`（插件侧） | `string` | 背景透明度作用的选择器 |

### darkMode

深色模式切换，支持**深色 / 浅色 / 跟随系统**三态循环（`dark → light → system`），选择持久化到 `localStorage.modeType`。跟随系统时监听 OS `prefers-color-scheme` 变化实时切换，并同步切换代码块高亮主题。

```ts
theme.use(darkMode, {
  enable: true,
  darkDefault: false,
  followSystem: true,
  iconType: 'className', // 'className' | 'html'
  icons: { dark: 'fa-moon', light: 'fa-sun', system: 'fa-adjust' },
  tooltips: { dark: '深色', light: '浅色', system: '跟随系统' },
})
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `darkDefault` | `boolean` | 无本地偏好时默认深色 |
| `followSystem` | `boolean` | 默认跟随系统明暗 |
| `icons` | `Partial<Record<'dark' \| 'light' \| 'system', string>>` | 三态图标映射 |
| `tooltips` | `Partial<Record<'dark' \| 'light' \| 'system', string>>` | 三态 tooltip 映射 |
| `iconType` | `'html' \| 'className'` | 图标渲染方式 |

### colorMode

主题色切换。

```ts
theme.use(colorMode, { name: '我的皮肤', color: '#4f9cf9', avatar: '', headerBackground: '' })
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `name` | `string` | 主题名称 |
| `color` | `string` | 主题色 |
| `avatar` | `string` | 头像 |
| `headerBackground` | `string` | 页头背景 |

### footer

自定义页脚链接。

```ts
theme.use(footer, { enable: true, value: [{ name: '关于我', link: '/about' }] })
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `value` | `Array<{ name: string; link: string }>` | 页脚链接列表 |

### postTopImage

博文顶部图片。

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `fixed` | `boolean` | 是否固定 |
| `imgs` | `string[]` | 图片列表 |

### postBottomImage

博文底部图片。

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `img` | `string` | 图片 URL |
| `height` | `string` | 图片高度（如 `'200px'`） |

---

## 代码

### codeHighlight

代码块语法高亮，深色 / 浅色主题可分别设置，并跟随暗色模式切换。

```ts
theme.use(codeHighlight, { dark: 'atomOneDark', light: 'github' })
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `dark` | `'atomOneDark' \| 'atomOneLight' \| 'github'` | 深色模式下的高亮主题 |
| `light` | `'atomOneDark' \| 'atomOneLight' \| 'github'` | 浅色模式下的高亮主题 |

### codeCopy

为代码块添加一键复制按钮。仅 `enable` 一个选项。

### codeLinenumbers

为代码块显示行号。仅 `enable` 一个选项。

### codeLang

在代码块上显示语言标识。仅 `enable` 一个选项。

### codeTrafficLight

代码块窗口样式（macOS 红绿灯）。仅 `enable` 一个选项。

---

## 交互

### catalog

自动生成文章目录（适配博客园所有编辑器）。

```ts
theme.use(catalog, { enable: true, position: 'left' }, {
  mountedNode: '#cnblogs_post_body',
  fn: 'after', // 'after' | 'append' | 'before' | 'prepend'
  scrollContainer: '#main',
  updateNavigation: true,
  showTitle: true,
  showScrollbar: false,
})
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `position` | `'left' \| 'right'` | 目录位置 |
| `mountedNode`（插件侧） | `string` | 挂载节点选择器 |
| `fn`（插件侧） | `'after' \| 'append' \| 'before' \| 'prepend'` | 插入方式 |
| `scrollContainer`（插件侧） | `string` | 滚动容器选择器 |
| `updateNavigation`（插件侧） | `boolean` | 是否更新导航 |
| `showTitle` / `showScrollbar`（插件侧） | `boolean` | 显示标题 / 滚动条 |

### barrage

弹幕评论。

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `opacity` | `number` | 透明度 |
| `fontSize` | `string` | 字号 |
| `colors` | `string[]` | 颜色列表 |
| `barrages` / `indexBarrages` / `postPageBarrages` | `string[]` | 通用 / 首页 / 文章页弹幕列表 |

### imagePreview

图片灯箱预览。仅 `enable` 一个选项。

### clickEffects

点击页面时的粒子特效。

```ts
theme.use(clickEffects, { enable: true, colors: ['#ff6b81', '#7bed9f'], size: 12, maxCount: 50 })
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `colors` | `string[]` | 粒子颜色列表 |
| `size` | `number` | 粒子大小 |
| `maxCount` | `number` | 最大粒子数 |

### tools

侧边工具栏，支持点赞、评论、收藏、关注、回顶等按钮，按钮通过[按钮工厂](/guide/concepts/plugin-system#工具栏按钮工厂)创建。

```ts
import { tools, createBackTopButton, createLikeButton, createCommentButton } from 'tona-plugins'

theme.use(tools, { enable: true, initialOpen: false, mobileAutoClose: true }, {
  scrollContainer: '#main',
  toolbarItems: [
    createBackTopButton(),
    createLikeButton({ tooltip: '点赞' }),
    createCommentButton({ tooltip: '评论' }),
  ],
})
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `initialOpen` | `boolean` | 初始是否展开 |
| `mobileAutoClose` | `boolean` | 移动端自动收起 |
| `scrollContainer`（插件侧） | `string` | 滚动容器（按钮滚动行为使用） |
| `menuIconType` / `menuIcon` / `menuActiveIcon`（插件侧） | `IconType` / `string` | 菜单图标配置 |
| `toolbarItems`（插件侧） | `ToolbarItem[]` | 按钮列表（工厂产物） |

---

## 社交与变现

### donation

打赏按钮。`enable`、`qrcodes: string[]`（收款码图片列表）。

### qrcode

二维码。`enable`、`img: string`、`desc: string`。

### signature

博文末尾打字机签名。

```ts
theme.use(signature, { enable: true, contents: ['—— 本文结束 ——'] }, { selector: '#cnblogs_post_body' })
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `contents` | `string[]` | 签名内容列表 |
| `selector`（插件侧） | `string` | 签名挂载选择器 |

### commentsAvatars

评论列表头像（按昵称首字渲染彩色头像）。无配置项。

### notice

公告通知。`enable`、`contents: string[]`。

### postMessage

文章信息（发布时间、阅读数、评论数、推荐数）增强展示。**独立工具函数**，直接调用 `postMessage()`，无需 `theme.use`。

---

## 娱乐

### live2d

Live2D 看板娘。

```ts
theme.use(live2d, {
  enable: true,
  page: 'all',          // 'all' | 'post' | 'index'
  agent: 'pc',          // 'pc' | 'phone' | 'all'
  model: '',
  width: 200,
  height: 300,
  position: 'right',    // 'left' | 'right'
  gap: '0px',
  mute: false,
})
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `page` | `'all' \| 'post' \| 'index'` | 生效页面 |
| `agent` | `'pc' \| 'phone' \| 'all'` | 生效设备 |
| `model` | `string` | 模型（内置模型列表见 `live2d-models.ts`） |
| `width` / `height` | `number` | 尺寸 |
| `position` | `'left' \| 'right'` | 位置 |
| `gap` | `string` | 距边缘间距 |
| `mute` | `boolean` | 交互时静音 |

### musicPlayer

音乐播放器。

```ts
theme.use(musicPlayer, {
  enable: true,
  page: 'all',
  agent: 'desktop', // 'desktop' | 'pad' | 'phone'
  autoplay: false,
  volume: 0.8,
  lrc: { enable: true, type: 1, color: '#fff' },
  audio: [
    { name: '曲名', artist: '歌手', url: '...', cover: '...', lrc: '...' },
  ],
})
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `page` | `'all' \| 'post' \| 'index'` | 生效页面 |
| `agent` | `'desktop' \| 'pad' \| 'phone'` | 生效设备 |
| `autoplay` | `boolean` | 自动播放 |
| `volume` | `number` | 音量 |
| `lrc` | `Lrc` | 歌词配置（`{ enable; type: 1 \| 3; color }`） |
| `audio` | `AudioItem[]` | 音频列表（`{ name; artist; url; cover; lrc }`） |

### emoji

评论表情选择器，支持自定义文字、系统、网络图片表情。

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `buttonIcon` | `string` | 按钮图标 |
| `emojiList` | `string[]` | 表情列表 |

### charts

数据可视化图表。`enable`、`labels: string[]`、`datasets: Array<Record<string, unknown>>`，插件侧可指定 `mountedNode`。

---

## 工具

### lock

锁屏。`enable`、`background: string`、`strings: string[]`。

### toast

**独立工具函数**（基于 notyf），无需 `theme.use`：

```ts
import { toast } from 'tona-plugins'

toast('保存成功', 'success')   // 'success' | 'info' | 'warning' | 'error'
toast('请求失败', 'error', 3000) // 可指定时长（ms）
```

### webTag

自定义网站图标与标题。`enable`、`title: string`、`favicon: string`。

### license

文末版权声明。`enable`、`license: boolean`、`licenseName: string`、`licenseLink: string`、`contents: string[]`。

### notation

笔注（文字标注）。

```ts
theme.use(notation, { enable: true }, customList)
```

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `enable` | `boolean` | 是否启用 |
| `customList`（第三参数） | `NotationItem[]` | 自定义标注列表（默认内置 `annotateList`），仅文章页生效 |

---

## 下一步

- [编写自定义插件](/plugins/custom-plugin)
- [核心概念：插件系统](/guide/concepts/plugin-system)
- [选项类型（tona-options）](/api/options)
