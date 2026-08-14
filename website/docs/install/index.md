# 安装皮肤

本页面向**皮肤使用者**：如果你不想自己写代码，只想在博客园安装一套现成的 Tona 皮肤，从这里开始。

## 方式一：通过 awescnb 安装（推荐）

awescnb 是博客园皮肤社区，收录了 Tona 的 geek、simple、view、reacg 等主题。安装方法见 [awescnb 皮肤文档](https://www.yuque.com/r/awescnb/books)：

1. 打开 awescnb 文档，找到心仪的皮肤；
2. 按文档指引将皮肤脚本 / 样式配置到博客园后台；
3. 在配置面板中按需开启功能（暗色模式、目录、音乐播放器等）。

这种方式无需接触代码，适合大多数用户。

## 方式二：手动安装内置主题

Tona 仓库自带五套内置主题，每套主题构建后都会产出两个文件（位于 `themes/<name>/dist/`）：

| 主题 | 产物 |
| --- | --- |
| geek | `geek.min.css` + `geek.min.js` |
| simple | `simple.min.css` + `simple.min.js` |
| view | `view.min.css` + `view.min.js` |
| reacg | `reacg.min.css` + `reacg.min.js` |
| shadcn | `shadcn.min.css` + `shadcn.min.js` |

手动安装步骤：

1. 登录博客园，进入「管理后台 → 设置」；
2. 将 `xxx.min.css` 的内容粘贴到「页面定制 CSS 代码」；
3. 将 `xxx.min.js` 的内容粘贴到「页脚 HTML 代码」（或用 `<script>` 引入托管地址）；
4. 保存并刷新博客首页，皮肤即生效。

## 配置皮肤

主题的默认配置开箱即用；如需个性化，在主题脚本**之前**注入 `window.opts`：

```html
<script>
  window.opts = {
    // 背景
    bodyBackground: { enable: true, value: '#ffb3cc', opacity: 0.85 },
    // 深色模式：深色 / 浅色 / 跟随系统
    darkMode: { enable: true, followSystem: true },
    // 音乐播放器
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

可配置项与键名见 [选项类型（tona-options）](/api/options) 与 [插件目录](/plugins/)。

## 主题数据与发现

`tona-themes`（`packages/data`）包维护了各主题的注册数据（别名、CDN 脚本地址），并提供机器可读的 `themes.json`，皮肤市场类应用可基于它发现主题：

| 主题 | 别名 | 脚本地址 |
| --- | --- | --- |
| geek | `geek` | `https://blog-static.cnblogs.com/files/guangzan/geek.js` |
| reacg | `acg`、`reacg` | `https://blog-static.cnblogs.com/files/guangzan/reacg.js` |
| simple | `simple` | `https://blog-static.cnblogs.com/files/guangzan/simple.js` |
| view | `view` | `https://blog-static.cnblogs.com/files/guangzan/view.js` |
| 其他社区主题 | bili、csdn、element、silence 等 | 见 `tona-themes` 数据源 |

## 常见问题

- **皮肤不生效？** 确认 CSS / JS 均已正确粘贴，且 `window.opts` 位于主题脚本之前；
- **如何恢复默认皮肤？** 清空「页面定制 CSS 代码」与「页脚 HTML 代码」即可；
- **想深度定制？** 参见 [快速开始](/guide/quick-start) 与 [主题文档](/themes/)，Tona 的每套主题都是可构建、可修改的开源项目。

## 相关

- [主题概览](/themes/)
- [快速开始](/guide/quick-start)
- [FAQ](/faq)
