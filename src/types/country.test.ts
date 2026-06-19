import { describe, it, expect } from 'vitest'

import { CountrySchema, CountrySlimSchema } from './country'

const countrySlim = {
  id: 1,
  slug: 'united-kingdom',
  name: 'United Kingdom',
  countryCode: 'GB',
  eventCount: 42,
  path: '/countries/united-kingdom',
}

const country = {
  ...countrySlim,
  bounds: [-8.65, 49.86, 1.76, 60.86],
  children: [
    {
      id: 10,
      slug: 'cambridgeshire',
      level: 'region',
      name: 'Cambridgeshire',
      subtitle: null,
      eventCount: 5,
      path: '/regions/cambridgeshire',
    },
  ],
}

describe('CountrySlimSchema', () => {
  it('parses a country list entry', () => {
    expect(CountrySlimSchema.parse(countrySlim).countryCode).toBe('GB')
  })

  it('rejects a non-numeric eventCount', () => {
    expect(() => CountrySlimSchema.parse({ ...countrySlim, eventCount: 'many' })).toThrow()
  })
})

describe('CountrySchema', () => {
  it('parses a country with bounds and children', () => {
    expect(CountrySchema.parse(country).children).toHaveLength(1)
  })

  it('rejects a bounds tuple of the wrong length', () => {
    expect(() => CountrySchema.parse({ ...country, bounds: [0, 0, 0] })).toThrow()
  })

  it('allows null bounds when a country has no located events', () => {
    expect(CountrySchema.parse({ ...country, bounds: null }).bounds).toBeNull()
  })
})
