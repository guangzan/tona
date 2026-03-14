/** biome-ignore-all lint/suspicious/noArrayIndexKey: x */
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type HexagonBackgroundProps = React.ComponentProps<'div'> & {
  hexagonProps?: React.ComponentProps<'div'>
  hexagonSize?: number // value greater than 50
  hexagonMargin?: number
}

function HexagonBackground({
  className,
  children,
  hexagonProps,
  hexagonSize = 75,
  hexagonMargin = 3,
  ...props
}: HexagonBackgroundProps) {
  const hexagonWidth = hexagonSize
  const hexagonHeight = hexagonSize * 1.1
  const rowSpacing = hexagonSize * 0.8
  const baseMarginTop = -36 - 0.275 * (hexagonSize - 100)
  const computedMarginTop = baseMarginTop + hexagonMargin
  const oddRowMarginLeft = -(hexagonSize / 2)
  const evenRowMarginLeft = hexagonMargin / 2

  const [gridDimensions, setGridDimensions] = React.useState({
    rows: 0,
    columns: 0,
  })

  const updateGridDimensions = React.useCallback(() => {
    const rows = Math.ceil(window.innerHeight / rowSpacing)
    const columns = Math.ceil(window.innerWidth / hexagonWidth) + 1
    setGridDimensions({ rows, columns })
  }, [rowSpacing, hexagonWidth])

  React.useEffect(() => {
    updateGridDimensions()
    window.addEventListener('resize', updateGridDimensions)
    return () => window.removeEventListener('resize', updateGridDimensions)
  }, [updateGridDimensions])

  return (
    <div
      data-slot="hexagon-background"
      className={cn(
        'relative size-full overflow-hidden bg-neutral-100 dark:bg-neutral-900',
        className,
      )}
      {...props}
    >
      <style>{`:root { --hexagon-margin: ${hexagonMargin}px; }`}</style>
      <div className="-left-0 absolute top-0 size-full overflow-hidden">
        {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            style={{
              marginTop: computedMarginTop,
              marginLeft:
                ((rowIndex + 1) % 2 === 0
                  ? evenRowMarginLeft
                  : oddRowMarginLeft) - 10,
            }}
            className="inline-flex"
          >
            {Array.from({ length: gridDimensions.columns }).map(
              (_, colIndex) => (
                <div
                  key={`hexagon-${rowIndex}-${colIndex}`}
                  {...hexagonProps}
                  style={{
                    width: hexagonWidth,
                    height: hexagonHeight,
                    marginLeft: hexagonMargin,
                    ...(hexagonProps?.style as React.CSSProperties),
                  }}
                  className={cn(
                    'relative',
                    '[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                    "before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-white before:opacity-100 before:transition-all before:duration-1000 before:content-[''] dark:before:bg-neutral-950",
                    "after:absolute after:inset-[var(--hexagon-margin)] after:bg-white after:content-[''] dark:after:bg-neutral-950",
                    'after:[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                    'hover:after:bg-neutral-100 hover:after:opacity-100 hover:after:duration-0 hover:before:bg-neutral-200 hover:before:opacity-100 hover:before:duration-0 dark:hover:after:bg-neutral-900 dark:hover:before:bg-neutral-800',
                    hexagonProps?.className,
                  )}
                />
              ),
            )}
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}

export { HexagonBackground, type HexagonBackgroundProps }
