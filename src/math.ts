/**
 * Limit the value to [`min`, `max`] (both inclusive).
 *
 * @param min
 * @param max
 * @param value
 * @returns
 */
export const clamp = (min: number, max: number, value: number) =>
  value <= min ? min : (value >= max ? max : value)

/**
 * Create a reusable `clamp`.
 *
 * @param min
 * @param max
 * @returns
 */
export const createClamp = (min: number, max: number) =>
  (value: number) => clamp(min, max, value)
