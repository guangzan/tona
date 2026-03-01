import clsx from 'clsx'
import { memo, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface TocDataItem {
  depth: number
  title: string
  anchorId: string
  index: number
  $heading: HTMLHeadingElement
}

interface Props {
  heading: TocDataItem
  rootDepth: number
  isScrollOut: boolean
  range: number
  variant?: 'line' | 'title-line'
  onClick?: (i: number, $el: HTMLElement | null, anchorId: string) => void
}

const widthMap: Record<number, number> = {
  1: 72 - 6,
  2: 60 - 6,
  3: 48 - 6,
  4: 36 - 6,
  5: 24 - 6,
  6: 12 - 6,
}

export const TocItem = memo((props: Props) => {
  const {
    onClick,
    heading,
    isScrollOut,
    range,
    variant = 'line',
    rootDepth,
  } = props
  const { $heading, anchorId, depth, index, title } = heading
  const $ref = useRef<HTMLButtonElement>(null)
  const isTitleLine = variant === 'title-line'

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      onClick?.(index, $heading, anchorId)
    },
    [anchorId, onClick, index, $heading],
  )

  return (
    <button
      type='button'
      ref={$ref}
      data-index={index}
      className={cn(isTitleLine && 'relative flex w-full flex-col')}
      style={
        isTitleLine
          ? {
              paddingLeft: `${(depth - rootDepth) * 12}px`,
            }
          : {
              lineHeight: '1',
            }
      }
      data-depth={depth}
      onClick={handleClick}
      title={title}
    >
      {isTitleLine && (
        <span
          className={clsx(
            'w-full min-w-0 truncate text-left text-xs',
            range
              ? 'text-zinc-900 dark:text-zinc-300'
              : 'text-zinc-500 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-300',
          )}
        >
          {title}
        </span>
      )}
      <span
        style={{
          width: widthMap[depth],
        }}
        data-active={!!range}
        className={cn(
          'relative inline-block',
          'bg-zinc-100 duration-200',
          isScrollOut && 'bg-zinc-400/80',
          'dark:bg-zinc-800/80',
          isScrollOut && 'dark:bg-zinc-700',
          !!range && '!bg-zinc-400/50 dark:!bg-zinc-600',
          'overflow-hidden',
          isTitleLine
            ? `my-1 h-1 duration-200 ${range ? 'mb-3' : 'mb-0.5'} bg-transparent dark:bg-transparent`
            : 'hover:!bg-zinc-400 dark:hover:!bg-zinc-600 h-1',
        )}
      >
        <span
          className={cn(
            'absolute inset-y-0 left-0 z-[1] ml-[-12px] bg-zinc-800 dark:bg-zinc-400',
            range > 0 && 'duration-100 ease-linear',
          )}
          style={{
            width: `calc(${range * 100}% + 12px)`,
          }}
        />
      </span>
    </button>
  )
})
