import { useQueryDOM } from 'tona-hooks'
import type { PaginationItem } from './types'

export function usePaginationItems() {
  return useQueryDOM({
    selector: '.pager, #nav_next_page',
    queryFn: (el) => {
      const items: PaginationItem[] = []

      if (el) {
        // 处理 #nav_next_page 元素（第一页只有下一页按钮）
        if (el.id === 'nav_next_page') {
          const link = el.querySelector('a')
          if (link) {
            const text = link.textContent?.trim() || ''
            const href = link.getAttribute('href') || '#'

            items.push({
              type: 'link',
              text,
              href,
            })
          }
          return items
        }

        // 处理 .pager 元素（完整分页）
        const childNodes = el.childNodes

        for (let i = 0; i < childNodes.length; i++) {
          const node = childNodes[i]

          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element

            if (element.tagName === 'A') {
              const text = element.textContent?.trim() || ''
              const href = element.getAttribute('href') || '#'

              items.push({
                type: 'link',
                text,
                href,
              })
            } else if (element.tagName === 'SPAN') {
              const text = element.textContent?.trim() || ''
              const isCurrent = element.classList.contains('current')

              items.push({
                type: isCurrent ? 'current' : 'text',
                text,
              })
            }
          } else if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim() || ''

            if (text && !Number.isNaN(Number(text))) {
              items.push({
                type: 'current',
                text,
              })
            } else if (text) {
              items.push({
                type: 'text',
                text,
              })
            }
          }
        }
      }

      return items
    },
  })
}
