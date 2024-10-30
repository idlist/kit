export interface AnimationFrame {
  /**
   * ID of the requested frame.
   */
  id: number
  /**
   * Timestamp of the requested frame, in milliseconds.
   */
  timestamp: number
}

/**
 * `requestAnimationFrame` promisified.
 *
 * @returns Information of the next frame.
 */
export const nextFrame = () => {
  return new Promise<AnimationFrame>((resolve) => {
    const id = requestAnimationFrame((timestamp) => {
      resolve({ id, timestamp })
    })
  })
}

/**
 * Shorthand for `cancelAnimationFrame`.
 */
export const cancelFrame = cancelAnimationFrame

/**
 * Create a handler for handling frames.
 *
 * Runs the first frame automatically.
 * To ensure things *actually* run after the first frame,
 * call `next()` once before those things.
 *
 * @returns Frame handling methods.
 */
export const createFrames = async () => {
  const first = await nextFrame()

  const next = async () => {
    return await nextFrame()
  }

  const loop = async function* () {
    yield await nextFrame()
  }

  return {
    /**
     * Information of the first frame.
     */
    first,
    /**
     * Step to the next frame.
     *
     * @returns Information of the next frame.
     */
    next,
    /**
     * An async generator for loop animations (use with `for await...of`).
     *
     * Yields the information each frame.
     */
    loop,
  }
}
