import { describe, it, expect } from 'vitest'

import { CountrySchema, CountrySlimSchema } from './country'

const country = {
  id: 1,
  path: '/countries/gb',
  code: 'GB',
  label: 'United Kingdom',
  eventCount: 42,
  url: 'https://atlas.example/countries/gb',
  bounds: [-8.65, 49.86, 1.76, 60.86],
  children: [
    {
      id: 10,
      path: '/regions/cam',
      type: 'region',
      label: 'Cambridgeshire',
      subtitle: null,
      eventCount: 5,
    },
  ],
}

const countrySlim = {
  id: 1,
  path: '/countries/gb',
  code: 'GB',
  label: 'United Kingdom',
  eventCount: 42,
}

describe('CountrySlimSchema', () => {
  it('parses a country list entry', () => {
    const parsed = CountrySlimSchema.parse(countrySlim)

    expect(parsed.code).toBe('GB')
  })

  it('rejects a non-numeric eventCount', () => {
    expect(() => CountrySlimSchema.parse({ ...countrySlim, eventCount: 'many' })).toThrow()
  })
})

describe('CountrySchema', () => {
  it('parses a country with bounds and children', () => {
    const parsed = CountrySchema.parse(country)

    expect(parsed.children).toHaveLength(1)
  })

  it('rejects a bounds tuple of the wrong length', () => {
    expect(() => CountrySchema.parse({ ...country, bounds: [0, 0, 0] })).toThrow()
  })
})
