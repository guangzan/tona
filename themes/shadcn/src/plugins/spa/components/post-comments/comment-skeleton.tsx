import { Separator } from '../separator'

export function CommentSkeleton({ count }: { count: number }) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='h-6 w-20 animate-pulse rounded bg-muted' />
      </div>
      <div>
        {Array.from({ length: count }).map((i, index) => (
          <>
            <CommentSkeletonItem key={i} />
            {index < count - 1 && <Separator />}
          </>
        ))}
      </div>
    </div>
  )
}

function CommentSkeletonItem() {
  return (
    <article className='screen-line-before screen-line-after border-edge border-x p-4'>
      <div className='mb-3 flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          {/* 头像骨架 */}
          <div className='h-8 w-8 animate-pulse rounded-full bg-muted' />
          <div className='flex flex-col gap-2'>
            {/* 作者名骨架 */}
            <div className='h-4 w-24 animate-pulse rounded bg-muted' />
            {/* 日期和楼层骨架 */}
            <div className='flex items-center gap-2'>
              <div className='h-3 w-16 animate-pulse rounded bg-muted' />
              <div className='h-3 w-1 animate-pulse rounded bg-muted' />
              <div className='h-3 w-8 animate-pulse rounded bg-muted' />
            </div>
          </div>
        </div>
      </div>

      <div className='mb-4 space-y-3'>
        {/* 评论内容骨架 */}
        <div className='space-y-2'>
          <div className='h-4 w-full animate-pulse rounded bg-muted' />
          <div className='h-4 w-4/5 animate-pulse rounded bg-muted' />
          <div className='h-4 w-3/4 animate-pulse rounded bg-muted' />
        </div>
      </div>

      {/* 操作按钮骨架 */}
      <div className='flex items-center gap-2'>
        <div className='h-6 w-12 animate-pulse rounded bg-muted' />
        <div className='h-6 w-12 animate-pulse rounded bg-muted' />
        <div className='h-6 w-12 animate-pulse rounded bg-muted' />
        <div className='h-6 w-12 animate-pulse rounded bg-muted' />
        <div className='ml-auto flex items-center gap-2'>
          <div className='h-6 w-8 animate-pulse rounded bg-muted' />
          <div className='h-6 w-8 animate-pulse rounded bg-muted' />
        </div>
      </div>
    </article>
  )
}
