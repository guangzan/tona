import { describe, expect, it } from 'vite-plus/test'
import {
  BunStrategy,
  DenoStrategy,
  getPackageManagerStrategy,
  NpmStrategy,
  PnpmStrategy,
  YarnStrategy,
} from '../../src/strategies/package-manager.js'

describe('NpmStrategy', () => {
  const strategy = new NpmStrategy()

  describe('getInstallCommand', () => {
    it('should return npm install without registry', () => {
      expect(strategy.getInstallCommand()).toEqual(['npm', 'install'])
    })

    it('should include registry when provided', () => {
      expect(
        strategy.getInstallCommand('https://registry.example.com'),
      ).toEqual([
        'npm',
        'install',
        '--registry',
        'https://registry.example.com',
      ])
    })
  })

  describe('getRunCommand', () => {
    it('should return npm run script', () => {
      expect(strategy.getRunCommand('dev')).toEqual(['npm', 'run', 'dev'])
      expect(strategy.getRunCommand('build')).toEqual(['npm', 'run', 'build'])
    })
  })
})

describe('PnpmStrategy', () => {
  const strategy = new PnpmStrategy()

  describe('getInstallCommand', () => {
    it('should return pnpm install without registry', () => {
      expect(strategy.getInstallCommand()).toEqual(['pnpm', 'install'])
    })

    it('should include registry when provided', () => {
      expect(
        strategy.getInstallCommand('https://registry.example.com'),
      ).toEqual([
        'pnpm',
        'install',
        '--registry',
        'https://registry.example.com',
      ])
    })
  })

  describe('getRunCommand', () => {
    it('should return pnpm script directly', () => {
      expect(strategy.getRunCommand('dev')).toEqual(['pnpm', 'dev'])
      expect(strategy.getRunCommand('build')).toEqual(['pnpm', 'build'])
    })
  })
})

describe('YarnStrategy', () => {
  const strategy = new YarnStrategy()

  describe('getInstallCommand', () => {
    it('should return yarn without registry', () => {
      expect(strategy.getInstallCommand()).toEqual(['yarn'])
    })

    it('should include registry as flag when provided', () => {
      expect(
        strategy.getInstallCommand('https://registry.example.com'),
      ).toEqual(['yarn', '--registry', 'https://registry.example.com'])
    })
  })

  describe('getRunCommand', () => {
    it('should return yarn script', () => {
      expect(strategy.getRunCommand('dev')).toEqual(['yarn', 'dev'])
      expect(strategy.getRunCommand('build')).toEqual(['yarn', 'build'])
    })
  })
})

describe('BunStrategy', () => {
  const strategy = new BunStrategy()

  describe('getInstallCommand', () => {
    it('should return bun install without registry', () => {
      expect(strategy.getInstallCommand()).toEqual(['bun', 'install'])
    })

    it('should include registry when provided', () => {
      expect(
        strategy.getInstallCommand('https://registry.example.com'),
      ).toEqual([
        'bun',
        'install',
        '--registry',
        'https://registry.example.com',
      ])
    })
  })

  describe('getRunCommand', () => {
    it('should return bun script', () => {
      expect(strategy.getRunCommand('dev')).toEqual(['bun', 'dev'])
      expect(strategy.getRunCommand('build')).toEqual(['bun', 'build'])
    })
  })
})

describe('DenoStrategy', () => {
  const strategy = new DenoStrategy()

  describe('getInstallCommand', () => {
    it('should return deno install', () => {
      expect(strategy.getInstallCommand()).toEqual(['deno', 'install'])
    })

    it('should ignore registry', () => {
      expect(
        strategy.getInstallCommand('https://registry.example.com'),
      ).toEqual(['deno', 'install'])
    })
  })

  describe('getRunCommand', () => {
    it('should return deno task script', () => {
      expect(strategy.getRunCommand('dev')).toEqual(['deno', 'task', 'dev'])
      expect(strategy.getRunCommand('build')).toEqual(['deno', 'task', 'build'])
    })
  })
})

describe('getPackageManagerStrategy', () => {
  it('should return correct strategy for npm', () => {
    const strategy = getPackageManagerStrategy('npm')
    expect(strategy.getInstallCommand()).toEqual(['npm', 'install'])
  })

  it('should return correct strategy for pnpm', () => {
    const strategy = getPackageManagerStrategy('pnpm')
    expect(strategy.getInstallCommand()).toEqual(['pnpm', 'install'])
  })

  it('should return correct strategy for yarn', () => {
    const strategy = getPackageManagerStrategy('yarn')
    expect(strategy.getInstallCommand()).toEqual(['yarn'])
  })

  it('should return correct strategy for bun', () => {
    const strategy = getPackageManagerStrategy('bun')
    expect(strategy.getInstallCommand()).toEqual(['bun', 'install'])
  })

  it('should return correct strategy for deno', () => {
    const strategy = getPackageManagerStrategy('deno')
    expect(strategy.getInstallCommand()).toEqual(['deno', 'install'])
  })

  it('should default to npm for unknown package manager', () => {
    const strategy = getPackageManagerStrategy('unknown' as any)
    expect(strategy.getInstallCommand()).toEqual(['npm', 'install'])
  })
})
