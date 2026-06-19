import { describe, it, expect, vi, beforeEach } from 'vitest'

import atlasAuth from './auth'
import { toSahajLocale } from './client'
import api from './fetch'

// The shared axios client attaches auth + locale to *every* request via one
// interceptor (so individual fetchers don't). We mock axios to capture that
// interceptor and the `get` method, and mock i18n so importing the client
// doesn't boot the real HTTP backend / language detector.
//
// vi.hoisted runs before the hoisted vi.mock factories, so `use`/`get` are
// already spies when client.ts calls interceptors.request.use(...).
const { use, get } = vi.hoisted(() => ({ use: vi.fn(), get: vi.fn() }))

vi.mock('axios', () => ({
  default: { create: () => ({ interceptors: { request: { use } }, get }) },
}))
vi.mock('@/config/i18n', () => ({ default: { resolvedLanguage: 'fr' } }))

type AxiosRequest = { headers: Record<string, string>; params?: Record<string, unknown> }
const interceptor = use.mock.calls[0][0] as (req: AxiosRequest) => AxiosRequest

beforeEach(() => get.mockReset())

describe('api request interceptor', () => {
  it('attaches the clients API-Key and resolved locale to every request', () => {
    atlasAuth.apiKey = 'test-key-123'

    const request = interceptor({ headers: {} })

    expect(request.headers['Authorization']).toBe('clients API-Key test-key-123')
    expect(request.params?.locale).toBe('fr')
  })

  it('preserves existing query params while adding the locale', () => {
    atlasAuth.apiKey = 'k'

    const request = interceptor({ headers: {}, params: { depth: 1 } })

    expect(request.params).toMatchObject({ depth: 1, locale: 'fr' })
  })

  it('omits the Authorization header when no api key is set', () => {
    atlasAuth.apiKey = null

    expect(interceptor({ headers: {} }).headers['Authorization']).toBeUndefined()
  })
})

describe('toSahajLocale', () => {
  it('maps i18next codes to SahajCloud locale codes', () => {
    expect(toSahajLocale('fr')).toBe('fr')
    expect(toSahajLocale('pt-BR')).toBe('pt-br')
    expect(toSahajLocale('pt')).toBe('pt-br')
    expect(toSahajLocale('en-US')).toBe('en')
    expect(toSahajLocale('xx')).toBe('en')
    expect(toSahajLocale(undefined)).toBe('en')
  })
})

describe('getGeojson', () => {
  it('reads the feed with a required select + populate and parses the FeatureCollection', async () => {
    get.mockResolvedValue({
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [4.35, 50.85] },
            properties: {
              id: 1,
              title: 'Class',
              eventType: 'offline',
              languages: ['en'],
              region: { id: 9, slug: 'brussels', level: 'city' },
            },
          },
        ],
      },
    })

    const geojson = await api.getGeojson()

    const [path, config] = get.mock.calls[0] as [string, { params: Record<string, unknown> }]

    expect(path).toBe('/events/geojson')
    expect(config.params.select).toBeTruthy()
    expect(config.params.populate).toBeTruthy()
    expect(config.params.pagination).toBe(false)
    expect(geojson.features[0].properties.region.slug).toBe('brussels')
  })
})
