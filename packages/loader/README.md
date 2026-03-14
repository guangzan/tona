# tona-loader

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  Theme loader for CNBlogs (博客园) - Load Tona themes dynamically.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-loader"><img src="https://img.shields.io/npm/v/tona-loader?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-loader?style=flat-square" alt="license"></a>
</p>

**English** | [中文](./README.zh-CN.md)

## Features

- **Dynamic Theme Loading** - Load themes by name or URL
- **Configuration Mounting** - Automatically mounts config to window object
- **CDN Support** - Load themes from CDN or custom URLs
- **jQuery Integration** - Uses `$.tona()` for initialization
- **Lightweight** - Minimal loader script

## Usage

### Load by Theme Name

```html
<script src="https://blog-static.cnblogs.com/files/guangzan/loader.min.js"></script>
<script>
  const opts = {
    theme: {
      name: 'geek',
    },
    // Additional configuration
  }
  $.tona(opts)
</script>
```

### Load by Theme URL

```html
<script src="https://blog-static.cnblogs.com/files/guangzan/loader.min.js"></script>
<script>
  const opts = {
    theme: {
      name: 'https://blog-static.cnblogs.com/files/guangzan/reacg.js',
    },
    // Additional configuration
  }
  $.tona(opts)
</script>
```

## Configuration

The loader accepts a configuration object that gets mounted to the window:

```javascript
const opts = {
  theme: {
    name: 'geek', // Theme name or URL
  },
  // Theme-specific options
  bodyBackground: {
    enable: true,
    value: '#f5f5f5',
  },
  // ... other options
}

$.tona(opts)
```

## How It Works

1. The loader script mounts your configuration object to `window`
2. It then loads the theme JavaScript file based on `theme.name`
3. The theme file accesses the configuration via the global window object

## Available Themes

- `geek` - Modern minimalist theme
- `reacg` - Anime-style theme
- `shadcn` - Modern shadcn/ui inspired theme

For a complete list, visit [tona-themes](https://github.com/guangzan/tona/tree/main/packages/data).

## Installation (for Development)

```bash
npm install tona-loader
```

```bash
pnpm add tona-loader
```

## Related

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - Core framework
- [tona-themes](https://github.com/guangzan/tona/tree/main/packages/data) - Theme registry
