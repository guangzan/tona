import { beforeEach, describe, expect, it } from 'vite-plus/test'
import { defineOptions } from '../src/index'

// 模拟 window.opts
declare global {
  interface Window {
    opts: object
  }
}

describe('defineOptions', () => {
  beforeEach(() => {
    // 清理 window.opts
    window.opts = {}
  })

  describe('基础功能测试', () => {
    it('应该正确合并用户配置和默认配置', () => {
      window.opts = {
        myPlugin: {
          enable: false,
        },
      }
      const p1 = 'myPlugin'
      const p2 = {
        enable: true,
      }
      const output = defineOptions(p1, p2)()
      expect(output).toEqual({ enable: false })
    })

    it('应该支持多个属性配置', () => {
      const userConfig = {
        enable: false,
        color: 'red',
        size: 'large',
      }
      window.opts = {
        myPlugin: userConfig,
      }
      const p1 = 'myPlugin'
      const p2 = {
        enable: true,
        color: '',
        size: 'small',
      }
      const output = defineOptions(p1, p2)()
      expect(output).toEqual(userConfig)
    })

    it('应该支持数组形式的配置键名', () => {
      const userConfig = {
        enable: false,
      }
      window.opts = {
        myPluginAlias: userConfig,
      }
      const p1 = ['myPlugin', 'myPluginAlias']
      const p2 = {
        enable: true,
      }
      const output = defineOptions(p1, p2)()
      expect(output).toEqual({ enable: false })
    })
  })

  describe('边界情况测试', () => {
    it('当用户配置不存在时应该返回默认配置', () => {
      window.opts = {}
      const p1 = 'nonExistentPlugin'
      const p2 = {
        enable: true,
        color: 'blue',
      }
      const output = defineOptions(p1, p2)()
      expect(output).toEqual({ enable: true, color: 'blue' })
    })

    it('当 window.opts 不存在时应该返回默认配置', () => {
      // 故意删除 window.opts
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).opts
      const p1 = 'myPlugin'
      const p2 = {
        enable: true,
      }
      const output = defineOptions(p1, p2)()
      expect(output).toEqual({ enable: true })
    })

    it('应该处理空数组的配置键名', () => {
      window.opts = {
        myPlugin: { enable: false },
      }
      const p1: string[] = []
      const p2 = {
        enable: true,
      }
      const output = defineOptions(p1, p2)()
      expect(output).toEqual({ enable: true })
    })

    it('应该处理 null 和 undefined 的用户配置', () => {
      window.opts = {
        myPlugin: null,
        myPlugin2: undefined,
      }
      const p1 = 'myPlugin'
      const p2 = {
        enable: true,
      }
      const output = defineOptions(p1, p2)()
      expect(output).toEqual({ enable: true })
    })

    it('应该处理深层嵌套的对象配置', () => {
      const userConfig = {
        enable: false,
        settings: {
          theme: 'dark',
          language: 'zh-CN',
        },
      }
      window.opts = {
        myPlugin: userConfig,
      }
      const p1 = 'myPlugin'
      const p2 = {
        enable: true,
        settings: {
          theme: 'light',
          language: 'en',
        },
      }
      const output = defineOptions(p1, p2)()
      expect(output).toEqual(userConfig)
    })
  })

  describe('开发配置测试', () => {
    it('应该正确合并开发配置', () => {
      window.opts = {
        myPlugin: {
          enable: false,
          color: 'red',
        },
      }
      const p1 = 'myPlugin'
      const p2 = {
        enable: true,
        color: 'blue',
        debug: false,
      }
      const devOptions = {
        debug: true,
        version: '1.0.0',
      }
      const output = defineOptions(p1, p2)(devOptions)
      expect(output).toEqual({
        enable: false,
        color: 'red',
        debug: true,
        version: '1.0.0',
      })
    })

    it('应该优先使用用户配置，然后是开发配置，最后是默认配置', () => {
      window.opts = {
        myPlugin: {
          enable: false, // 用户配置
        },
      }
      const p1 = 'myPlugin'
      const p2 = {
        enable: true, // 默认配置
        color: 'blue', // 默认配置
      }
      const devOptions = {
        enable: false, // 开发配置（会被用户配置覆盖）
        color: 'red', // 开发配置（会被用户配置覆盖）
        debug: true, // 开发配置
      }
      const output = defineOptions(p1, p2)(devOptions)
      expect(output).toEqual({
        enable: false, // 用户配置优先级最高
        color: 'red', // 开发配置优先级高于默认配置
        debug: true, // 开发配置
      })
    })
  })

  describe('数组键名优先级测试', () => {
    it('应该按数组顺序查找配置，返回第一个匹配的', () => {
      window.opts = {
        firstPlugin: { enable: false },
        secondPlugin: { enable: true },
      }
      const p1 = ['firstPlugin', 'secondPlugin']
      const p2 = {
        enable: true,
      }
      const output = defineOptions(p1, p2)()
      expect(output).toEqual({ enable: false })
    })

    it('应该在没有匹配键时返回默认配置', () => {
      window.opts = {
        otherPlugin: { enable: false },
      }
      const p1 = ['firstPlugin', 'secondPlugin']
      const p2 = {
        enable: true,
      }
      const output = defineOptions(p1, p2)()
      expect(output).toEqual({ enable: true })
    })
  })

  describe('类型安全测试', () => {
    it('应该保持原始对象的引用独立性', () => {
      window.opts = {
        myPlugin: { enable: false },
      }
      const p1 = 'myPlugin'
      const p2 = { enable: true }
      const devOptions = { debug: false }

      const output1 = defineOptions(p1, p2)(devOptions)
      const output2 = defineOptions(p1, p2)(devOptions)

      expect(output1).toEqual(output2)
      expect(output1).not.toBe(output2) // 应该是不同的对象引用
    })

    it('应该处理函数类型的配置值', () => {
      const userConfig = {
        enable: false,
        callback: () => 'user callback',
      }
      window.opts = {
        myPlugin: userConfig,
      }
      const p1 = 'myPlugin'
      const p2 = {
        enable: true,
        callback: () => 'default callback',
      }
      const output = defineOptions(p1, p2)()
      expect(output.enable).toBe(false)
      expect(typeof output.callback).toBe('function')
      expect(output.callback()).toBe('user callback')
    })
  })
})
