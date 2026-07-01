import type { Breadcrumb, RegionRef } from '@/types'

import { describe, it, expect } from 'vitest'

import {
  ancestorSlugsFromBreadcrumbs,
  eventPath,
  eventStubPath,
  regionPath,
  regionRefPath,
  resolvePath,
} from './path'

const breadcrumbs: Breadcrumb[] = [
  { doc: { id: 1, slug: 'belgium', level: 'country' }, label: 'Belgium' },
  { doc: { id: 2, slug: 'flanders', level: 'region' }, label: 'Flanders' },
  { doc: { id: 3, slug: 'antwerpen', level: 'city' }, label: 'Antwerpen' },
]

const cityRef: RegionRef = { id: 3, slug: 'antwerpen', level: 'city', breadcrumbs }

describe('regionPath', () => {
  it('joins an ancestor slug chain into a nested path', () => {
    expect(regionPath(['belgium'])).toBe('/belgium')
    expect(regionPath(['belgium', 'flanders', 'antwerpen'])).toBe('/belgium/flanders/antwerpen')
  })
})

describe('ancestorSlugsFromBreadcrumbs', () => {
  it('extracts the ordered slug chain from populated breadcrumb docs', () => {
    expect(ancestorSlugsFromBreadcrumbs(breadcrumbs)).toEqual(['belgium', 'flanders', 'antwerpen'])
  })

  it('skips bare numeric docs (the feed depth) and nullish input', () => {
    expect(ancestorSlugsFromBreadcrumbs([{ doc: 1 }, { doc: 2 }])).toEqual([])
    expect(ancestorSlugsFromBreadcrumbs(null)).toEqual([])
    expect(ancestorSlugsFromBreadcrumbs(undefined)).toEqual([])
  })
})

describe('regionRefPath', () => {
  it('builds the full nested path from a populated breadcrumb chain', () => {
    expect(regionRefPath(cityRef)).toBe('/belgium/flanders/antwerpen')
  })

  it('falls back to a flat /slug when the chain is not populated', () => {
    expect(regionRefPath({ id: 3, slug: 'antwerpen', level: 'city' })).toBe('/antwerpen')
    expect(regionRefPath({ ...cityRef, breadcrumbs: [{ doc: 1 }] })).toBe('/antwerpen')
  })
})

describe('eventPath', () => {
  it('appends the numeric id to its region chain', () => {
    expect(eventPath(cityRef, 507)).toBe('/belgium/flanders/antwerpen/507')
  })
})

describe('eventStubPath', () => {
  it('is the minimal numeric-terminal route', () => {
    expect(eventStubPath(507)).toBe('/507')
  })
})

describe('resolvePath', () => {
  it('resolves a numeric terminal to an event id at any depth (incl. legacy flat)', () => {
    expect(resolvePath('/507')).toEqual({ kind: 'event', id: 507 })
    expect(resolvePath('/belgium/flanders/antwerpen/downtown-hall/507')).toEqual({
      kind: 'event',
      id: 507,
    })
    expect(resolvePath('/events/507')).toEqual({ kind: 'event', id: 507 })
  })

  it('resolves a non-numeric terminal to a region slug (region- and venue-optional)', () => {
    expect(resolvePath('/belgium')).toEqual({ kind: 'region', slug: 'belgium' })
    expect(resolvePath('/belgium/antwerpen')).toEqual({ kind: 'region', slug: 'antwerpen' })
    expect(resolvePath('/belgium/flanders/antwerpen')).toEqual({
      kind: 'region',
      slug: 'antwerpen',
    })
    expect(resolvePath('/areas/antwerpen')).toEqual({ kind: 'region', slug: 'antwerpen' })
  })

  it('returns null for the root (no region/event segment)', () => {
    expect(resolvePath('/')).toBeNull()
    expect(resolvePath('')).toBeNull()
  })

  it('decodes an encoded terminal slug', () => {
    expect(resolvePath('/belgium/li%C3%A8ge')).toEqual({ kind: 'region', slug: 'liège' })
  })
})
