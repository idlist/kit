import { exists } from './type-gym'

/**
 * Create an array with predefined length.
 *
 * @param length Length.
 * @param initialValue Initial value of the elements in the array.
 * @returns The created array.
 */
export const createArray = <T = undefined>(length: number, initialValue?: T): T[] =>
  exists(initialValue) ? Array.from<T>({ length }).fill(initialValue) : Array.from<T>({ length })

/**
 * Create an range from `0` to `n - 1` using less code.
 *
 * @param n Length.
 * @returns Created array.
 */
export const range = (n: number) => [...createArray(n).keys()]

/**
 * Compomise with `a = Array.isArray(a) ? a : [a]` and make TypeScript happy.
 *
 * @param maybeArray
 */
export const arrayize = <T>(maybeArray?: T | T[] | null): T[] =>
  Array.isArray(maybeArray) ? maybeArray : (exists(maybeArray) ? [maybeArray] : [])
