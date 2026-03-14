# tona-loader

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  博客园（CNBlogs）主题加载器 - 动态加载 Tona 主题。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-loader"><img src="https://img.shields.io/npm/v/tona-loader?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-loader?style=flat-square" alt="license"></a>
</p>

[English](./README.md) | **中文**

## 特性

- **动态主题加载** - 通过名称或 URL 加载主题
- **配置挂载** - 自动将配置挂载到 window 对象
- **CDN 支持** - 从 CDN 或自定义 URL 加载主题
- **jQuery 集成** - 使用 `$.tona()` 进行初始化
- **轻量级** - 极小的加载器脚本

## 使用

### 通过主题名称加载

```html
<script src="https://blog-static.cnblogs.com/files/guangzan/loader.min.js"></script>
<script>
  const opts = {
    theme: {
      name: 'geek',
    },
    // 其他配置
  }
  $.tona(opts)
</script>
```

### 通过主题 URL 加载

```html
<script src="https://blog-static.cnblogs.com/files/guangzan/loader.min.js"></script>
<script>
  const opts = {
    theme: {
      name: 'https://blog-static.cnblogs.com/files/guangzan/reacg.js',
    },
    // 其他配置
  }
  $.tona(opts)
</script>
```

## 配置

加载器接受一个配置对象，该对象会被挂载到 window：

```javascript
const opts = {
  theme: {
    name: 'geek', // 主题名称或 URL
  },
  // 主题特定选项
  bodyBackground: {
    enable: true,
    value: '#f5f5f5',
  },
  // ... 其他选项
}

$.tona(opts)
```

## 工作原理

1. 加载器脚本将您的配置对象挂载到 `window`
2. 然后根据 `theme.name` 加载主题 JavaScript 文件
3. 主题文件通过全局 window 对象访问配置

## 可用主题

- `geek` - 现代极简主题
- `reacg` - 动漫风格主题
- `shadcn` - 现代 shadcn/ui 风格主题

完整列表请访问 [tona-themes](https://github.com/guangzan/tona/tree/main/packages/data)。

## 安装（用于开发）

```bash
npm install tona-loader
```

```bash
pnpm add tona-loader
```

## 相关

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - 核心框架
- [tona-themes](https://github.com/guangzan/tona/tree/main/packages/data) - 主题注册表
