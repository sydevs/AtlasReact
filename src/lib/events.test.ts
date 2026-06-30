import { describe, it, expect } from 'vitest'
import { DateTime } from 'luxon'

import { isSoon, formatTimeZone } from './events'

describe('isSoon', () => {
  it('is true for an online event within the next hour', () => {
    expect(isSoon(DateTime.now().plus({ minutes: 30 }), true)).toBe(true)
  })

  it('is false for an online event more than an hour away', () => {
    expect(isSoon(DateTime.now().plus({ hours: 2 }), true)).toBe(false)
  })

  it('is true for an in-person event within the next week', () => {
    expect(isSoon(DateTime.now().plus({ days: 3 }), false)).toBe(true)
  })

  it('is false for an in-person event more than a week away', () => {
    expect(isSoon(DateTime.now().plus({ weeks: 2 }), false)).toBe(false)
  })

  it('is false for a date in the past', () => {
    expect(isSoon(DateTime.now().minus({ minutes: 30 }), true)).toBe(false)
    expect(isSoon(DateTime.now().minus({ days: 1 }), false)).toBe(false)
  })
})

describe('formatTimeZone', () => {
  it('returns the UTC offset, abbreviation, and name for a zoned time', () => {
    const time = DateTime.fromISO('2026-07-04T09:30', { zone: 'Europe/London' })
    const { abbreviation, name, offset } = formatTimeZone(time)

    // July → British Summer Time, +1. The luxon `Z` offset is stable across ICU
    // builds; the localized abbreviation/name only need to be non-empty.
    expect(offset).toBe('+1')
    expect(abbreviation).not.toHaveLength(0)
    expect(name).not.toHaveLength(0)
  })
})
