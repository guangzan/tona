export interface SocialLinkItem {
  name: 'github' | 'x' | 'twitter' | 'weibo' | 'zhihu' | 'rss' | 'website'
  href: string
}

export interface ProfileData {
  avatar: string
  nickname: string
  bio: string
  socials: SocialLinkItem[]
}
