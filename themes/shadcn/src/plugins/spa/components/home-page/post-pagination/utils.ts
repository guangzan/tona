import { getCurrentPage } from 'tona-utils'

export function checkShouldVisible() {
  const current = getCurrentPage()
  return ['home'].includes(current)
}
