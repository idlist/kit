import { assert, describe, it } from 'vitest'
import { isNullish, exists } from '@/type-gym.js'

describe('isNullish', () => {
  it('not nullish', () => {
    assert.isFalse(isNullish(0))
  })

  it('undefined', () => {
    assert.isTrue(isNullish(undefined))
  })

  it('null', () => {
    assert.isTrue(isNullish(null))
  })
})

describe('exists', () => {
  it('not nullish', () => {
    assert.isTrue(exists(0))
  })

  it('undefined', () => {
    assert.isFalse(exists(undefined))
  })

  it('null', () => {
    assert.isFalse(exists(null))
  })
})
