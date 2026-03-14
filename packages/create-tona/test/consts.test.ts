import { describe, expect, it } from 'vite-plus/test'
import {
  DEFAULT_APP_NAME,
  REGISTRIES,
  RENAME_FILES,
  TEMPLATES,
} from '../src/consts.js'

describe('consts', () => {
  describe('TEMPLATES', () => {
    it('should contain preact template', () => {
      const preact = TEMPLATES.find((t) => t.name === 'preact')
      expect(preact).toBeDefined()
      expect(preact?.label).toBe('preact (recommended)')
      expect(preact?.color).toBe('cyan')
    })

    it('should contain minimal template', () => {
      const minimal = TEMPLATES.find((t) => t.name === 'minimal')
      expect(minimal).toBeDefined()
      expect(minimal?.label).toBe('minimal')
      expect(minimal?.color).toBe('blue')
    })
  })

  describe('REGISTRIES', () => {
    it('should contain taobao registry', () => {
      const taobao = REGISTRIES.find((r) => r.name === 'taobao')
      expect(taobao).toBeDefined()
      expect(taobao?.url).toBe('https://registry.npmmirror.com')
      expect(taobao?.color).toBe('cyan')
    })

    it('should contain official registry', () => {
      const official = REGISTRIES.find((r) => r.name === 'official')
      expect(official).toBeDefined()
      expect(official?.url).toBeUndefined()
      expect(official?.color).toBe('blue')
    })

    it('should contain no option', () => {
      const no = REGISTRIES.find((r) => r.name === 'no')
      expect(no).toBeDefined()
      expect(no?.url).toBeUndefined()
    })
  })

  describe('RENAME_FILES', () => {
    it('should map _gitignore to .gitignore', () => {
      expect(RENAME_FILES['_gitignore']).toBe('.gitignore')
    })
  })

  describe('DEFAULT_APP_NAME', () => {
    it('should be tona-theme', () => {
      expect(DEFAULT_APP_NAME).toBe('tona-theme')
    })
  })
})
