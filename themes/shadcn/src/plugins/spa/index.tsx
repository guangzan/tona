import { render } from 'preact'
import { AppRoot } from './components/app-root'

export function spa() {
  const frag = document.createDocumentFragment()
  render(<AppRoot />, frag)
  document.body.prepend(frag)
}
