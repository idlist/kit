import { noop } from './make-happy'

type MsGetter = number | (() => number)

const getMs = (ms?: MsGetter) => {
  switch (typeof ms) {
    case 'undefined':
      return 0
    case 'function':
      return ms()
    default:
      return ms
  }
}

/**
 * Cancellable `setTimeout`.
 *
 * @param callback Function to call when the timer elapses.
 * @param ms Time in milliseconds, or a function returning the time.
 * @returns The created timer.
 */
export const createTimeout = <T>(callback: () => T | PromiseLike<T>, ms?: MsGetter) => {
  let it: ReturnType<typeof setTimeout> | undefined

  const run = () => {
    if (it) cancel()

    return new Promise<T>((resolve) => {
      it = setTimeout(() => {
        void (async () => resolve(await callback()))()
      }, getMs(ms))
    })
  }

  const cancel = () => {
    clearTimeout(it)
    it = undefined
  }

  return {
    /**
     * The timer itself.
     */
    it,
    /**
     * Start the timer and run the callback when the timer elapses.
     *
     * @returns The return value of the callback.
     */
    run,
    /**
     * Cancel the timer.
     */
    cancel,
  }
}

/**
 * Reusable and cancellable delay.
 *
 * @param ms Time in milliseconds.
 * @returns The created delay.
 */
export const createDelay = (ms: number) => {
  const timeout = createTimeout(noop, ms)
  return timeout
}

/**
 * One-shot delay.
 *
 * @param ms Thme in milliseconds.
 */
export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

/**
 * Cancellable `setInterval`.
 *
 * @param callback Function to call when the timer elapses.
 * @param ms Time in milliseconds, or a function returning the time.
 * @returns The created timer.
 */
export const createInterval = <T>(callback: () => T | PromiseLike<T>, ms?: MsGetter) => {
  let it: ReturnType<typeof setInterval> | undefined

  const run = () => {
    if (it) cancel()
    it = setInterval(() => void callback(), getMs(ms))
  }

  const cancel = () => {
    clearInterval(it)
    it = undefined
  }

  return {
    /**
     * The timer itself.
     */
    it,
    /**
     * Start the timer and run the callback when the timer elapses.
     *
     * @returns The return value of the callback.
     */
    run,
    /**
     * Cancel the timer.
     */
    cancel,
  }
}
