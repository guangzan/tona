import fs from 'node:fs'
// eslint-disable-next-line antfu/no-import-dist
import { data } from './dist/index.mjs'

fs.writeFileSync('dist/themes.json', JSON.stringify(data))
fs.unlinkSync('./dist/index.mjs')
