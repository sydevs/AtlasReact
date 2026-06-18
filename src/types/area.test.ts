import { describe, it, expect } from 'vitest'

import { AreaSchema, AreaSlimSchema } from './area'

import { mockEventSlimList } from '@/mocks/events'

const area = {
  id: 100,
  path: '/areas/cambridge',
  label: 'Cambridge',
  subtitle: 'East of England',
  url: 'https://atlas.example/areas/cambridge',
  parentPath: '/regions/cam',
  events: mockEventSlimList,
  latitude: 52.2053,
  longitude: 0.1218,
  radius: 5000,
}

describe('AreaSchema', () => {
  it('parses an area with its embedded slim events', () => {
    const parsed = AreaSchema.parse(area)

    expect(parsed.events).toHaveLength(mockEventSlimList.length)
  })

  it('rejects a non-numeric radius', () => {
    expect(() => AreaSchema.parse({ ...area, radius: 'wide' })).toThrow()
  })
})

describe('AreaSlimSchema', () => {
  it('parses a slim area with an event count', () => {
    const parsed = AreaSlimSchema.parse({
      id: 100,
      path: '/areas/cambridge',
      label: 'Cambridge',
      eventCount: 3,
    })

    expect(parsed.eventCount).toBe(3)
  })
})
