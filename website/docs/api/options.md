# 选项类型（tona-options）

`tona-options`（`packages/options`）为每个常用功能提供**预定义配置获取器**。所有获取器签名一致：

```ts
type GenericGetFn<T> = (arg?: Partial<T>) => T
```

即：`getXxxOptions()` 读取 `window.opts.xxx` 并合并默认值，返回完整配置；传入 `Partial<T>` 时作为开发期覆盖。

```ts
import { getDarkModeOptions, getThemeOptions } from 'tona-options'

const theme = getThemeOptions()                     // 皮肤基本配置
const darkMode = getDarkModeOptions({ enable: true })
```

## 获取器清单

### 皮肤基本配置

| 获取器 | 键名 | 选项 |
| --- | --- | --- |
| `getThemeOptions` | `theme` | `name: string`、`color: string`、`avatar: string`、`headerBackground: string` |

### 外观

| 获取器 | 键名 | 选项 |
| --- | --- | --- |
| `getBackgroundOptions` | `bodyBackground` | `enable`、`value: string`、`opacity: number`、`repeat: boolean` |
| `getDarkModeOptions` | `darkMode` | `enable`、`darkDefault: boolean`、`followSystem: boolean` |
| `getLinksOptions` | `links` | `enable`、`value: Array<{ name: string; link: string }>` |
| `getPostTopImageOptions` | `postTopImage` | `enable`、`fixed: boolean`、`imgs: string[]` |
| `getPostBottomImageOptions` | `postBottomImage` | `enable`、`img: string`、`height: string` |
| `getWebsiteTagOptions` | `webTag` | `enable`、`title: string`、`favicon: string` |

### 代码

| 获取器 | 键名 | 选项 |
| --- | --- | --- |
| `getCodeHighlightOptions` | `codeHighlight` | `dark: 'atomOneDark' \| 'atomOneLight' \| 'github'`、`light: 同左` |
| `getCodeCopyOptions` | `codeCopy` | `enable: boolean` |
| `getCodeLangOptions` | `codeLang` | `enable: boolean` |
| `getCodeLinenumbersOptions` | `codeLinenumbers` | `enable: boolean` |
| `getCodeTrafficLightOptions` | `codeTrafficLight` | `enable: boolean` |

### 交互

| 获取器 | 键名 | 选项 |
| --- | --- | --- |
| `getCatalogOptions` | `catalog` | `enable`、`position: 'left' \| 'right'` |
| `getBarragesOptions` | `barrages` | `enable`、`opacity`、`fontSize`、`colors: string[]`、`barrages`、`indexBarrages`、`postPageBarrages`（均为 `string[]`） |
| `getClickEffectsOptions` | `clickEffects` | `enable`、`colors: string[]`、`size: number`、`maxCount: number` |
| `getImagePreviewOptions` | `imagePreview` | `enable: boolean` |
| `getToolsOptions` | `tools` | `initialOpen: boolean`、`mobileAutoClose: boolean` |

### 社交与变现

| 获取器 | 键名 | 选项 |
| --- | --- | --- |
| `getDonationOptions` | `donation` | `enable`、`qrcodes: string[]` |
| `getQrcodeOptions` | `qrcode` | `enable`、`img: string`、`desc: string` |
| `getSignatureOptions` | `signature` | `enable`、`contents: string[]` |
| `getNoticeOptions` | `notice` | `enable`、`contents: string[]` |
| `getEmojiOptions` | `emoji` | `enable`、`buttonIcon: string`、`emojiList: string[]` |
| `getGithubOptions` | `github` | `enable`、`color: string`、`url: string` |
| `getGiteeOptions` | `gitee` | `enable`、`color: string`、`url: string` |

### 娱乐

| 获取器 | 键名 | 选项 |
| --- | --- | --- |
| `getMusicPlayerOptions` | `musicPlayer` | `enable`、`page: 'all' \| 'post' \| 'index'`、`agent: 'desktop' \| 'pad' \| 'phone'`、`autoplay`、`volume: number`、`lrc: Lrc`、`audio: Audio[]` |
| `getLive2dOptions` | `live2d` | `enable`、`page`、`agent: 'pc' \| 'phone' \| 'all'`、`model: string`、`width`、`height`、`position: 'left' \| 'right'`、`gap: string`、`mute: boolean` |
| `getChartsOptions` | `charts` | `enable`、`labels: string[]`、`datasets: Array<object>` |

其中：

```ts
interface Lrc {
  enable: boolean
  type: 1 | 3
  color: string
}

interface Audio {
  name: string
  artist: string
  url: string
  cover: string
  lrc: string
}
```

### 其他

| 获取器 | 键名 | 选项 |
| --- | --- | --- |
| `getLicenseOptions` | `license` | `enable`、`license: boolean`、`licenseName: string`、`licenseLink: string`、`contents: string[]` |
| `getLockScreenOptions` | `lock` | `enable`、`background: string`、`strings: string[]` |
| `getNotationOptions` | `notation` | `enable: boolean` |
| `getAboutOptions` | `about` | `enable`、`bio: string`、`tags: string[]` |
| `getItemGroupsOptions` | `itemGroups` | `enable`、`groups: ItemGroup[]`（分组图标：`group: string` + `items: Array<{ title; href; lightIcon; darkIcon? }>`） |
| `getPostListImageOptions` | `postListImage` | `enable`、`images: string[]` |

## 与 tona-plugins 的类型关系

`tona-plugins` 的选项类型与 `tona-options` **形状同源**：同一功能使用相同的选项字段，仅在插件侧全部变为**可选**（`enable?: boolean`），因为插件接收的 devOptions 本就是部分配置。主题代码里同时安装插件并读取 `getXxxOptions()` 时，两侧配置保持完全一致。
