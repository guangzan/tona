import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { ProjectContextImpl } from '../../src/core/context.js'
import type { CliArgs } from '../../src/types.js'

describe('ProjectContextImpl', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
    vi.restoreAllMocks()
  })

  describe('constructor', () => {
    it('should initialize with default values', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }

      const context = new ProjectContextImpl(argv)

      expect(context.targetDir).toBe('')
      expect(context.packageName).toBe('')
      expect(context.template).toBe('minimal')
      expect(context.initGit).toBe(false)
      expect(context.shouldInstall).toBe(false)
      expect(context.shouldStart).toBe(false)
      expect(context.registry).toBeUndefined()
      expect(context.overwrite).toBe('no')
    })

    it('should parse targetDir from argv', () => {
      const argv: CliArgs = {
        _: ['my-project'],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }

      const context = new ProjectContextImpl(argv)

      expect(context.targetDir).toBe('my-project')
    })

    it('should use template from argv if valid', () => {
      const argv: CliArgs = {
        _: [],
        template: 'preact',
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }

      const context = new ProjectContextImpl(argv)

      expect(context.template).toBe('preact')
    })

    it('should default to minimal for invalid template', () => {
      const argv: CliArgs = {
        _: [],
        template: 'invalid' as any,
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }

      const context = new ProjectContextImpl(argv)

      expect(context.template).toBe('minimal')
    })

    it('should set initGit from argv', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: true,
        install: false,
      }

      const context = new ProjectContextImpl(argv)

      expect(context.initGit).toBe(true)
    })

    it('should set shouldInstall from argv.install', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: true,
      }

      const context = new ProjectContextImpl(argv)

      expect(context.shouldInstall).toBe(true)
    })

    it('should set shouldInstall from argv.immediate', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: true,
        git: false,
        install: false,
      }

      const context = new ProjectContextImpl(argv)

      expect(context.shouldInstall).toBe(true)
      expect(context.shouldStart).toBe(true)
    })
  })

  describe('setters', () => {
    it('should set targetDir', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }
      const context = new ProjectContextImpl(argv)

      context.setTargetDir('new-project')

      expect(context.targetDir).toBe('new-project')
    })

    it('should set packageName', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }
      const context = new ProjectContextImpl(argv)

      context.setPackageName('my-package')

      expect(context.packageName).toBe('my-package')
    })

    it('should set template', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }
      const context = new ProjectContextImpl(argv)

      context.setTemplate('preact')

      expect(context.template).toBe('preact')
    })

    it('should set initGit', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }
      const context = new ProjectContextImpl(argv)

      context.setInitGit(true)

      expect(context.initGit).toBe(true)
    })

    it('should set shouldInstall', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }
      const context = new ProjectContextImpl(argv)

      context.setShouldInstall(true)

      expect(context.shouldInstall).toBe(true)
    })

    it('should set shouldStart', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }
      const context = new ProjectContextImpl(argv)

      context.setShouldStart(true)

      expect(context.shouldStart).toBe(true)
    })

    it('should set registry', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }
      const context = new ProjectContextImpl(argv)

      context.setRegistry('https://registry.example.com')

      expect(context.registry).toBe('https://registry.example.com')
    })

    it('should set overwrite', () => {
      const argv: CliArgs = {
        _: [],
        help: false,
        overwrite: false,
        immediate: false,
        git: false,
        install: false,
      }
      const context = new ProjectContextImpl(argv)

      context.setOverwrite('yes')

      expect(context.overwrite).toBe('yes')
    })
  })

  describe('getArgv', () => {
    it('should return the original argv', () => {
      const argv: CliArgs = {
        _: ['test-project'],
        template: 'preact',
        help: false,
        overwrite: false,
        immediate: false,
        git: true,
        install: false,
      }
      const context = new ProjectContextImpl(argv)

      expect(context.getArgv()).toBe(argv)
    })
  })
})
