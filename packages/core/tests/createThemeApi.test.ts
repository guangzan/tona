import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import type { Plugin } from '../src/createThemeApi'
import { createTheme } from '../src/createThemeApi'

// 模拟 window.opts
declare global {
  interface Window {
    opts: object
  }
}
// 设置全局 $ 对象
;(global as any).$ = vi.fn(() => ({
  length: 0,
  fadeOut: vi.fn(),
}))

describe('createTheme', () => {
  beforeEach(() => {
    // 清理 window.opts
    window.opts = {}
    // 重置所有 mock
    vi.clearAllMocks()
  })

  describe('基础功能测试', () => {
    it('应该创建一个皮肤实例', () => {
      const theme = createTheme()

      expect(theme).toBeDefined()
      expect(theme.version).toBe('3.0')
      expect(theme._context).toBeDefined()
      expect(theme.config).toBeDefined()
      expect(typeof theme.use).toBe('function')
    })

    it('应该正确初始化皮肤配置', () => {
      const theme = createTheme()

      expect(theme.config.globalProperties).toEqual({})
    })

    it('应该提供只读的 config 属性', () => {
      const theme = createTheme()

      // config 应该是只读的
      const originalConfig = theme.config
      theme.config = {} as any
      expect(theme.config).toBe(originalConfig)
    })

    it('应该支持链式调用 use 方法', () => {
      const theme = createTheme()
      const plugin1: Plugin = {
        install: vi.fn(),
      }
      const plugin2: Plugin = {
        install: vi.fn(),
      }

      const result = theme.use(plugin1).use(plugin2)

      expect(result).toBe(theme)
      expect(plugin1.install).toHaveBeenCalledWith(theme)
      expect(plugin2.install).toHaveBeenCalledWith(theme)
    })
  })

  describe('插件系统测试', () => {
    it('应该安装带有 install 方法的插件对象', () => {
      const theme = createTheme()
      const plugin: Plugin = {
        install: vi.fn(),
      }

      theme.use(plugin)

      expect(plugin.install).toHaveBeenCalledWith(theme)
    })

    it('应该安装函数形式的插件', () => {
      const theme = createTheme()
      const plugin: Plugin = vi.fn()

      theme.use(plugin)

      expect(plugin).toHaveBeenCalledWith(theme)
    })

    it('应该向插件传递额外参数', () => {
      const theme = createTheme()
      const plugin: Plugin = {
        install: vi.fn(),
      }

      theme.use(plugin, 'arg1', 'arg2', { option: true })

      expect(plugin.install).toHaveBeenCalledWith(theme, 'arg1', 'arg2', {
        option: true,
      })
    })

    it('应该防止重复安装同一个插件', () => {
      const theme = createTheme()
      const plugin: Plugin = {
        install: vi.fn(),
      }

      theme.use(plugin)
      theme.use(plugin) // 第二次安装

      expect(plugin.install).toHaveBeenCalledTimes(1)
    })

    it('应该处理无效的插件', () => {
      const theme = createTheme()
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // 测试 null 插件
      theme.use(null as any)

      // 测试没有 install 方法的对象
      theme.use({} as any)

      // 测试非函数非对象的值
      theme.use('invalid' as any)

      // 在开发模式下应该会调用 console.warn，但在测试环境中 __DEV__ 为 false
      // 所以这里不期望调用 console.warn
      expect(consoleSpy).not.toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('应该处理插件安装错误', () => {
      const theme = createTheme()
      const plugin: Plugin = {
        install: vi.fn().mockImplementation(() => {
          throw new Error('Plugin installation failed')
        }),
      }

      expect(() => theme.use(plugin)).toThrow('Plugin installation failed')
    })
  })

  describe('皮肤配置测试', () => {
    it('应该允许修改 globalProperties', () => {
      const theme = createTheme()

      theme.config.globalProperties.$http = {}
      theme.config.globalProperties.$utils = {}

      expect(theme.config.globalProperties.$http).toEqual({})
      expect(theme.config.globalProperties.$utils).toEqual({})
    })

    it('应该保持配置对象的引用一致性', () => {
      const theme = createTheme()

      const config1 = theme.config
      const config2 = theme._context.config

      expect(config1).toBe(config2)
    })
  })

  describe('上下文测试', () => {
    it('应该正确设置皮肤上下文', () => {
      const theme = createTheme()

      expect(theme._context.theme).toBe(theme)
      expect(theme._context.config).toBe(theme.config)
    })

    it('应该为每个插件提供正确的上下文', () => {
      const theme = createTheme()
      let receivedContext: any

      const plugin: Plugin = {
        install: (themeInstance) => {
          receivedContext = themeInstance._context
        },
      }

      theme.use(plugin)

      expect(receivedContext).toBe(theme._context)
      expect(receivedContext.theme).toBe(theme)
      expect(receivedContext.config).toBe(theme.config)
    })
  })

  describe('集成测试', () => {
    it('应该支持复杂的插件生态系统', () => {
      const theme = createTheme()

      // 插件1：添加全局属性
      const globalPlugin: Plugin = {
        install: (theme) => {
          theme.config.globalProperties.$global = 'test'
        },
      }

      // 插件2：依赖插件1的全局属性
      const dependentPlugin: Plugin = {
        install: (theme) => {
          expect(theme.config.globalProperties.$global).toBe('test')
          theme.config.globalProperties.$dependent = 'dependent'
        },
      }

      // 插件3：函数形式插件
      const functionPlugin: Plugin = (theme) => {
        theme.config.globalProperties.$function = 'function'
      }

      theme.use(globalPlugin).use(dependentPlugin).use(functionPlugin)

      expect(theme.config.globalProperties.$global).toBe('test')
      expect(theme.config.globalProperties.$dependent).toBe('dependent')
      expect(theme.config.globalProperties.$function).toBe('function')
    })

    it('应该支持插件之间的数据共享', () => {
      const theme = createTheme()
      const sharedData = { count: 0 }

      const counterPlugin: Plugin = {
        install: (theme) => {
          theme.config.globalProperties.$counter = sharedData
        },
      }

      const incrementPlugin: Plugin = {
        install: (theme) => {
          theme.config.globalProperties.$increment = () => {
            theme.config.globalProperties.$counter.count++
          }
        },
      }

      theme.use(counterPlugin).use(incrementPlugin)

      expect(theme.config.globalProperties.$counter.count).toBe(0)
      theme.config.globalProperties.$increment()
      expect(theme.config.globalProperties.$counter.count).toBe(1)
    })
  })

  describe('错误处理测试', () => {
    it('应该处理插件返回值的各种情况', () => {
      const theme = createTheme()

      // 返回 undefined 的插件
      const plugin1: Plugin = {
        install: () => undefined,
      }

      // 返回值的插件
      const plugin2: Plugin = {
        install: () => 'returned value',
      }

      // 返回 Promise 的插件
      const plugin3: Plugin = {
        install: () => Promise.resolve('async value'),
      }

      expect(() => theme.use(plugin1)).not.toThrow()
      expect(() => theme.use(plugin2)).not.toThrow()
      expect(() => theme.use(plugin3)).not.toThrow()
    })
  })

  describe('性能测试', () => {
    it('应该高效处理大量插件', () => {
      const theme = createTheme()
      const plugins: Plugin[] = []

      // 创建100个插件
      for (let i = 0; i < 100; i++) {
        plugins.push({
          install: vi.fn(),
        })
      }

      const startTime = performance.now()

      for (const plugin of plugins) {
        theme.use(plugin)
      }

      const endTime = performance.now()

      // 应该快速完成（假设100个插件在10ms内完成）
      expect(endTime - startTime).toBeLessThan(10)

      // 验证所有插件都被正确调用
      for (const plugin of plugins) {
        expect(plugin.install).toHaveBeenCalledWith(theme)
      }
    })
  })
})
