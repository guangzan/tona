import { useQueryDOM } from 'tona-hooks'
import type { ProfileData, SocialLinkItem } from './types'

function extractSocials(root: Element | null): SocialLinkItem[] {
  if (!root) return []
  const links: SocialLinkItem[] = []

  const append = (name: SocialLinkItem['name'], href?: string | null) => {
    if (href && href !== '#' && href.trim()) links.push({ name, href })
  }

  const github = root.querySelector<HTMLAnchorElement>('a[href*="github.com/"]')
  const twitter = root.querySelector<HTMLAnchorElement>(
    'a[href*="twitter.com/"]',
  )
  const x = root.querySelector<HTMLAnchorElement>('a[href*="x.com/"]')
  const weibo = root.querySelector<HTMLAnchorElement>('a[href*="weibo.com/"]')
  const zhihu = root.querySelector<HTMLAnchorElement>('a[href*="zhihu.com/"]')
  const website = root.querySelector<HTMLAnchorElement>('#blogTitle h1 a')
  const rss = root.querySelector<HTMLAnchorElement>('a#blog_nav_rss')

  append('github', github?.href || null)
  append('twitter', twitter?.href || null)
  append('x', x?.href || null)
  append('weibo', weibo?.href || null)
  append('zhihu', zhihu?.href || null)
  append('rss', rss?.href || null)
  append('website', website?.href || null)

  return links
}

export function useProfileData() {
  return useQueryDOM<ProfileData>({
    selector: '#home',
    queryFn: (el) => {
      const header = el?.querySelector('#header') ?? null
      const nickname = header
        ?.querySelector<HTMLAnchorElement>('#blogTitle h1 a')
        ?.textContent?.trim()
      const bio = header
        ?.querySelector<HTMLHeadingElement>('#blogTitle h2')
        ?.textContent?.trim()

      // 优先取顶部用户头像，否则取侧边栏或默认
      const avatarEl = document.querySelector<HTMLImageElement>('#user_icon')
      const sidebarAvatar = el?.querySelector<HTMLImageElement>(
        '#sidebar_news #user_icon, #profile_block img',
      )

      const avatar =
        avatarEl?.src || sidebarAvatar?.src || '/images/default-avatar.png'

      const socials = extractSocials(el || null)

      const data: ProfileData = {
        avatar,
        nickname: nickname || '博主',
        bio: bio || '热爱技术与分享。',
        socials,
      }

      return data
    },
  })
}
