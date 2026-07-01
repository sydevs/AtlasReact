import { describe, it, expect } from 'vitest'

import { RegionDocSchema, RegionListItemSchema, RegionSchema } from './region'

import { mockEventSlimList } from '@/mocks/events'

const regionDoc = {
  id: 28,
  slug: 'belgium',
  level: 'country',
  name: 'Belgium',
  mapboxId: 'dXJuOm1ieHBsYzpJaFU',
  breadcrumbs: [{ doc: { id: 28, slug: 'belgium', level: 'country' }, label: 'Belgium' }],
  legacyData: { countryCode: 'BE' },
}

const listItem = {
  id: 9,
  slug: 'antwerpen',
  level: 'city',
  name: 'Antwerpen',
  subtitle: null,
  eventCount: 2,
  path: '/belgium/flanders/antwerpen',
}

// A country: `subregions` populated, `events` empty.
const country = {
  id: 28,
  slug: 'belgium',
  name: 'Belgium',
  level: 'country',
  countryCode: 'BE',
  eventCount: 5,
  bounds: [3, 50, 5, 52],
  center: [4, 51],
  path: '/belgium',
  parentPath: undefined,
  subregions: [listItem],
  events: [],
}

// A center (venue): `events` populated, derived center point.
const venue = {
  id: 13,
  slug: 'town-hall',
  name: 'Town Hall',
  level: 'center',
  eventCount: mockEventSlimList.length,
  bounds: [4.35, 50.85, 4.35, 50.85],
  center: [4.35, 50.85],
  path: '/belgium/flanders/antwerpen/town-hall',
  parentPath: '/belgium/flanders/antwerpen',
  subregions: [],
  events: mockEventSlimList,
}

describe('RegionDocSchema', () => {
  it('parses a raw region read with populated breadcrumb slugs + ISO code', () => {
    const parsed = RegionDocSchema.parse(regionDoc)

    expect(parsed.level).toBe('country')
    expect(parsed.legacyData?.countryCode).toBe('BE')
    const doc = parsed.breadcrumbs?.[0].doc

    expect(typeof doc === 'object' && doc?.slug).toBe('belgium')
  })

  it('accepts a bare numeric breadcrumb doc (the feed depth)', () => {
    const parsed = RegionDocSchema.parse({ ...regionDoc, breadcrumbs: [{ doc: 28 }] })

    expect(parsed.breadcrumbs?.[0].doc).toBe(28)
  })

  it('rejects an unknown level', () => {
    expect(() => RegionDocSchema.parse({ ...regionDoc, level: 'planet' })).toThrow()
  })
})

describe('RegionListItemSchema', () => {
  it('parses a child list item with its nested path', () => {
    expect(RegionListItemSchema.parse(listItem).path).toBe('/belgium/flanders/antwerpen')
  })

  it('carries a countryCode for the home country list', () => {
    const parsed = RegionListItemSchema.parse({ ...listItem, level: 'country', countryCode: 'GB' })

    expect(parsed.countryCode).toBe('GB')
  })

  it('rejects a non-numeric eventCount', () => {
    expect(() => RegionListItemSchema.parse({ ...listItem, eventCount: 'many' })).toThrow()
  })
})

describe('RegionSchema', () => {
  it('parses a country: subregions populated, events empty', () => {
    const parsed = RegionSchema.parse(country)

    expect(parsed.level).toBe('country')
    expect(parsed.subregions).toHaveLength(1)
    expect(parsed.events).toHaveLength(0)
    expect(parsed.countryCode).toBe('BE')
  })

  it('parses a center (venue) with a derived center point and events', () => {
    const parsed = RegionSchema.parse(venue)

    expect(parsed.center).toEqual([4.35, 50.85])
    expect(parsed.events).toHaveLength(mockEventSlimList.length)
  })

  it('allows null bounds and null center', () => {
    const parsed = RegionSchema.parse({ ...country, bounds: null, center: null })

    expect(parsed.bounds).toBeNull()
    expect(parsed.center).toBeNull()
  })

  it('rejects a bounds tuple of the wrong length', () => {
    expect(() => RegionSchema.parse({ ...country, bounds: [0, 0, 0] })).toThrow()
  })
})
