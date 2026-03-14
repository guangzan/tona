#!/usr/bin/env node

import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spinner } from '@clack/prompts'
import pc from 'picocolors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

async function build(): Promise<void> {
  const s = spinner()
  s.start(pc.blue('Building tona-themes...'))

  try {
    await execCommand('vp pack', rootDir)

    const indexPath = path.join(distDir, 'index.mjs')
    if (!fs.existsSync(indexPath)) {
      throw new Error('Build output not found: dist/index.mjs')
    }

    const { data } = await import(indexPath)
    const jsonPath = path.join(distDir, 'themes.json')
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2))

    fs.unlinkSync(indexPath)

    s.stop(pc.green('Build completed!'))
    console.log(pc.gray(`  Output: ${jsonPath}`))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    s.stop(pc.red(`Build failed: ${errorMessage}`))
    process.exit(1)
  }
}

function execCommand(command: string, cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = exec(command, {
      cwd,
      env: process.env,
    })

    child.stdout?.on('data', (data: string) => {
      process.stdout.write(data)
    })

    child.stderr?.on('data', (data: string) => {
      process.stderr.write(data)
    })

    child.on('close', (code: number | null) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Command failed with exit code: ${code ?? 'unknown'}`))
    })
  })
}

build()
