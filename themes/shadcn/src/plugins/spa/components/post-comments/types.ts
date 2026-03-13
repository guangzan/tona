export interface CommentItem {
  id: number
  author: string
  authorUrl: string
  avatar?: string
  date: string
  content: string
  floor: string
  isOwner: boolean
  supportCount: string
  opposeCount: string
  replyTo?: {
    id: string
    author: string
  }
  replyToId: string
}

export interface CommentPaginationItem {
  type: 'link' | 'text' | 'current'
  text: string
  href?: string
  pageNumber?: number
  pageSize?: number
}
