import { useQueryDOM } from 'tona-hooks'
import type { PostItem } from './types'

function findNextElement(
  start: Element | null,
  selector: string,
): Element | null {
  let current = start?.nextElementSibling ?? null
  while (current) {
    if (current.matches(selector)) return current
    current = current.nextElementSibling
  }
  return null
}

export function usePostList() {
  return useQueryDOM({
    selector: '.forFlow',
    observe: true,
    queryFn: (el) => {
      const items: PostItem[] = []
      if (!el) return items

      const dayElements = el.querySelectorAll('.day')

      dayElements.forEach((dayEl) => {
        const dayTitleEl = dayEl.querySelector('.dayTitle a')
        const postTitleEls = dayEl.querySelectorAll(
          '.postTitle a.postTitle2',
        )

        postTitleEls.forEach((postTitleEl) => {
          const postTitleWrap = postTitleEl.closest('.postTitle')
          const postConEl = findNextElement(postTitleWrap, '.postCon')
          const postDescEl = findNextElement(postTitleWrap, '.postDesc')

          const date = dayTitleEl?.textContent?.trim() || ''
          const title = postTitleEl.textContent?.trim() || ''
          const href = postTitleEl.getAttribute('href') || '#'
          const description =
            postConEl
              ?.querySelector('.c_b_p_desc')
              ?.textContent?.replace(/阅读全文$/, '')
              .trim() || ''

          const postDescText = postDescEl?.textContent || ''
          const authorMatch = postDescText.match(/posted @ [^ ]+ [^ ]+ ([^ ]+)/)
          const postTimeMatch = postDescText.match(/posted @ ([^ ]+)/)
          const viewCountMatch = postDescText.match(/阅读\((\d+)\)/)
          const commentCountMatch = postDescText.match(/评论\((\d+)\)/)
          const diggCountMatch = postDescText.match(/推荐\((\d+)\)/)

          const editLinkEl = postDescEl?.querySelector(
            'a[href*="EditPosts"]',
          )
          const editHref = editLinkEl?.getAttribute('href') || '#'

          items.push({
            date,
            title,
            href,
            description,
            author: authorMatch?.[1] || '',
            postTime: postTimeMatch?.[1]?.replaceAll('-', '.') || '',
            viewCount: viewCountMatch?.[1] || '0',
            commentCount: commentCountMatch?.[1] || '0',
            diggCount: diggCountMatch?.[1] || '0',
            editHref,
          })
        })
      })

      return items
    },
  })
}
