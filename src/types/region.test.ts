import { describe, it, expect } from 'vitest'

import { RegionSchema, RegionSlimSchema } from './region'

const region = {
  id: 10,
  path: '/regions/cam',
  label: 'Cambridgeshire',
  eventCount: 5,
  url: 'https://atlas.example/regions/cam',
  parentPath: '/countries/gb',
  areas: [{ id: 100, path: '/areas/cambridge', label: 'Cambridge', subtitle: null, eventCount: 3 }],
  bounds: [-0.5, 52.0, 0.5, 52.5],
}

describe('RegionSchema', () => {
  it('parses a region with nested slim areas', () => {
    const parsed = RegionSchema.parse(region)

    expect(parsed.areas).toHaveLength(1)
  })

  it('rejects an area child missing its eventCount', () => {
    const bad = { ...region, areas: [{ id: 100, path: '/areas/cambridge', label: 'Cambridge' }] }

    expect(() => RegionSchema.parse(bad)).toThrow()
  })
})

describe('RegionSlimSchema', () => {
  it('parses a slim region (core fields only)', () => {
    const parsed = RegionSlimSchema.parse({
      id: 10,
      path: '/regions/cam',
      label: 'Cambridgeshire',
      eventCount: 5,
    })

    expect(parsed.id).toBe(10)
  })
})
