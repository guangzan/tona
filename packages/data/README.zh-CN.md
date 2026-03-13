# tona-themes

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  Tona 主题注册数据 - 发现和分享博客园主题。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-themes"><img src="https://img.shields.io/npm/v/tona-themes?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-themes?style=flat-square" alt="license"></a>
</p>

[English](./README.md) | **中文**

## 特性

- **主题注册表** - Tona 主题的集中列表
- **社区主题** - 发现社区创建的主题
- **CDN 链接** - 主题文件的直接链接
- **JSON 导出** - 机器可读的主题数据

## 可用主题

| 主题 | 描述 | 预览 |
|-------|-------------|---------|
| `geek` | 现代极简主题 | [预览](https://www.cnblogs.com/guangzan) |
| `reacg` | 动漫风格主题 | [预览](https://www.cnblogs.com) |
| `shadcn` | 现代 shadcn/ui 风格 | [预览](https://www.cnblogs.com) |

## 使用

### 按名称加载主题

```html
<script src="https://blog-static.cnblogs.com/files/guangzan/loader.min.js"></script>
<script>
  const opts = {
    theme: {
      name: "geek",  // 注册表中的主题名称
    },
  };
  $.tona(opts);
</script>
```

### 主题数据结构

```typescript
interface Theme {
  name: string
  description: string
  author: string
  url: string
  tags: string[]
}
```

## 贡献

想将您的主题添加到注册表？

1. Fork 此仓库
2. 将您的主题添加到 `src/themes.ts`
3. 提交 Pull Request

```typescript
// src/themes.ts
export const themes = [
  // ... 现有主题
  {
    name: 'my-theme',
    description: 'My awesome theme',
    author: 'your-name',
    url: 'https://your-cdn-link.com/theme.js',
    tags: ['minimal', 'dark']
  }
]
```

## 构建

```bash
# 生成 themes.json
npm run build

# 开发模式
npm run dev
```

## 输出

构建过程生成 `dist/themes.json`：

```json
{
  "themes": [
    {
      "name": "geek",
      "description": "Modern minimalist theme",
      "author": "guangzan",
      "url": "...",
      "tags": ["minimal", "responsive"]
    }
  ]
}
```

## 相关

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - 核心框架
- [tona-loader](https://github.com/guangzan/tona/tree/main/packages/loader) - 主题加载器
- [create-tona](https://github.com/guangzan/tona/tree/main/packages/create-tona) - 创建您自己的主题
