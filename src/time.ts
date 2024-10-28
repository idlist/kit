import { noop } from './misc'

/**
 * Cancellable `setTimeout`.
 *
 * @param callback Function to call when the timer elapses.
 * @param ms Time in milliseconds.
 * @returns The created timer.
 */
export const createTimeout = <T>(callback: () => T | PromiseLike<T>, ms: number = 0) => {
  let id: ReturnType<typeof setTimeout> | undefined
  const run = () => {
    return new Promise<T>((resolve) => {
      id = setTimeout(() => {
        void (async () => resolve(await callback()))()
      }, ms)
    })
  }
  const cancel = () => clearTimeout(id)

  return { id, run, cancel }
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
