/**
 * `value === null || value === undefined` is too long.
 * @param value value.
 * @returns `true` if the value is nullish, otherwise `false`.
 */
export const isNullish = (value: unknown): value is null | undefined | void =>
  value === null || value === undefined
