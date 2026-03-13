import { useQueryDOM } from 'tona-hooks'

const extractNumber = (text: string) => {
  const match = text.match(/\d+/)
  return match ? Number.parseInt(match[0], 10) : 0
}

export function useFollowers() {
  return useQueryDOM({
    selector: '#profile_block',
    observe: true,
    queryFn: (el) => {
      if (!el) {
        return null
      }

      const followerLink = el.querySelector('a:nth-of-type(3)')
      const followerText = followerLink?.textContent?.trim() || '0'

      return extractNumber(followerText)
    },
  })
}
