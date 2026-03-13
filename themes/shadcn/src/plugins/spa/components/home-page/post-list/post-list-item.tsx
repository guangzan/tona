import { Separator } from '../../../../../components/ui/separator'
import type { PostItem } from './types'

interface Props {
  item: PostItem
}

export function PostListItem({ item }: Props) {
  return (
    <a
      href={item.href}
      key={`${item.href}-${item.title}`}
      className='group border-edge border-b border-dashed px-4 py-4 last:border-b-0'
    >
      <div className='flex flex-col gap-2'>
        <h2 className='text-balance font-medium leading-snug underline-offset-4 group-hover:underline'>
          {item.title}
        </h2>
        <div className='flex h-3 items-center gap-4 text-muted-foreground text-sm'>
          <span>{item.postTime}</span>
          <Separator orientation='vertical' />
          <span className='flex items-center gap-1'>
            {item.viewCount}
            <span>&nbsp;浏览</span>
          </span>
          <Separator orientation='vertical' />
          <span className='flex items-center gap-1'>
            {item.commentCount}
            <span>&nbsp;评论</span>
          </span>
          <Separator orientation='vertical' />
          <span className='flex items-center gap-1'>
            {item.diggCount}
            <span>&nbsp;推荐</span>
          </span>
        </div>
      </div>
    </a>
  )
}
