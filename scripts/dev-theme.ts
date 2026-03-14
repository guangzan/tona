#!/usr/bin/env node

import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { cancel, isCancel, select, spinner } from '@clack/prompts'
import pc from 'picocolors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const themesDir = path.join(__dirname, '../themes')
const themes = fs
  .readdirSync(themesDir)
  .filter((file) => fs.statSync(path.join(themesDir, file)).isDirectory())

async function main(): Promise<void> {
  // 解析命令行参数，支持 --theme 参数或直接传入皮肤名
  let selectedTheme: string | null = null

  // 检查是否使用了 --theme 参数
  const themeIndex = process.argv.indexOf('--theme')
  if (themeIndex !== -1 && themeIndex + 1 < process.argv.length) {
    selectedTheme = process.argv[themeIndex + 1]
  } else if (process.argv[2] && !process.argv[2].startsWith('--')) {
    // 支持直接传入皮肤名作为位置参数
    selectedTheme = process.argv[2]
  }

  // 如果没有通过参数指定皮肤，则显示菜单供用户选择
  if (!selectedTheme) {
    const result = await showMenu()
    selectedTheme = result

    // 检查用户是否取消了选择
    if (isCancel(selectedTheme)) {
      cancel('操作已取消')
      process.exit(0)
    }
  }

  // 验证皮肤选择
  if (!selectedTheme || !themes.includes(selectedTheme)) {
    console.error(pc.red(`无效的皮肤选择: ${selectedTheme}`))
    console.log(pc.yellow('可用皮肤:'))
    themes.forEach((theme) => {
      console.log(pc.yellow(`  - ${theme}`))
    })
    process.exit(1)
  }

  // 启动选定皮肤
  await startTheme(selectedTheme)
}

main()

// 显示皮肤选择菜单
async function showMenu(): Promise<string | symbol> {
  console.log(pc.blue('请选择要启动的皮肤:'))

  const selected = await select({
    message: '请选择一个皮肤:',
    options: themes.map((theme) => ({
      value: theme,
      label: theme,
    })),
  })

  return selected
}

// 启动选定皮肤
async function startTheme(themeName: string): Promise<void> {
  const s = spinner()
  s.start(pc.blue(`正在启动皮肤: ${themeName}`))

  try {
    // 使用 vp 启动选定皮肤的 dev 脚本
    const child = exec(`vp dev`, {
      cwd: path.join(process.cwd(), 'themes', themeName),
      env: process.env,
    })

    let isReady = false

    child.stdout?.on('data', (data: string) => {
      // 检测 Vite+ 启动成功的标志
      if (
        !isReady &&
        (data.includes('ready in') || data.includes('Local:'))
      ) {
        isReady = true
        s.stop(pc.green(`皮肤 ${themeName} 启动成功!`))
      }

      // 始终显示 stdout 内容
      process.stdout.write(data)
    })

    child.stderr?.on('data', (data: string) => {
      // 始终显示 stderr 内容（错误信息）
      process.stderr.write(data)
    })

    child.on('close', (code: number | null) => {
      if (code !== 0 && !isReady) {
        s.stop(pc.red(`启动皮肤时出错，退出码: ${code}`))
        process.exit(1)
      }
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    s.stop(pc.red(`启动皮肤时出错: ${errorMessage}`))
    process.exit(1)
  }
}
