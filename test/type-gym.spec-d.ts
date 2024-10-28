/* eslint-disable @typescript-eslint/no-explicit-any */

import { assertType, describe, it } from 'vitest'
import { isNullish, exists } from '@/type-gym.js'
import { noop } from '@/misc'

describe('isNullish', () => {
  it('usual use case', () => {
    const a: number | null = 0

    if (isNullish(a)) assertType<never>(a)
    if (!isNullish(a)) assertType<number>(a)
  })

  it('undefined', () => {
    const a: number | undefined = undefined

    if (isNullish(a)) assertType<undefined>(a)
  })

  it('null', () => {
    const a: number | null = null

    if (isNullish(a)) assertType<null>(a)
  })

  it('void', () => {
    const a: number | void = (() => { noop() })()

    if (isNullish(a)) assertType<void>(a)
  })

  it('any', () => {
    const a: any = undefined

    if (isNullish(a)) assertType<undefined | null | void>(a)
  })

  it('unknown', () => {
    const a: unknown = undefined

    if (isNullish(a)) assertType<undefined | null | void>(a)
  })
})

describe('exists', () => {
  it('usual use case', () => {
    const a: number | null = 0

    if (exists(a)) assertType<number>(a)
    if (!exists(a)) assertType<never>(a)
  })

  it('undefined', () => {
    const a: number | undefined = undefined

    if (exists(a)) assertType<never>(a)
  })

  it('null', () => {
    const a: number | null = null

    if (exists(a)) assertType<never>(a)
  })

  it('void', () => {
    const a: number | void = (() => { noop() })()

    if (exists(a)) assertType<never>(a)
  })

  it('any', () => {
    const a: any = 1

    if (exists(a)) assertType<{}>(a)
  })

  it('unknown', () => {
    const a: unknown = undefined

    if (exists(a)) assertType<{}>(a)
  })
})
