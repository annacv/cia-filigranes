import { onBeforeUnmount } from 'vue'

/**
 * The type returned by the {@link debounce} function. Basically is the function the
 * {@link debounce} receives but debounced and with a method `cancel()` to cancel pending timeouts.
 *
 * @param Params - The arguments type of the function.
 *
 * @public
 */
 interface DebouncedFunction<Params extends any[]> {
  (...args: Params): void
  cancel: () => void
}

/**
 * Debounce options for the strategies that the debounce would use.
 *
 * @public
 */
interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
}

const debounce = <Params extends any[]>(
  fn: (...args: Params) => void,
  debounceTimeInMs: number,
  { leading = false, trailing = true }: DebounceOptions = {},
): DebouncedFunction<Params> => {
  let timer: ReturnType<typeof setTimeout> | undefined
  const debouncedFn: DebouncedFunction<Params> = (...args) => {
    const isFirstLeadingCall = leading && !timer
    if (isFirstLeadingCall) {
      fn(...args)
    }
    const trailingFn = (): void => {
      timer = undefined
      if (!isFirstLeadingCall && trailing) {
        fn(...args)
      }
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => trailingFn(), debounceTimeInMs)
  }

  debouncedFn.cancel = () => {
    if (timer) {
      clearTimeout(timer)
    }
  }
  return debouncedFn
}

/**
 * Composable which wraps the function passed as parameter into a debounced function and returns it.
 * It also cancels the debounced function when component is unmounted.
 *
 * @param fn - Function to be debounced.
 * @param debounceTimeInMs - Time of debounce in ms.
 * @param debounceOptions - The options for the debounce strategy.
 * @returns Debounced function obtained from `fn` parameter.
 * @public
 */
export function useDebounce<Params extends any[]>(
  fn: (...args: Params) => void,
  debounceTimeInMs: number,
  debounceOptions: DebounceOptions = {},
) {
  const debouncedFn = debounce(fn, debounceTimeInMs, debounceOptions)

  onBeforeUnmount(() => {
    debouncedFn.cancel()
  })

  return debouncedFn
}
