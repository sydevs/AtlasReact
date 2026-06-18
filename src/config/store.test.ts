import type { Feature } from 'geojson'

import { describe, it, expect, beforeEach } from 'vitest'

import { useNavigationState, useSearchState, useViewState } from './store'

// The stores are the single source of truth for map view, navigation history,
// and search filters. They're plain zustand vanilla stores, so we drive their
// actions directly via getState() without React. Reset to the initial slice in
// beforeEach since the module singletons persist between tests.

describe('useViewState', () => {
  beforeEach(() => {
    useViewState.setState({
      latitude: 0,
      longitude: 0,
      zoom: 0,
      selection: null,
      boundary: undefined,
    })
  })

  it('setViewState updates the camera fields', () => {
    useViewState.getState().setViewState({ latitude: 51.5, longitude: -0.12, zoom: 8 })

    expect(useViewState.getState()).toMatchObject({ latitude: 51.5, longitude: -0.12, zoom: 8 })
  })

  it('setSelection stores the picked point and setBoundary stores a feature', () => {
    const boundary: Feature = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [2, 1] },
      properties: {},
    }

    useViewState.getState().setSelection({ latitude: 1, longitude: 2, approximate: true })
    useViewState.getState().setBoundary(boundary)

    const state = useViewState.getState()

    expect(state.selection).toEqual({ latitude: 1, longitude: 2, approximate: true })
    expect(state.boundary).toBe(boundary)
  })
})

describe('useNavigationState', () => {
  beforeEach(() => {
    useNavigationState.setState({ previousPath: '', currentPath: '' })
  })

  it('setCurrentPath shifts the prior path into previousPath', () => {
    useNavigationState.getState().setCurrentPath('/search')
    useNavigationState.getState().setCurrentPath('/countries/gb')

    const state = useNavigationState.getState()

    expect(state.previousPath).toBe('/search')
    expect(state.currentPath).toBe('/countries/gb')
  })
})

describe('useSearchState', () => {
  beforeEach(() => {
    useSearchState.setState({ onlineOnly: false })
  })

  it('setOnlineOnly toggles the online-only filter', () => {
    useSearchState.getState().setOnlineOnly(true)

    expect(useSearchState.getState().onlineOnly).toBe(true)
  })
})
