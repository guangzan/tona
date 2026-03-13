import { getCurrentPage } from 'tona-utils'
import { HomePage } from '../home-page'
import { PostPage } from '../post-page'

export function Page() {
  const currentPage = getCurrentPage()

  if (currentPage === 'home') {
    return <HomePage />
  }
  if (currentPage === 'post') {
    return <PostPage />
  }
  return null
}
