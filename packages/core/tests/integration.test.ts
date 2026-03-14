import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import type { Plugin } from '../src/createThemeApi'
import { createTheme } from '../src/createThemeApi'
import { defineOptions } from '../src/index'

// 模拟 jQuery
;(global as any).$ = vi.fn(() => ({
  length: 0,
  fadeOut: vi.fn(),
}))

// 模拟 window.opts
declare global {
  interface Window {
    opts: object
  }
}
// 设置全局 window 对象
;(global as any).window = {
  opts: {},
}

describe('集成测试', () => {
  beforeEach(() => {
    window.opts = {}
    vi.clearAllMocks()
  })

  describe('皮肤创建与配置系统集成', () => {
    it('应该支持插件使用 defineOptions 进行配置', () => {
      const theme = createTheme()

      // 设置用户配置
      window.opts = {
        myPlugin: {
          enable: true,
          theme: 'dark',
          features: ['feature1', 'feature2'],
        },
      }

      // 定义插件配置
      const getPluginOptions = defineOptions('myPlugin', {
        enable: false,
        theme: 'light',
        features: [],
        debug: false,
      })

      // 创建使用配置的插件
      const configurablePlugin: Plugin = {
        install: (theme) => {
          const options = getPluginOptions({ debug: true })

          // 验证配置合并
          expect(options.enable).toBe(true) // 用户配置
          expect(options.theme).toBe('dark') // 用户配置
          expect(options.features).toEqual(['feature1', 'feature2']) // 用户配置
          expect(options.debug).toBe(true) // 开发配置

          // 将配置添加到全局属性
          theme.config.globalProperties.$pluginConfig = options
        },
      }

      theme.use(configurablePlugin)

      expect(theme.config.globalProperties.$pluginConfig.enable).toBe(true)
      expect(theme.config.globalProperties.$pluginConfig.theme).toBe('dark')
    })

    it('应该支持多个插件使用不同的配置策略', () => {
      const theme = createTheme()

      // 设置多个插件的用户配置
      window.opts = {
        pluginA: {
          enabled: true,
          color: 'red',
        },
        pluginB: {
          active: false,
          size: 'large',
        },
        pluginC: {
          mode: 'production',
        },
      }

      // 插件A：使用字符串键名
      const getPluginAOptions = defineOptions('pluginA', {
        enabled: false,
        color: 'blue',
        animation: true,
      })

      // 插件B：使用数组键名（别名）
      const getPluginBOptions = defineOptions(['pluginB', 'pluginBAlt'], {
        active: true,
        size: 'small',
        responsive: false,
      })

      // 插件C：使用开发配置覆盖
      const getPluginCOptions = defineOptions('pluginC', {
        mode: 'development',
        logging: false,
      })

      const pluginA: Plugin = {
        install: (theme) => {
          const options = getPluginAOptions()
          theme.config.globalProperties.$pluginA = options
        },
      }

      const pluginB: Plugin = {
        install: (theme) => {
          const options = getPluginBOptions({ responsive: true })
          theme.config.globalProperties.$pluginB = options
        },
      }

      const pluginC: Plugin = {
        install: (theme) => {
          const options = getPluginCOptions({ logging: true })
          theme.config.globalProperties.$pluginC = options
        },
      }

      theme.use(pluginA).use(pluginB).use(pluginC)

      // 验证插件A配置
      expect(theme.config.globalProperties.$pluginA).toEqual({
        enabled: true,
        color: 'red',
        animation: true,
      })

      // 验证插件B配置
      expect(theme.config.globalProperties.$pluginB).toEqual({
        active: false,
        size: 'large',
        responsive: true,
      })

      // 验证插件C配置
      expect(theme.config.globalProperties.$pluginC).toEqual({
        mode: 'production',
        logging: true,
      })
    })

    it('应该支持插件间的配置依赖', () => {
      const theme = createTheme()

      window.opts = {
        database: {
          host: 'localhost',
          port: 5432,
        },
        api: {
          baseUrl: 'https://api.example.com',
          timeout: 5000,
        },
      }

      // 数据库配置
      const getDatabaseOptions = defineOptions('database', {
        host: '127.0.0.1',
        port: 3306,
        username: 'admin',
        password: 'password',
      })

      // API配置（依赖数据库配置）
      const getApiOptions = defineOptions('api', {
        baseUrl: 'http://localhost:3000',
        timeout: 3000,
        retries: 3,
      })

      const databasePlugin: Plugin = {
        install: (theme) => {
          const dbOptions = getDatabaseOptions()
          theme.config.globalProperties.$db = dbOptions
        },
      }

      const apiPlugin: Plugin = {
        install: (theme) => {
          const apiOptions = getApiOptions()
          const dbOptions = theme.config.globalProperties.$db

          // API插件依赖数据库配置
          expect(dbOptions).toBeDefined()
          expect(dbOptions.host).toBe('localhost')

          theme.config.globalProperties.$api = {
            ...apiOptions,
            database: dbOptions,
          }
        },
      }

      theme.use(databasePlugin).use(apiPlugin)

      const apiConfig = theme.config.globalProperties.$api
      expect(apiConfig.baseUrl).toBe('https://api.example.com')
      expect(apiConfig.timeout).toBe(5000)
      expect(apiConfig.database.host).toBe('localhost')
      expect(apiConfig.database.port).toBe(5432)
    })
  })

  describe('复杂场景集成测试', () => {
    it('应该支持动态配置更新', () => {
      const theme = createTheme()

      // 初始配置
      window.opts = {
        dynamicPlugin: {
          theme: 'light',
          features: ['basic'],
        },
      }

      const getDynamicOptions = defineOptions('dynamicPlugin', {
        theme: 'default',
        features: [],
        advanced: false,
      })

      const dynamicPlugin: Plugin = {
        install: (theme) => {
          // 获取初始配置
          let options = getDynamicOptions()
          theme.config.globalProperties.$dynamic = options

          // 模拟配置更新
          const updateConfig = () => {
            window.opts = {
              dynamicPlugin: {
                theme: 'dark',
                features: ['basic', 'advanced'],
                advanced: true,
              },
            }
            options = getDynamicOptions()
            theme.config.globalProperties.$dynamic = options
          }

          theme.config.globalProperties.$updateDynamicConfig = updateConfig
        },
      }

      theme.use(dynamicPlugin)

      // 验证初始配置
      expect(theme.config.globalProperties.$dynamic.theme).toBe('light')
      expect(theme.config.globalProperties.$dynamic.features).toEqual(['basic'])

      // 更新配置
      theme.config.globalProperties.$updateDynamicConfig()

      // 验证更新后的配置
      expect(theme.config.globalProperties.$dynamic.theme).toBe('dark')
      expect(theme.config.globalProperties.$dynamic.features).toEqual([
        'basic',
        'advanced',
      ])
      expect(theme.config.globalProperties.$dynamic.advanced).toBe(true)
    })

    it('应该支持插件配置验证', () => {
      const theme = createTheme()

      window.opts = {
        validatedPlugin: {
          apiKey: 'user-api-key',
          endpoint: 'https://user-endpoint.com',
          timeout: 10000, // 超过最大限制
        },
      }

      const getValidatedOptions = defineOptions('validatedPlugin', {
        apiKey: '',
        endpoint: 'https://default.com',
        timeout: 5000,
        maxRetries: 3,
      })

      const validatedPlugin: Plugin = {
        install: (theme) => {
          const options = getValidatedOptions()

          // 配置验证
          const validatedConfig = {
            apiKey: options.apiKey || 'default-key',
            endpoint: options.endpoint,
            timeout: Math.min(options.timeout, 8000), // 限制最大超时时间
            maxRetries: options.maxRetries,
          }

          // 验证配置
          expect(validatedConfig.apiKey).toBe('user-api-key')
          expect(validatedConfig.endpoint).toBe('https://user-endpoint.com')
          expect(validatedConfig.timeout).toBe(8000) // 被限制为最大值
          expect(validatedConfig.maxRetries).toBe(3) // 使用默认值

          theme.config.globalProperties.$validated = validatedConfig
        },
      }

      theme.use(validatedPlugin)

      const config = theme.config.globalProperties.$validated
      expect(config.apiKey).toBe('user-api-key')
      expect(config.timeout).toBe(8000)
    })

    it('应该支持插件配置继承', () => {
      const theme = createTheme()

      window.opts = {
        basePlugin: {
          baseConfig: 'base-value',
          shared: 'shared-value',
        },
        extendedPlugin: {
          extendedConfig: 'extended-value',
          shared: 'overridden-shared',
        },
      }

      const getBaseOptions = defineOptions('basePlugin', {
        baseConfig: 'default-base',
        shared: 'default-shared',
      })

      const getExtendedOptions = defineOptions('extendedPlugin', {
        extendedConfig: 'default-extended',
        shared: 'default-shared',
      })

      const basePlugin: Plugin = {
        install: (theme) => {
          const baseOptions = getBaseOptions()
          theme.config.globalProperties.$base = baseOptions
        },
      }

      const extendedPlugin: Plugin = {
        install: (theme) => {
          const baseOptions = theme.config.globalProperties.$base
          const extendedOptions = getExtendedOptions()

          // 继承基础配置并扩展
          const combinedOptions = {
            ...baseOptions,
            ...extendedOptions,
            // 扩展插件特有的配置
            isExtended: true,
          }

          theme.config.globalProperties.$extended = combinedOptions
        },
      }

      theme.use(basePlugin).use(extendedPlugin)

      const extendedConfig = theme.config.globalProperties.$extended
      expect(extendedConfig.baseConfig).toBe('base-value')
      expect(extendedConfig.extendedConfig).toBe('extended-value')
      expect(extendedConfig.shared).toBe('overridden-shared') // 被扩展插件覆盖
      expect(extendedConfig.isExtended).toBe(true)
    })
  })

  describe('错误处理和边界情况集成测试', () => {
    it('应该处理配置缺失的情况', () => {
      const theme = createTheme()

      // 没有用户配置
      window.opts = {}

      const getMissingOptions = defineOptions('missingPlugin', {
        required: true,
        optional: 'default',
      })

      const missingPlugin: Plugin = {
        install: (theme) => {
          const options = getMissingOptions()

          // 应该使用默认配置
          expect(options.required).toBe(true)
          expect(options.optional).toBe('default')

          theme.config.globalProperties.$missing = options
        },
      }

      expect(() => theme.use(missingPlugin)).not.toThrow()
      expect(theme.config.globalProperties.$missing.required).toBe(true)
    })

    it('应该处理配置冲突的情况', () => {
      const theme = createTheme()

      // 配置冲突：用户配置 vs 开发配置
      window.opts = {
        conflictingPlugin: {
          mode: 'production',
          debug: false,
        },
      }

      const getConflictingOptions = defineOptions('conflictingPlugin', {
        mode: 'development',
        debug: true,
        verbose: false,
      })

      const conflictingPlugin: Plugin = {
        install: (theme) => {
          // 开发配置与用户配置冲突
          const options = getConflictingOptions({
            mode: 'test', // 开发配置
            debug: true, // 开发配置
            verbose: true, // 开发配置
          })

          // 验证优先级：用户配置 > 开发配置 > 默认配置
          expect(options.mode).toBe('production') // 用户配置优先级最高
          expect(options.debug).toBe(false) // 用户配置
          expect(options.verbose).toBe(true) // 开发配置（用户没有配置）

          theme.config.globalProperties.$conflicting = options
        },
      }

      theme.use(conflictingPlugin)

      const config = theme.config.globalProperties.$conflicting
      expect(config.mode).toBe('production')
      expect(config.debug).toBe(false)
      expect(config.verbose).toBe(true)
    })

    it('应该处理插件安装失败的情况', () => {
      const theme = createTheme()

      window.opts = {
        failingPlugin: {
          shouldFail: true,
        },
      }

      const getFailingOptions = defineOptions('failingPlugin', {
        shouldFail: false,
        fallback: 'safe-mode',
      })

      const failingPlugin: Plugin = {
        install: (theme) => {
          const options = getFailingOptions()

          if (options.shouldFail) {
            throw new Error('Plugin configuration error')
          }

          theme.config.globalProperties.$failing = options
        },
      }

      const safePlugin: Plugin = {
        install: (theme) => {
          // 这个插件应该正常安装
          theme.config.globalProperties.$safe = { status: 'ok' }
        },
      }

      // 第一个插件失败，第二个插件应该正常安装
      expect(() => theme.use(failingPlugin)).toThrow(
        'Plugin configuration error',
      )
      expect(() => theme.use(safePlugin)).not.toThrow()

      expect(theme.config.globalProperties.$safe.status).toBe('ok')
    })
  })

  describe('性能和内存测试', () => {
    it('应该高效处理大量插件和配置', () => {
      const theme = createTheme()

      // 创建大量配置
      const pluginConfigs: Record<string, any> = {}
      for (let i = 0; i < 50; i++) {
        pluginConfigs[`plugin${i}`] = {
          enabled: i % 2 === 0,
          value: `value${i}`,
          nested: {
            prop: `prop${i}`,
          },
        }
      }

      window.opts = pluginConfigs

      const startTime = performance.now()

      // 创建和安装大量插件
      for (let i = 0; i < 50; i++) {
        const getPluginOptions = defineOptions(`plugin${i}`, {
          enabled: false,
          value: 'default',
          nested: { prop: 'default' },
        })

        const plugin: Plugin = {
          install: (theme) => {
            const options = getPluginOptions()
            theme.config.globalProperties[`$plugin${i}`] = options
          },
        }

        theme.use(plugin)
      }

      const endTime = performance.now()

      // 应该快速完成（假设在100ms内）
      expect(endTime - startTime).toBeLessThan(100)

      // 验证所有插件都正确安装
      for (let i = 0; i < 50; i++) {
        const pluginConfig = theme.config.globalProperties[`$plugin${i}`]
        expect(pluginConfig).toBeDefined()
        expect(pluginConfig.enabled).toBe(i % 2 === 0)
        expect(pluginConfig.value).toBe(`value${i}`)
      }
    })
  })
})
