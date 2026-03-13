# create-tona

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  Interactive CLI tool to scaffold Tona theme projects.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/create-tona"><img src="https://img.shields.io/npm/v/create-tona?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/create-tona?style=flat-square" alt="license"></a>
</p>

**English** | [中文](./README.zh-CN.md)

## Features

- **Interactive Setup** - Guided prompts for project configuration
- **Multiple Templates** - Choose from minimal, Preact, and more templates
- **Package Manager Support** - Auto-detects npm, yarn, pnpm
- **TypeScript Ready** - All templates include TypeScript support
- **Best Practices** - Pre-configured with Vite and modern tooling

## Usage

### Create a New Project

```bash
npm create tona@latest
```

```bash
pnpm create tona
```

```bash
yarn create tona
```

### Command Line Options

```bash
create-tona [project-name] [options]
```

**Options:**
- `-t, --template <template>` - Specify template (minimal, preact)
- `-p, --package-manager <pm>` - Specify package manager (npm, yarn, pnpm)
- `-h, --help` - Show help

## Templates

### minimal

A minimal TypeScript starter template with basic Tona setup.

**Features:**
- TypeScript support
- Vite build tool
- Basic plugin example

### preact

A Preact-based template for building modern reactive themes.

**Features:**
- Preact for UI components
- SPA routing support
- UI component library
- Tailwind CSS ready

## Project Structure

```
my-theme/
├── src/
│   ├── main.ts          # Theme entry point
│   └── style.css        # Theme styles
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project configuration
```

## Development

After creating your project:

```bash
cd my-theme
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Creating a Plugin

```typescript
// src/main.ts
import { createTheme } from 'tona'
import './style.css'

function myPlugin(theme) {
  // Your plugin logic
  console.log('Plugin initialized!')
}

createTheme().use(myPlugin)
```

## Related

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - Core framework
- [tona-vite](https://github.com/guangzan/tona/tree/main/packages/tona-vite) - Vite plugin
