# Vite+ 迁移后续清理计划

## 任务概述

完成 Vite+ 迁移后的清理工作：

1. 移除 Biome，使用 Vite+ 内置的 lint/fmt，迁移配置
2. 移除 Lefthook，使用 Vite+ 内置的 git hooks
3. 更新 README 文档中的示例代码

---

## Phase 1: 迁移 Biome 配置到 Vite+

### 1.1 分析 Biome 配置

当前 `biome.jsonc` 配置：

- **Formatter**: 单引号、无分号、2空格缩进、80字符行宽
- **Linter**: recommended 规则 + 自定义规则
- **Files**: 包含/排除模式
- **JavaScript**: JSX 单引号、尾随逗号

### 1.2 更新 vite.config.ts

将 Biome 配置迁移到 `vite.config.ts` 的 `lint` 和 `fmt` block：

```typescript
import { defineConfig } from 'vite-plus'

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
  lint: {
    // 迁移 Biome linter 规则
  },
  fmt: {
    // 迁移 Biome formatter 配置
    quoteStyle: 'single',
    semicolons: 'asNeeded', // 无分号
    indentStyle: 'space',
    indentWidth: 2,
    lineWidth: 80,
  },
})
```

### 1.3 删除 Biome 相关文件和依赖

- 删除 `biome.jsonc`
- 从 `package.json` devDependencies 移除 `@biomejs/biome`
- 从 `pnpm-workspace.yaml` catalog 移除 `@biomejs/biome`

---

## Phase 2: 迁移 Git Hooks 到 Vite+

### 2.1 配置 Vite+ Git Hooks

运行 `vp config --hooks` 配置 git hooks（或手动配置）

### 2.2 删除 Lefthook 相关文件和依赖

- 删除 `lefthook.yml`
- 从 `package.json` 移除 `prepare` script 中的 `lefthook install`
- 从 `package.json` devDependencies 移除 `lefthook`
- 从 `pnpm-workspace.yaml` catalog 移除 `lefthook`
- 从 `pnpm-workspace.yaml` onlyBuiltDependencies 移除 `lefthook`

---

## Phase 3: 更新 README 文档

### 3.1 更新 packages/tona-vite/README.md

将示例代码中的导入从 `vite` 改为 `vite-plus`：

```typescript
// 修改前
import { defineConfig } from 'vite'

// 修改后
import { defineConfig } from 'vite-plus'
```

需要更新的位置：

- 第 41 行
- 第 52 行
- 第 112 行

### 3.2 更新 packages/tona-vite/README.zh-CN.md

同样更新三处导入：

- 第 41 行
- 第 52 行
- 第 112 行

---

## Phase 4: 清理依赖

### 4.1 更新 package.json

移除：

- `@biomejs/biome` from devDependencies
- `lefthook` from devDependencies
- `prepare` script 中的 `lefthook install`（或替换为 Vite+ hooks）

### 4.2 更新 pnpm-workspace.yaml

移除：

- `@biomejs/biome` from catalog
- `lefthook` from catalog
- `lefthook` from onlyBuiltDependencies

---

## Phase 5: 验证

运行验证命令：

```bash
vp install
vp check
vp test
vp build (或 vp pack)
```

---

## 执行顺序

1. 更新 `vite.config.ts` 添加 lint/fmt 配置
2. 更新 `package.json` 移除依赖和更新 scripts
3. 更新 `pnpm-workspace.yaml` 移除依赖
4. 删除 `biome.jsonc`
5. 删除 `lefthook.yml`
6. 更新 README 文档
7. 运行 `vp install`
8. 运行 `vp config --hooks` 配置 git hooks
9. 运行验证命令
