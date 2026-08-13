# defineOptions：类型安全的配置管理

`defineOptions` 是 Tona 的配置管理原语：它声明一组默认配置，生成一个「配置获取器」，该获取器按优先级合并**用户配置 → 默认配置 → 开发配置**。

## 基本用法

```ts
import { defineOptions } from 'tona'

const getBackgroundOptions = defineOptions('bodyBackground', {
  enable: false,
  value: '',
  opacity: 0.85,
  repeat: false,
})

// 在主题 / 插件中使用
const options = getBackgroundOptions()
```

## 签名

```ts
defineOptions(
  userOptionName: string | Array<string>, // 用户配置键（支持别名数组）
  defaultOptions: F,                      // 默认配置
) => (devOptions?: D) => F & U & D        // 返回配置获取器
```

- **`userOptionName`**：用户配置在 `window.opts` 中的键名。传入字符串时直接读取 `window.opts[key]`；传入数组时按顺序查找第一个存在的键（用于兼容历史配置名）；
- **`defaultOptions`**：插件的默认配置，类型为 `F`；
- **返回的获取器**：可传入可选的 `devOptions`（开发 / 插件侧覆盖），返回合并后的完整配置。

## 合并优先级

```
用户配置（window.opts[key]） > 默认配置（defaultOptions） > 开发配置（devOptions）
```

具体合并语义（与源码实现一致）：

1. `defaultOptions` 与 `devOptions` 先合并为「默认值」（`extend({}, defaults, dev)`，dev 覆盖 default）；
2. 若 `window.opts` 中存在用户配置，再整体覆盖默认值；
3. 用户配置缺失时，返回的是默认值与开发配置的合并结果。

这保证了：**主题作者**在代码中提供合理默认值，**皮肤使用者**通过 `window.opts` 覆盖，而**插件作者**可以在安装时用第三参数注入开发期覆盖。

## 在插件中使用

```ts
import { createTheme, defineOptions } from 'tona'

const getMyOptions = defineOptions('myPlugin', {
  enable: false,
  color: '#000',
})

function myPlugin(theme, devOptions, pluginOptions) {
  const options = getMyOptions(devOptions)

  if (!options.enable) return

  document.body.style.color = options.color
}

const theme = createTheme()
theme.use(myPlugin, { enable: true, color: '#ffb3cc' })
```

## 别名键示例

```ts
// 旧版本使用 "darkmode"，新版本使用 "darkMode"：
// 两个键中任意一个存在都会被读取（前者优先）
const getDarkModeOptions = defineOptions(['darkmode', 'darkMode'], {
  enable: false,
  darkDefault: false,
  followSystem: false,
})
```

## 用户侧配置

博客园用户在使用皮肤时，在主题脚本之前注入 `window.opts` 即可覆盖任意插件的默认配置：

```html
<script>
  window.opts = {
    bodyBackground: { enable: true, value: '#ffb3cc', opacity: 0.85 },
    darkMode: { enable: true, followSystem: true },
  }
</script>
<script src="./theme.min.js"></script>
```

## 下一步

- 了解[插件系统](/guide/concepts/plugin-system)如何与 `defineOptions` 协作
- 查看[配置](/guide/concepts/configuration)的完整分层说明
- [API 参考](/api/core)中的 `defineOptions` 类型定义
