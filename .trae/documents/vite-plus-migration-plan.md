# Vite+ 迁移计划

## 项目概述

这是一个使用 pnpm workspace 的 monorepo 项目，包含多个 packages 和 themes。

### 当前工具链

- **Vite**: ^8.0.0 (catalog)
- **Vitest**: ^4.1.0 (catalog)
- **Biome**: 用于 linting 和 formatting
- **Lefthook**: Git hooks
- **tsdown**: 库构建工具

### 项目结构

- 根目录: `vitest.config.ts`, `biome.jsonc`, `lefthook.yml`
- Packages: 多个子包，部分有独立的 `vitest.config.ts`
- Themes: 多个主题，使用 `vite.config.ts`

---

## 迁移步骤

### Phase 1: 预迁移检查

1. **验证 Vite 和 Vitest 版本**
   - 确认 Vite >= 8.0.0 ✓ (catalog: `^8.0.0`)
   - 确认 Vitest >= 4.1.0 ✓ (catalog: `^4.1.0`)

### Phase 2: 执行迁移命令

2. **运行 Vite+ 迁移命令**

   ```bash
   vp migrate --no-interactive
   ```

   - 这将自动处理大部分迁移工作
   - 创建 `vite.config.ts` 并整合配置

### Phase 3: 验证导入重写

3. **检查 `vite` 导入重写**
   需要检查的文件：
   - `packages/plugins/vite.config.ts`
   - `packages/create-tona/template-minimal/vite.config.ts`
   - `packages/create-tona/template-preact/vite.config.ts`
   - `themes/shadcn/vite.config.ts`
   - `themes/geek/vite.config.ts`
   - `themes/reacg/vite.config.ts`
   - `packages/tona-vite/src/index.ts` (类型导入)

   预期变更: `from 'vite'` → `from 'vite-plus'`

4. **检查 `vitest` 导入重写**
   需要检查的测试文件：
   - `packages/create-tona/test/consts.test.ts`
   - `packages/create-tona/test/utils/package.test.ts`
   - `packages/create-tona/test/utils/fs.test.ts`
   - `packages/create-tona/test/strategies/package-manager.test.ts`
   - `packages/create-tona/test/core/context.test.ts`
   - `packages/options/test/index.test.ts`
   - `packages/core/tests/integration.test.ts`
   - `packages/core/tests/createThemeApi.test.ts`
   - `packages/stylelint-one-utility-class-per-line/__tests__/index.test.mjs`
   - `packages/core/tests/shared.test.ts`
   - `packages/core/tests/defineOptions.test.ts`

   预期变更: `from 'vitest'` → `from 'vite-plus/test'`

### Phase 4: 配置整合

5. **整合配置到 vite.config.ts**
   - 将 `vitest.config.ts` 配置合并到 `vite.config.ts` 的 test block
   - 将 `biome.jsonc` 配置迁移到 `vite.config.ts` 的 lint/fmt block
   - 移除独立的配置文件（如果迁移后不再需要）

6. **更新 package.json scripts**
   当前 scripts:

   ```json
   {
     "dev": "node scripts/dev-theme.ts",
     "build:theme": "node scripts/build-theme.ts",
     "build:pkg": "pnpm -r --filter=./packages/** --parallel run build",
     "docs:dev": "pnpm -C docs run dev",
     "docs:build": "pnpm -C docs run build",
     "typecheck": "vue-tsc --noEmit",
     "release": "tsx scripts/release.ts",
     "publish-ci": "tsx scripts/publish-ci.ts",
     "test": "vitest test",
     "lint": "pnpm exec biome check --write",
     "prepare": "lefthook install"
   }
   ```

   需要更新的命令映射：
   - `test`: `vitest test` → 使用 `vp test`
   - `lint`: `pnpm exec biome check --write` → 使用 `vp lint`
   - 新增 `fmt`: 使用 `vp fmt`
   - 新增 `check`: 使用 `vp check` (组合了 fmt, lint, typecheck)

### Phase 5: 清理旧依赖

7. **移除旧依赖**（确认重写后）
   - 从 `devDependencies` 移除 `vite` 和 `vitest`
   - 从 catalog 移除相关版本定义
   - 移除 `@vitest/ui` 如果不再需要

8. **清理配置文件**
   - 删除根目录 `vitest.config.ts`
   - 删除 `packages/create-tona/vitest.config.ts`
   - 删除 `packages/options/vitest.config.ts`
   - 可能需要删除或保留 `biome.jsonc`（取决于 Vite+ 是否完全接管）
   - 可能需要删除或保留 `lefthook.yml`（取决于 Vite+ hooks 配置）

### Phase 6: 验证迁移

9. **运行验证命令**
   ```bash
   vp install    # 安装依赖
   vp check      # 运行格式化、lint 和类型检查
   vp test       # 运行测试
   vp build      # 构建项目
   ```

---

## 注意事项

### 特殊文件处理

1. **README 文件中的示例代码**
   - `packages/tona-vite/README.md`
   - `packages/tona-vite/README.zh-CN.md`
   - 这些是文档示例，可能不需要修改，或需要更新以反映新的导入方式

2. **模板文件**
   - `packages/create-tona/template-minimal/vite.config.ts`
   - `packages/create-tona/template-preact/vite.config.ts`
   - 这些是项目模板，需要确保迁移后模板仍然可用

3. **类型导入**
   - `packages/tona-vite/src/index.ts` 使用了 `import type { ... } from 'vite'`
   - 需要确认类型导入是否也需要更新

### 子包配置

- 某些 packages 使用 `tsdown.config.ts` 而非 `vite.config.ts`
- 这些可能不受 Vite+ 迁移影响，但需要验证

---

## 预期结果

迁移完成后：

1. 统一使用 `vite.config.ts` 作为主配置文件
2. 使用 `vp` 命令替代分散的工具命令
3. 简化依赖管理
4. 保持项目功能不变

---

## 回滚方案

如果迁移出现问题：

1. 恢复 git 中被修改的文件
2. 重新安装依赖: `pnpm install`
3. 检查并恢复必要的配置文件
