import { defineConfig } from '@rspress/core'

export default defineConfig({
  root: 'docs',
  title: 'Tona',
  description:
    '专为博客园（CNBlogs）设计的现代化皮肤开发框架：核心运行时、Vite 工具链、30+ 插件与多套内置主题',
  lang: 'zh-CN',
  logo: '/tona.png',
  logoText: 'Tona',
  icon: '/tona.png',
  outDir: 'doc_build',
  markdown: {
    checkDeadLinks: true,
    showLineNumbers: true,
  },
  themeConfig: {
    darkMode: true,
    enableScrollToTop: true,
    footer: {
      message:
        'Tona 专为博客园（CNBlogs）设计 · MIT License · 由 GShang 维护',
    },
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/guangzan/tona' },
    ],
    nav: [
      {
        text: '开发皮肤',
        link: '/guide/',
        activeMatch: '/(guide|api|plugins|themes|monorepo)/|/faq|/contributing|/changelog',
      },
      { text: '安装皮肤', link: '/install/', activeMatch: '/install/' },
    ],
    sidebar: {
      '/': [
        { sectionHeaderText: '指南' },
        { text: '总览', link: '/guide/' },
        { text: '快速开始', link: '/guide/quick-start' },
        { text: 'createTheme', link: '/guide/concepts/create-theme' },
        { text: 'defineOptions', link: '/guide/concepts/define-options' },
        { text: '插件系统', link: '/guide/concepts/plugin-system' },
        { text: '配置', link: '/guide/concepts/configuration' },
        { sectionHeaderText: '安装皮肤' },
        { text: '安装总览', link: '/install/' },
        { sectionHeaderText: 'API 参考' },
        { text: '总览', link: '/api/' },
        { text: '核心 API（tona）', link: '/api/core' },
        { text: '选项类型（tona-options）', link: '/api/options' },
        { text: 'Vite 插件（tona-vite）', link: '/api/tona-vite' },
        { sectionHeaderText: '插件' },
        { text: '插件目录', link: '/plugins/' },
        { text: '编写自定义插件', link: '/plugins/custom-plugin' },
        { sectionHeaderText: '内置主题' },
        { text: '主题概览', link: '/themes/' },
        { text: 'geek', link: '/themes/geek' },
        { text: 'reacg', link: '/themes/reacg' },
        { text: 'shadcn', link: '/themes/shadcn' },
        { text: 'simple', link: '/themes/simple' },
        { text: 'view', link: '/themes/view' },
        { sectionHeaderText: 'Monorepo' },
        { text: '包结构', link: '/monorepo/packages' },
        { sectionHeaderText: '其他' },
        { text: 'FAQ', link: '/faq' },
        { text: '贡献指南', link: '/contributing' },
        { text: '更新日志', link: '/changelog' },
      ],
    },
  },
})
