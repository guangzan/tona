import { useQueryDOM } from 'tona-hooks'
import type { CommentItem, CommentPaginationItem } from './types'

export function useComments() {
  return useQueryDOM({
    selector: '#blog-comments-placeholder',
    observe: true,
    ajaxUrl: '/ajax/comments-block',
    queryFn: (el) => {
      const comments: CommentItem[] = []

      if (el) {
        const commentElements = el.querySelectorAll('.feedbackItem')

        commentElements.forEach((commentEl) => {
          const id = Number(
            commentEl.querySelector('a[name]')?.getAttribute('name'),
          )
          const authorEl = commentEl.querySelector('a[id^="a_comment_author_"]')
          const author = authorEl?.textContent?.trim() || ''
          const authorUrl = authorEl?.getAttribute('href') || ''
          const date =
            commentEl.querySelector('.comment_date')?.textContent?.trim() || ''
          const floor =
            commentEl.querySelector('.layer')?.textContent?.trim() || ''
          const contentEl = commentEl.querySelector('.blog_comment_body')
          const content = contentEl?.innerHTML || ''
          const isOwner = commentEl.querySelector('.louzhu') !== null

          const supportEl = commentEl.querySelector('.comment_digg')
          const opposeEl = commentEl.querySelector('.comment_burry')
          const supportCount =
            supportEl?.textContent?.match(/\((\d+)\)/)?.[1] || '0'
          const opposeCount =
            opposeEl?.textContent?.match(/\((\d+)\)/)?.[1] || '0'

          const feedbackCon = commentEl.querySelector('.feedbackCon')
          const avatarEl = feedbackCon?.querySelector(`#comment_${id}_avatar`)
          const avatar = avatarEl?.textContent?.trim() || ''

          const replyLink = contentEl?.querySelector('a[href^="#"]')
          let replyTo: CommentItem['replyTo']

          if (replyLink && replyLink.textContent === '@') {
            const replyId =
              replyLink.getAttribute('href')?.replace('#', '') || ''
            const replyAuthor = replyLink.nextSibling?.textContent?.trim() || ''
            if (replyId && replyAuthor) {
              replyTo = {
                id: replyId,
                author: replyAuthor,
              }
            }
          }

          // 获取回复参数
          let replyToId = ''
          const replyButton = commentEl.querySelector(
            'a[onclick*="ReplyComment"]',
          )
          if (replyButton) {
            const onclickAttr = replyButton.getAttribute('onclick') || ''
            const match = onclickAttr.match(
              /ReplyComment\((\d+),\s*'([^']+)'\)/,
            )
            if (match?.[2]) {
              replyToId = match[2]
            }
          }

          if (id && author) {
            comments.push({
              id,
              author,
              authorUrl,
              avatar: avatar || undefined,
              date,
              content,
              floor,
              isOwner,
              supportCount,
              opposeCount,
              replyTo,
              replyToId,
            })
          }
        })
      }

      return comments
    },
  })
}

export function useCommentPaginationItems() {
  return useQueryDOM({
    selector: '#comment_pager_bottom .pager',
    observe: true,
    queryFn: (el) => {
      const items: CommentPaginationItem[] = []

      if (el) {
        const childNodes = el.childNodes

        for (let i = 0; i < childNodes.length; i++) {
          const node = childNodes[i]

          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element

            if (element.tagName === 'A') {
              const text = element.textContent?.trim() || ''
              const href = element.getAttribute('href') || '#'

              // 提取 onclick 事件中的参数
              const onclick = element.getAttribute('onclick') || ''
              let pageNumber = 1
              let pageSize = 50

              // 解析 commentManager.renderComments(pageNumber, pageSize) 格式
              const match = onclick.match(
                /commentManager\.renderComments\((\d+),\s*(\d+)\)/,
              )
              if (match) {
                pageNumber = parseInt(match[1], 10)
                pageSize = parseInt(match[2], 10)
              }

              items.push({
                type: 'link',
                text,
                href,
                pageNumber,
                pageSize,
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
