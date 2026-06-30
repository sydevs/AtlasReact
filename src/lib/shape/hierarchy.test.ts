import type { GeoEvent } from './hierarchy'

import { describe, it, expect } from 'vitest'

import { ancestorIdsFromBreadcrumbs, boundsUnder, countUnder, eventsUnder } from './hierarchy'

// Belgium(28) → Antwerpen(473) and Belgium(28) → Brussels(470) → venue(513).
const events: GeoEvent[] = [
  { point: [4.4, 51.2], ancestorIds: [28, 473] }, // event in Antwerpen
  { point: [4.35, 50.85], ancestorIds: [28, 470, 513] }, // event at the Brussels venue
  { point: null, ancestorIds: [28, 470] }, // online event under Brussels
]

describe('ancestorIdsFromBreadcrumbs', () => {
  it('extracts numeric doc ids in order', () => {
    expect(ancestorIdsFromBreadcrumbs([{ doc: 28 }, { doc: 470 }, { doc: 513 }])).toEqual([
      28, 470, 513,
    ])
  })

  it('handles populated doc objects and skips nulls', () => {
    expect(ancestorIdsFromBreadcrumbs([{ doc: { id: 28 } }, { doc: null }])).toEqual([28])
    expect(ancestorIdsFromBreadcrumbs(null)).toEqual([])
  })
})

describe('eventsUnder / countUnder', () => {
  it('counts every descendant event under a country', () => {
    expect(countUnder(events, 28)).toBe(3)
  })

  it('counts only the matching subtree under a city/venue', () => {
    expect(countUnder(events, 473)).toBe(1)
    expect(countUnder(events, 470)).toBe(2)
    expect(countUnder(events, 513)).toBe(1)
  })

  it('returns the matching events themselves', () => {
    expect(eventsUnder(events, 473)).toEqual([events[0]])
  })
})

describe('boundsUnder', () => {
  it('bounds only the located events, ignoring online ones', () => {
    expect(boundsUnder(events, 470)).toEqual([4.35, 50.85, 4.35, 50.85])
  })

  it('returns null when a region has no located events', () => {
    expect(boundsUnder([{ point: null, ancestorIds: [99] }], 99)).toBeNull()
  })
})
