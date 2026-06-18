import { describe, it, expect } from 'vitest'

import { VenueSchema, VenueSlimSchema } from './venue'

import { mockEventSlimList } from '@/mocks/events'

const venue = {
  id: 8001,
  path: '/venues/town-hall',
  label: 'Town Hall',
  latitude: 52.2053,
  longitude: 0.1218,
  url: 'https://atlas.example/venues/town-hall',
  parentPath: '/areas/cambridge',
  events: mockEventSlimList,
}

describe('VenueSchema', () => {
  it('parses a venue with embedded slim events', () => {
    const parsed = VenueSchema.parse(venue)

    expect(parsed.events).toHaveLength(mockEventSlimList.length)
  })

  it('rejects a venue missing its coordinates', () => {
    expect(() => VenueSchema.parse({ ...venue, latitude: undefined })).toThrow()
  })
})

describe('VenueSlimSchema', () => {
  it('parses a slim venue with an event count', () => {
    const parsed = VenueSlimSchema.parse({
      id: 8001,
      path: '/venues/town-hall',
      label: 'Town Hall',
      latitude: 52.2053,
      longitude: 0.1218,
      eventCount: 4,
    })

    expect(parsed.eventCount).toBe(4)
  })
})
