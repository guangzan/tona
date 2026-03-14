import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test'
import {
  copy,
  copyDir,
  emptyDir,
  formatTargetDir,
  isEmpty,
} from '../../src/utils/fs.js'

describe('formatTargetDir', () => {
  it('should trim whitespace', () => {
    expect(formatTargetDir('  my-project  ')).toBe('my-project')
  })

  it('should remove trailing slashes', () => {
    expect(formatTargetDir('my-project/')).toBe('my-project')
    expect(formatTargetDir('my-project//')).toBe('my-project')
  })

  it('should trim and remove trailing slashes', () => {
    expect(formatTargetDir('  my-project/  ')).toBe('my-project')
  })
})

describe('fs operations', () => {
  let tempDir: string

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'create-tona-test-'))
  })

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true })
  })

  describe('isEmpty', () => {
    it('should return true for empty directory', () => {
      expect(isEmpty(tempDir)).toBe(true)
    })

    it('should return true for directory with only .git', () => {
      fs.mkdirSync(path.join(tempDir, '.git'))
      expect(isEmpty(tempDir)).toBe(true)
    })

    it('should return false for non-empty directory', () => {
      fs.writeFileSync(path.join(tempDir, 'file.txt'), 'content')
      expect(isEmpty(tempDir)).toBe(false)
    })
  })

  describe('emptyDir', () => {
    it('should remove all files except .git', () => {
      fs.writeFileSync(path.join(tempDir, 'file1.txt'), 'content')
      fs.writeFileSync(path.join(tempDir, 'file2.txt'), 'content')
      fs.mkdirSync(path.join(tempDir, '.git'))
      fs.writeFileSync(path.join(tempDir, '.git', 'config'), 'git config')

      emptyDir(tempDir)

      expect(fs.existsSync(path.join(tempDir, 'file1.txt'))).toBe(false)
      expect(fs.existsSync(path.join(tempDir, 'file2.txt'))).toBe(false)
      expect(fs.existsSync(path.join(tempDir, '.git'))).toBe(true)
      expect(fs.existsSync(path.join(tempDir, '.git', 'config'))).toBe(true)
    })

    it('should not throw if directory does not exist', () => {
      const nonExistentDir = path.join(tempDir, 'non-existent')
      expect(() => emptyDir(nonExistentDir)).not.toThrow()
    })
  })

  describe('copy', () => {
    it('should copy a file', () => {
      const srcFile = path.join(tempDir, 'source.txt')
      const destFile = path.join(tempDir, 'dest.txt')
      fs.writeFileSync(srcFile, 'hello world')

      copy(srcFile, destFile)

      expect(fs.readFileSync(destFile, 'utf-8')).toBe('hello world')
    })

    it('should copy a directory recursively', () => {
      const srcDir = path.join(tempDir, 'source')
      const destDir = path.join(tempDir, 'dest')
      fs.mkdirSync(srcDir)
      fs.writeFileSync(path.join(srcDir, 'file.txt'), 'content')
      fs.mkdirSync(path.join(srcDir, 'subdir'))
      fs.writeFileSync(path.join(srcDir, 'subdir', 'nested.txt'), 'nested')

      copy(srcDir, destDir)

      expect(fs.existsSync(path.join(destDir, 'file.txt'))).toBe(true)
      expect(fs.readFileSync(path.join(destDir, 'file.txt'), 'utf-8')).toBe(
        'content',
      )
      expect(fs.existsSync(path.join(destDir, 'subdir', 'nested.txt'))).toBe(
        true,
      )
    })
  })

  describe('copyDir', () => {
    it('should copy directory contents', () => {
      const srcDir = path.join(tempDir, 'source')
      const destDir = path.join(tempDir, 'dest')
      fs.mkdirSync(srcDir)
      fs.writeFileSync(path.join(srcDir, 'a.txt'), 'a')
      fs.writeFileSync(path.join(srcDir, 'b.txt'), 'b')

      copyDir(srcDir, destDir)

      expect(fs.existsSync(path.join(destDir, 'a.txt'))).toBe(true)
      expect(fs.existsSync(path.join(destDir, 'b.txt'))).toBe(true)
    })
  })
})
