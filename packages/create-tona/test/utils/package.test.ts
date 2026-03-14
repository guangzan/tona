import { describe, expect, it } from 'vite-plus/test'
import {
  isValidPackageName,
  pkgFromUserAgent,
  toValidPackageName,
} from '../../src/utils/package.js'

describe('isValidPackageName', () => {
  it('should return true for valid package names', () => {
    expect(isValidPackageName('my-project')).toBe(true)
    expect(isValidPackageName('@scope/package')).toBe(true)
    expect(isValidPackageName('simple')).toBe(true)
    expect(isValidPackageName('with-dashes')).toBe(true)
    expect(isValidPackageName('with_underscores')).toBe(true)
    expect(isValidPackageName('@org/my-package')).toBe(true)
  })

  it('should return false for invalid package names', () => {
    expect(isValidPackageName('')).toBe(false)
    expect(isValidPackageName(' ')).toBe(false)
    expect(isValidPackageName('UPPERCASE')).toBe(false)
    expect(isValidPackageName('.hidden')).toBe(false)
    expect(isValidPackageName('_private')).toBe(false)
    expect(isValidPackageName('invalid space')).toBe(false)
  })
})

describe('toValidPackageName', () => {
  it('should convert to lowercase', () => {
    expect(toValidPackageName('MyProject')).toBe('myproject')
  })

  it('should replace spaces with dashes', () => {
    expect(toValidPackageName('my project')).toBe('my-project')
    expect(toValidPackageName('my  project')).toBe('my-project')
  })

  it('should remove leading dots and underscores', () => {
    expect(toValidPackageName('.hidden')).toBe('hidden')
    expect(toValidPackageName('_private')).toBe('private')
  })

  it('should replace invalid characters with dashes', () => {
    expect(toValidPackageName('my@project')).toBe('my-project')
    expect(toValidPackageName('my#project')).toBe('my-project')
    expect(toValidPackageName('my!project')).toBe('my-project')
  })

  it('should trim whitespace', () => {
    expect(toValidPackageName('  my-project  ')).toBe('my-project')
  })

  it('should handle complex cases', () => {
    expect(toValidPackageName('  My Project!  ')).toBe('my-project-')
    expect(toValidPackageName('.My_Project')).toBe('my-project')
  })
})

describe('pkgFromUserAgent', () => {
  it('should parse npm user agent', () => {
    const result = pkgFromUserAgent('npm/8.0.0 node/v16.0.0 darwin x64')
    expect(result).toEqual({ name: 'npm', version: '8.0.0' })
  })

  it('should parse pnpm user agent', () => {
    const result = pkgFromUserAgent('pnpm/7.0.0 node/v16.0.0 darwin x64')
    expect(result).toEqual({ name: 'pnpm', version: '7.0.0' })
  })

  it('should parse yarn user agent', () => {
    const result = pkgFromUserAgent('yarn/1.22.0 npm/? node/v16.0.0 darwin x64')
    expect(result).toEqual({ name: 'yarn', version: '1.22.0' })
  })

  it('should return undefined for empty string', () => {
    expect(pkgFromUserAgent('')).toBeUndefined()
  })

  it('should return undefined for undefined', () => {
    expect(pkgFromUserAgent(undefined)).toBeUndefined()
  })
})
