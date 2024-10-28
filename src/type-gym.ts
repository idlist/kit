/**
 * Detect `any`.
 */
export type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N

/**
 * `Extract<T, U>`, but convert `any` and `unknown` to `U`. Useful when `U` is primitive.
 */
// https://stackoverflow.com/questions/77870361
export type TypeGuard<T, U> = Extract<IfAny<T, U, T extends U ? T : (T & U)>, T>

/**
 * Narrowing the type if the value is nullish.
 *
 * Usually works with `if`. Not always work with `else`.
 *
 * @param value Value.
 * @returns `true` if the value is nullish, otherwise `false`.
 */
export const isNullish = <T>(value: T): value is TypeGuard<T, undefined | null | void> =>
  value === undefined || value === null

/**
 * Narrowing the type if the value is not nullish.
 *
 * Usually works with `if`. Not always work with `else`.
 *
 * @param value Value.
 * @returns `true` if the value is not nullish, otherwise `false`.
 */
export const exists = <T>(value: T): value is Extract<IfAny<T, {}, Extract<T, {}>>, T> =>
  value !== undefined && value !== null
