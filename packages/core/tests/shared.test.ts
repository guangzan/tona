import { describe, expect, it } from 'vite-plus/test'
import { extend, isArray, isFunction, isString } from '../src/utils/shared'

describe('shared utils', () => {
  describe('extend', () => {
    it('应该合并多个对象', () => {
      const obj1 = { a: 1, b: 2 }
      const obj2 = { b: 3, c: 4 }
      const obj3 = { c: 5, d: 6 }

      const result = extend({}, obj1, obj2, obj3)

      expect(result).toEqual({ a: 1, b: 3, c: 5, d: 6 })
    })

    it('应该修改目标对象', () => {
      const target = { a: 1 }
      const source = { b: 2 }

      extend(target, source)

      expect(target).toEqual({ a: 1, b: 2 })
    })

    it('应该处理空对象', () => {
      const result = extend({}, {})

      expect(result).toEqual({})
    })

    it('应该处理 undefined 和 null 值', () => {
      const target = { a: 1 }

      extend(target, undefined, null, { b: 2 })

      expect(target).toEqual({ a: 1, b: 2 })
    })

    it('应该保持对象引用的一致性', () => {
      const target = {}
      const result = extend(target, { a: 1 })

      expect(result).toBe(target)
    })

    it('应该处理深层嵌套对象', () => {
      const obj1 = { a: { x: 1, y: 2 } }
      const obj2 = { a: { y: 3, z: 4 } }

      const result = extend({}, obj1, obj2)

      expect(result).toEqual({ a: { y: 3, z: 4 } })
    })

    it('应该处理数组属性', () => {
      const obj1 = { arr: [1, 2] }
      const obj2 = { arr: [3, 4, 5] }

      const result = extend({}, obj1, obj2)

      expect(result).toEqual({ arr: [3, 4, 5] })
    })

    it('应该处理函数属性', () => {
      const fn1 = (): string => 'fn1'
      const fn2 = (): string => 'fn2'
      const obj1 = { fn: fn1 }
      const obj2 = { fn: fn2 }

      const result = extend({}, obj1, obj2)

      expect(result.fn).toBe(fn2)
      expect(result.fn()).toBe('fn2')
    })

    it('应该处理 Symbol 属性', () => {
      const sym1 = Symbol('sym1')
      const sym2 = Symbol('sym2')
      const obj1 = { [sym1]: 'value1' }
      const obj2 = { [sym2]: 'value2' }

      const result = extend({}, obj1, obj2)

      expect(result[sym1]).toBe('value1')
      expect(result[sym2]).toBe('value2')
    })
  })

  describe('isArray', () => {
    it('应该正确识别数组', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
      expect(isArray([])).toBe(true)
      expect(isArray(Array.from({ length: 3 }))).toBe(true)
    })

    it('应该正确识别非数组', () => {
      expect(isArray({})).toBe(false)
      expect(isArray('string')).toBe(false)
      expect(isArray(123)).toBe(false)
      expect(isArray(null)).toBe(false)
      expect(isArray(undefined)).toBe(false)
      expect(isArray(true)).toBe(false)
      expect(isArray(() => {})).toBe(false)
    })

    it('应该处理类数组对象', () => {
      expect(isArray({ length: 0 })).toBe(false)
      // 模拟 NodeList 对象（类似 querySelectorAll 的返回值）
      const mockNodeList = {
        0: 'div1',
        1: 'div2',
        length: 2,
        item: () => null,
        forEach: () => {},
      }
      expect(isArray(mockNodeList)).toBe(false)
      // 模拟 arguments 对象
      function testArgs() {
        // eslint-disable-next-line prefer-rest-params
        return isArray(arguments)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((testArgs as any)(1, 2, 3)).toBe(false)
    })

    it('应该处理边界情况', () => {
      expect(isArray(Array.prototype)).toBe(true)
      expect(isArray(Object.create(Array.prototype))).toBe(false)
    })
  })

  describe('isFunction', () => {
    it('应该正确识别函数', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(async () => {})).toBe(true)
      expect(isFunction(function* () {})).toBe(true)
      expect(isFunction(class {})).toBe(true)
      expect(isFunction(Math.max)).toBe(true)
    })

    it('应该正确识别非函数', () => {
      expect(isFunction({})).toBe(false)
      expect(isFunction([])).toBe(false)
      expect(isFunction('string')).toBe(false)
      expect(isFunction(123)).toBe(false)
      expect(isFunction(null)).toBe(false)
      expect(isFunction(undefined)).toBe(false)
      expect(isFunction(true)).toBe(false)
    })

    it('应该处理构造函数', () => {
      function Constructor() {}
      expect(isFunction(Constructor)).toBe(true)
      expect(isFunction(new (Constructor as any)())).toBe(false)
    })

    it('应该处理箭头函数', () => {
      const arrowFn = () => {}
      expect(isFunction(arrowFn)).toBe(true)
    })

    it('应该处理生成器函数', () => {
      const generator = function* () {
        yield 1
      }
      expect(isFunction(generator)).toBe(true)
    })

    it('应该处理异步函数', () => {
      const asyncFn = async () => {
        return Promise.resolve()
      }
      expect(isFunction(asyncFn)).toBe(true)
    })

    it('应该处理类', () => {
      class MyClass {}
      expect(isFunction(MyClass)).toBe(true)
      expect(isFunction(new MyClass())).toBe(false)
    })
  })

  describe('isString', () => {
    it('应该正确识别字符串', () => {
      expect(isString('')).toBe(true)
      expect(isString('hello')).toBe(true)
      expect(isString('123')).toBe(true)
      expect(isString('  ')).toBe(true)
      expect(isString(String('test'))).toBe(true)
      expect(isString(new String('test'))).toBe(false) // String 对象不是字符串类型
    })

    it('应该正确识别非字符串', () => {
      expect(isString({})).toBe(false)
      expect(isString([])).toBe(false)
      expect(isString(123)).toBe(false)
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
      expect(isString(true)).toBe(false)
      expect(isString(() => {})).toBe(false)
      expect(isString(Symbol('test'))).toBe(false)
    })

    it('应该处理字符串对象', () => {
      expect(isString(new String('test'))).toBe(false) // String 对象不是字符串类型
      expect(isString(String(123))).toBe(true) // String() 返回字符串类型
    })

    it('应该处理特殊字符串', () => {
      expect(isString('\n')).toBe(true)
      expect(isString('\t')).toBe(true)
      expect(isString('\\')).toBe(true)
      expect(isString('"')).toBe(true)
      expect(isString("'")).toBe(true)
      expect(isString('`')).toBe(true)
    })

    it('应该处理 Unicode 字符串', () => {
      expect(isString('🚀')).toBe(true)
      expect(isString('中文')).toBe(true)
      expect(isString('العربية')).toBe(true)
    })

    it('应该处理模板字符串', () => {
      const template = `hello ${'world'}`
      expect(isString(template)).toBe(true)
    })
  })

  describe('组合使用测试', () => {
    it('extend 和 isArray 组合使用', () => {
      const arr1 = [1, 2]
      const arr2 = [3, 4]
      const obj = { arr: arr1 }

      extend(obj, { arr: arr2 })

      expect(isArray(obj.arr)).toBe(true)
      expect(obj.arr).toEqual([3, 4])
    })

    it('extend 和 isFunction 组合使用', () => {
      const fn1 = () => 'fn1'
      const fn2 = () => 'fn2'
      const obj = { fn: fn1 }

      extend(obj, { fn: fn2 })

      expect(isFunction(obj.fn)).toBe(true)
      expect(obj.fn()).toBe('fn2')
    })

    it('extend 和 isString 组合使用', () => {
      const obj = { str: 'hello' }

      extend(obj, { str: 'world' })

      expect(isString(obj.str)).toBe(true)
      expect(obj.str).toBe('world')
    })

    it('类型守卫的正确性', () => {
      const mixedArray = [
        'string',
        123,
        true,
        {},
        [],
        () => {},
        null,
        undefined,
      ]

      const strings = mixedArray.filter(isString)
      const arrays = mixedArray.filter(isArray)
      const functions = mixedArray.filter(isFunction)

      expect(strings).toEqual(['string'])
      expect(arrays).toEqual([[]])
      expect(functions).toEqual([expect.any(Function)])
    })
  })

  describe('性能测试', () => {
    it('extend 应该高效处理大量属性', () => {
      const largeObj1: Record<string, any> = {}
      const largeObj2: Record<string, any> = {}

      // 创建包含1000个属性的对象
      for (let i = 0; i < 1000; i++) {
        largeObj1[`prop${i}`] = `value${i}`
        largeObj2[`prop${i}`] = `newValue${i}`
      }

      const startTime = performance.now()
      const result = extend({}, largeObj1, largeObj2)
      const endTime = performance.now()

      // 应该快速完成（假设在10ms内）
      expect(endTime - startTime).toBeLessThan(10)
      expect(Object.keys(result)).toHaveLength(1000)
    })

    it('类型检查函数应该高效', () => {
      const testValues = ['string', [], () => {}, 123, {}, null, undefined]

      const iterations = 10000

      const startTime = performance.now()

      for (let i = 0; i < iterations; i++) {
        testValues.forEach((value) => {
          isString(value)
          isArray(value)
          isFunction(value)
        })
      }

      const endTime = performance.now()

      // 应该快速完成（假设在50ms内）
      expect(endTime - startTime).toBeLessThan(50)
    })
  })
})
