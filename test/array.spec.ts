import { assert, describe, it } from 'vitest'
import { arrayize, createArray, range } from '@/array.js'

describe('createArray', () => {
  it('empty', () => {
    assert.deepEqual(createArray(2), [undefined, undefined])
  })

  it('initial value', () => {
    assert.deepEqual(createArray(2, 1), [1, 1])
  })
})

describe('range', () => {
  it('empty', () => {
    assert.deepEqual(range(0), [])
  })

  it('non-empty', () => {
    assert.deepEqual(range(3), [0, 1, 2])
  })
})

describe('arrayize', () => {
  it('undefined', () => {
    assert.deepEqual(arrayize(), [])
  })

  it('null', () => {
    assert.deepEqual(arrayize(null), [])
  })

  it('not an array', () => {
    assert.deepEqual(arrayize(1), [1])
  })

  it('array', () => {
    assert.deepEqual(arrayize([1]), [1])
  })
})
