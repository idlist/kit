import { assert, assertType, describe, it } from 'vitest'
import { isNullish } from '@/misc.js'

describe('isNullish', () => {
  it('undefined', () => {
    const a: number | undefined = undefined
    assert.equal(isNullish(a), true)

    if (isNullish(a)) {
      assertType<undefined>(a)
    }
  })

  it('null', () => {
    const a: number | null = null
    assert.equal(isNullish(a), true)

    if (isNullish(a)) {
      assertType<null>(a)
    }
  })

  it('not nullish', () => {
    const a: number | null = 0
    assert.equal(isNullish(a), false)

    if (!isNullish(a)) {
      assertType<number>(a)
    }
  })
})
