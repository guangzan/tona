# tona-stylelint-one-utility-class-per-line

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  Tona 主题的 Stylelint 插件 - 强制每行一个工具类。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-stylelint-one-utility-class-per-line"><img src="https://img.shields.io/npm/v/tona-stylelint-one-utility-class-per-line?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-stylelint-one-utility-class-per-line?style=flat-square" alt="license"></a>
  <a href="https://stylelint.io"><img src="https://img.shields.io/badge/stylelint-^15.0.0||^16.0.0-000?style=flat-square&logo=stylelint" alt="Stylelint"></a>
</p>

[English](./README.md) | **中文**

## 特性

- **代码整洁** - 强制每行一个工具类，提高可读性
- **Tailwind 兼容** - 为 Tailwind CSS 和类似的 utility-first 框架设计
- **自动修复支持** - 自动格式化 class 属性
- **可配置** - 自定义规则以适应您的需求

## 安装

```bash
npm install -D tona-stylelint-one-utility-class-per-line
```

```bash
pnpm add -D tona-stylelint-one-utility-class-per-line
```

## 使用

将插件添加到您的 Stylelint 配置中：

```javascript
// .stylelintrc.mjs
export default {
  plugins: ['tona-stylelint-one-utility-class-per-line'],
  rules: {
    'tona/one-utility-class-per-line': true,
  },
}
```

## 规则详情

此规则强制要求当行长度超过一定限制时，HTML class 属性每行只包含一个工具类。

### 有效

```html
<!-- 短 class 属性 -->
<div class="flex items-center"></div>

<!-- 每行一个类 -->
<div
  class="
    flex
    items-center
    justify-between
    p-4
  "
></div>
```

### 无效

```html
<!-- 一长行多个类 -->
<div
  class="flex items-center justify-between p-4 m-4 bg-blue-500 text-white"
></div>
```

## 配置选项

```javascript
{
  'tona/one-utility-class-per-line': [
    true,
    {
      // 强制执行规则前的最大行长度
      maxLineLength: 80,
      // 其他选项
    }
  ]
}
```

## 自动修复

该插件支持自动修复：

```bash
stylelint "**/*.html" --fix
```

## 相关

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - 核心框架
- [Stylelint](https://stylelint.io) - CSS 检查工具
