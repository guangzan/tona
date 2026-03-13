import { getCurrentPage } from 'tona-utils'

export function checkCommentPaginationShouldVisible() {
  const current = getCurrentPage()
  return ['post'].includes(current)
}
