import { describe, it, expect } from 'vitest'

import { eventPath, regionPath } from './path'

describe('regionPath', () => {
  it('routes each backend level to its widget route base', () => {
    expect(regionPath('country', 'belgium')).toBe('/countries/belgium')
    expect(regionPath('region', 'flanders')).toBe('/regions/flanders')
    expect(regionPath('city', 'antwerpen')).toBe('/areas/antwerpen')
    expect(regionPath('center', 'av-de-la-couronne-378')).toBe('/venues/av-de-la-couronne-378')
  })
})

describe('eventPath', () => {
  it('routes events by numeric id', () => {
    expect(eventPath(507)).toBe('/events/507')
  })
})
