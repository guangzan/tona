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
      '/guide/': [
        {
          text: '指南',
          collapsible: false,
          items: [
            { text: '总览', link: '/guide/' },
            { text: '快速开始', link: '/guide/quick-start' },
          ],
        },
        {
          text: '核心概念',
          collapsible: false,
          items: [
            { text: 'createTheme', link: '/guide/concepts/create-theme' },
            { text: 'defineOptions', link: '/guide/concepts/define-options' },
            { text: '插件系统', link: '/guide/concepts/plugin-system' },
            { text: '配置', link: '/guide/concepts/configuration' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API 参考',
          collapsible: false,
          items: [
            { text: '总览', link: '/api/' },
            { text: '核心 API（tona）', link: '/api/core' },
            { text: '选项类型（tona-options）', link: '/api/options' },
            { text: 'Vite 插件（tona-vite）', link: '/api/tona-vite' },
          ],
        },
      ],
      '/plugins/': [
        {
          text: '插件',
          collapsible: false,
          items: [
            { text: '插件目录', link: '/plugins/' },
            { text: '编写自定义插件', link: '/plugins/custom-plugin' },
          ],
        },
      ],
      '/themes/': [
        {
          text: '内置主题',
          collapsible: false,
          items: [
            { text: '主题概览', link: '/themes/' },
            { text: 'geek', link: '/themes/geek' },
            { text: 'reacg', link: '/themes/reacg' },
            { text: 'shadcn', link: '/themes/shadcn' },
            { text: 'simple', link: '/themes/simple' },
            { text: 'view', link: '/themes/view' },
          ],
        },
      ],
      '/install/': [
        {
          text: '安装皮肤',
          collapsible: false,
          items: [{ text: '安装总览', link: '/install/' }],
        },
      ],
      '/monorepo/': [
        {
          text: 'Monorepo',
          collapsible: false,
          items: [{ text: '包结构', link: '/monorepo/packages' }],
        },
      ],
      '/faq': [
        {
          text: '其他',
          collapsible: false,
          items: [{ text: 'FAQ', link: '/faq' }],
        },
      ],
      '/contributing': [
        {
          text: '其他',
          collapsible: false,
          items: [{ text: '贡献指南', link: '/contributing' }],
        },
      ],
      '/changelog': [
        {
          text: '其他',
          collapsible: false,
          items: [{ text: '更新日志', link: '/changelog' }],
        },
      ],
    },
  },
})
