import { createTheme } from 'tona'
import './styles/globals.css'
import { codeCopyButton } from './plugins/code-copy-button'
import { smoothScroll } from './plugins/smooth-scroll'
import { spa } from './plugins/spa'

createTheme().use(spa).use(smoothScroll).use(codeCopyButton)
