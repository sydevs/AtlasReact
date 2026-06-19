import { describe, it, expect } from 'vitest'

import { VenueSchema } from './venue'

import { mockEventSlimList } from '@/mocks/events'

const venue = {
  id: 13,
  slug: 'town-hall',
  name: 'Town Hall',
  eventCount: mockEventSlimList.length,
  center: [4.35, 50.85],
  path: '/venues/town-hall',
  parentPath: '/areas/antwerpen',
  events: mockEventSlimList,
}

describe('VenueSchema', () => {
  it('parses a venue with a derived center point and events', () => {
    const parsed = VenueSchema.parse(venue)

    expect(parsed.center).toEqual([4.35, 50.85])
    expect(parsed.events).toHaveLength(mockEventSlimList.length)
  })

  it('allows a null center when the venue has no located events', () => {
    expect(VenueSchema.parse({ ...venue, center: null }).center).toBeNull()
  })
})
