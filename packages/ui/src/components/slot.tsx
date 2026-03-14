import type { ComponentChildren, Ref } from 'preact'
import { cloneElement, forwardRef, isValidElement } from 'preact/compat'

/**
 * Slot 组件用于将 props 传递给子组件，类似于 Radix UI 的 Slot 组件
 * 它允许父组件将 props 传递给子组件，而子组件可以决定如何处理这些 props
 */
export interface SlotProps {
  children?: ComponentChildren
  className?: string
  style?: any
  onClick?: (event: Event) => void
  [key: string]: any
}

/**
 * Slot 组件实现
 * 当作为子组件时，会将父组件的 props 合并到子组件上
 * 当作为普通元素时，会渲染为 div 元素
 */
export const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, forwardedRef) => {
    if (isValidElement(children)) {
      return cloneElement(
        children as any,
        {
          ...mergeProps(props, (children as any).props),
          ref: forwardedRef
            ? composeRefs(forwardedRef, (children as any).ref)
            : (children as any).ref,
        } as any,
      )
    }

    return (
      <div {...props} ref={forwardedRef as Ref<HTMLDivElement>}>
        {children}
      </div>
    )
  },
)

Slot.displayName = 'Slot'

/**
 * 合并 props，子组件的 props 优先级更高
 */
function mergeProps(parentProps: any, childProps: any) {
  const overrideProps = { ...childProps }

  for (const propName in childProps) {
    const parentPropValue = parentProps[propName]
    const childPropValue = childProps[propName]

    const isHandler = /^on[A-Z]/.test(propName)
    if (isHandler) {
      // 对于事件处理器，需要同时调用父组件和子组件的处理器
      if (childPropValue && parentPropValue) {
        overrideProps[propName] = (...args: any[]) => {
          childPropValue(...args)
          parentPropValue(...args)
        }
      } else if (parentPropValue) {
        overrideProps[propName] = parentPropValue
      }
    } else if (propName === 'style') {
      // 对于 style，需要合并对象
      overrideProps[propName] = { ...parentPropValue, ...childPropValue }
    } else if (propName === 'className') {
      // 对于 className，需要合并字符串
      overrideProps[propName] = [parentPropValue, childPropValue]
        .filter(Boolean)
        .join(' ')
    }
  }

  return { ...parentProps, ...overrideProps }
}

/**
 * 组合多个 ref
 */
function composeRefs<T>(...refs: (Ref<T> | undefined)[]): Ref<T> {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref != null) {
        ;(ref as any).current = node
      }
    })
  }
}
