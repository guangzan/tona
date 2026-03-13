import {
  Edit3,
  Home,
  type LucideIcon,
  MessageCircle,
  RssIcon,
  Settings,
  User,
} from 'lucide-preact'
import { useQueryDOM } from 'tona-hooks'
import { isOwner } from 'tona-utils'

interface NavItem {
  id: string
  text: string
  icon: LucideIcon | undefined
  onClick: () => void
}

const iconMap = {
  博客园: Home,
  我的主页: User,
  新随笔: Edit3,
  联系: MessageCircle,
  订阅: RssIcon,
  管理: Settings,
}

export function useNavItems() {
  return useQueryDOM({
    selector: '#navList',
    queryFn: (el) => {
      const navItems: NavItem[] = []

      if (!el) {
        return navItems
      }

      const navLinks = el.querySelectorAll('li a.menu')

      for (const link of navLinks) {
        let text = link.textContent?.trim() || ''
        if (text === '首页') {
          text = '我的主页'
        }

        const id = link.id || ''
        const href = link.getAttribute('href')

        // if (isOwner() && (text === '订阅' || text === '联系')) {
        //   continue
        // }

        if (!isOwner() && (text === '管理' || text === '新随笔')) {
          continue
        }

        navItems.push({
          id,
          text,
          icon: iconMap[text as keyof typeof iconMap],
          onClick: () => {
            if (href) {
              const target = text === '我的主页' ? '_self' : '_blank'
              window.open(href, target)
              return
            }
            if (text === '订阅') {
              $('#blog_nav_rss').trigger('click')
            }
          },
        })
      }

      return navItems
    },
  })
}

export function useBlogTitle() {
  return useQueryDOM({
    selector: '#blogTitle h1 a',
    queryFn: (el) => el?.textContent || '',
  })
}
