# 贡献指南

欢迎为 Tona 贡献代码、文档与想法！本指南介绍开发环境的搭建、工作流程与代码规范。

## 开发环境

```bash
# 克隆仓库
git clone https://github.com/guangzan/tona.git
cd tona

# 安装全部工作区依赖（环境要求：Node.js >= 22.18、pnpm >= 10）
pnpm install
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 开发主题（热更新） |
| `pnpm build:theme` | 构建主题 |
| `pnpm build:pkg` | 构建所有包 |
| `pnpm test` | 运行测试 |
| `pnpm lint` | 代码检查 |
| `pnpm fmt` | 代码格式化 |
| `pnpm check` | 综合检查 |
| `pnpm release` | 发布版本 |

## 工作流程

### 1. 认领任务

- 通过 [Issues](https://github.com/guangzan/tona/issues) 报告 bug 或提出功能建议；
- 大改动建议先创建 Issue 讨论方案，再动手实现。

### 2. 分支与提交

```bash
git checkout -b feat/my-feature
# ... 实现与测试 ...
git commit -m "feat(plugins): add xxx plugin"
git push origin feat/my-feature
```

提交信息遵循 **Conventional Commits** 规范，常用类型：

| 类型 | 用途 |
| --- | --- |
| `feat` | 新功能 |
| `fix` | 缺陷修复 |
| `refactor` | 重构（不改行为） |
| `docs` | 文档 |
| `chore` | 构建 / 工具链 / 发布等杂项 |
| `test` | 测试 |
| `style` | 样式 / 格式 |
| `ci` | CI 配置 |

作用域（scope）标识改动位置，例如 `feat(plugins)`、`fix(theme-geek)`、`refactor(tona-vite)`、`docs(monorail)`。

### 3. 测试

- 每个包都有对应的 `test/` 或 `tests/` 目录（vitest）；
- 修改逻辑时**必须**补充或更新测试；
- 运行 `pnpm test` 确保全量通过。

### 4. 提交 Pull Request

- 在 PR 描述中说明改动动机、实现方式与测试情况；
- 等待 CI 通过与维护者 review。

## 代码规范

### TypeScript

- 全链路 TypeScript，新增代码必须包含完整类型；
- 插件选项类型与 `tona-options` **形状同源**（仅缺省为可选），修改选项时两处需同步；
- 公共 API 需要 JSDoc 注释。

### 样式

- 主题样式使用 SCSS，遵循 `themes/*/src/style/` 的目录组织（变量、mixins、markdown 样式分离）；
- 插件样式使用 CSS 变量（`plugins-scss-to-css` 迁移后约定）；
- 运行 `pnpm lint` 与 `pnpm fmt` 通过后再提交。

## 文档

- 仓库文档基于 monorail 工作流维护（`docs/monorail/`）；
- 本文档站位于 `website/`，构建方式：

```bash
pnpm -F website build        # 构建
pnpm -F website dev          # 本地预览
pnpm -F website check:links  # 检查内部链接
```

新增或修改功能时，同步更新 [API 参考](/api/)、[插件目录](/plugins/) 与[更新日志](/changelog)。

## 发布

版本发布由维护者执行：`pnpm release`（bumpp 提升版本 + 打 tag + 发布 npm），随后 CI 构建并上传主题资产。社区贡献者无需处理发布。

## 安全

发现安全问题请遵循 [SECURITY.md](https://github.com/guangzan/tona/blob/main/SECURITY.md) 的流程报告，不要公开披露。

## 致谢

特别鸣谢 [GShang](https://www.cnblogs.com/gshang) 创建并维护 Tona 项目。
