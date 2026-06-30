import { describe, it, expect } from 'vitest'

import { RegionDocSchema, RegionSchema } from './region'

const regionDoc = {
  id: 28,
  slug: 'belgium',
  level: 'country',
  name: 'Belgium',
  mapboxId: 'dXJuOm1ieHBsYzpJaFU',
  breadcrumbs: [{ doc: 28, label: 'Belgium' }],
  legacyData: { countryCode: 'BE' },
}

const region = {
  id: 5,
  slug: 'flanders',
  name: 'Flanders',
  eventCount: 3,
  bounds: [3, 50, 5, 52],
  path: '/regions/flanders',
  parentPath: '/countries/belgium',
  areas: [
    {
      id: 9,
      slug: 'antwerpen',
      level: 'city',
      name: 'Antwerpen',
      subtitle: null,
      eventCount: 2,
      path: '/areas/antwerpen',
    },
  ],
}

describe('RegionDocSchema', () => {
  it('parses a raw region read and its ISO country code', () => {
    const parsed = RegionDocSchema.parse(regionDoc)

    expect(parsed.level).toBe('country')
    expect(parsed.legacyData?.countryCode).toBe('BE')
  })

  it('rejects an unknown level', () => {
    expect(() => RegionDocSchema.parse({ ...regionDoc, level: 'planet' })).toThrow()
  })
})

describe('RegionSchema', () => {
  it('parses a region view-model with its child areas', () => {
    expect(RegionSchema.parse(region).areas).toHaveLength(1)
  })

  it('allows null bounds', () => {
    expect(RegionSchema.parse({ ...region, bounds: null }).bounds).toBeNull()
  })
})
