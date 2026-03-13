import type { PropsWithChildren } from 'preact/compat'
import { checkShouldVisible } from './utils'

export function Visible({ children }: PropsWithChildren) {
  if (checkShouldVisible()) {
    return children
  }
  return null
}
