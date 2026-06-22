import { describe, it, expect } from 'vitest'

import { AreaSchema } from './area'

import { mockEventSlimList } from '@/mocks/events'

const area = {
  id: 9,
  slug: 'antwerpen',
  name: 'Antwerpen',
  subtitle: 'Deurne',
  eventCount: mockEventSlimList.length,
  bounds: [4, 51, 5, 52],
  path: '/areas/antwerpen',
  parentPath: '/countries/belgium',
  events: mockEventSlimList,
}

describe('AreaSchema', () => {
  it('parses an area with its events', () => {
    expect(AreaSchema.parse(area).events).toHaveLength(mockEventSlimList.length)
  })

  it('allows null bounds and an absent parentPath', () => {
    const parsed = AreaSchema.parse({ ...area, bounds: null, parentPath: undefined })

    expect(parsed.bounds).toBeNull()
  })
})
