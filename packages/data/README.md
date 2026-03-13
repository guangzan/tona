# tona-themes

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  Theme registry data for Tona - Discover and share CNBlogs themes.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-themes"><img src="https://img.shields.io/npm/v/tona-themes?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-themes?style=flat-square" alt="license"></a>
</p>

**English** | [中文](./README.zh-CN.md)

## Features

- **Theme Registry** - Centralized list of Tona themes
- **Community Themes** - Discover themes created by the community
- **CDN Links** - Direct links to theme files
- **JSON Export** - Machine-readable theme data

## Available Themes

| Theme | Description | Preview |
|-------|-------------|---------|
| `geek` | Modern minimalist theme | [Preview](https://www.cnblogs.com/guangzan) |
| `reacg` | Anime-style theme | [Preview](https://www.cnblogs.com) |
| `shadcn` | Modern shadcn/ui inspired | [Preview](https://www.cnblogs.com) |

## Usage

### Load Theme by Name

```html
<script src="https://blog-static.cnblogs.com/files/guangzan/loader.min.js"></script>
<script>
  const opts = {
    theme: {
      name: "geek",  // Theme name from registry
    },
  };
  $.tona(opts);
</script>
```

### Theme Data Structure

```typescript
interface Theme {
  name: string
  description: string
  author: string
  url: string
  tags: string[]
}
```

## Contributing

Want to add your theme to the registry?

1. Fork this repository
2. Add your theme to `src/themes.ts`
3. Submit a Pull Request

```typescript
// src/themes.ts
export const themes = [
  // ... existing themes
  {
    name: 'my-theme',
    description: 'My awesome theme',
    author: 'your-name',
    url: 'https://your-cdn-link.com/theme.js',
    tags: ['minimal', 'dark']
  }
]
```

## Build

```bash
# Generate themes.json
npm run build

# Development mode
npm run dev
```

## Output

The build process generates `dist/themes.json`:

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

## Related

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - Core framework
- [tona-loader](https://github.com/guangzan/tona/tree/main/packages/loader) - Theme loader
- [create-tona](https://github.com/guangzan/tona/tree/main/packages/create-tona) - Create your own theme
