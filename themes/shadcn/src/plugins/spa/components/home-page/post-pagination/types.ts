export interface PaginationItem {
  type: 'link' | 'text' | 'current'
  text: string
  href?: string
}
