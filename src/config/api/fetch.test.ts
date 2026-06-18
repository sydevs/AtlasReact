import { describe, it, expect, vi } from 'vitest'

import atlasAuth from './auth'

import './fetch' // importing registers the request interceptor as a side effect

// The axios client attaches auth + locale to *every* request via one interceptor
// (so individual fetchers don't have to). We mock axios to capture that
// interceptor and assert what it does, and mock i18n so importing fetch.ts
// doesn't boot the real HTTP backend / language detector.
//
// vi.hoisted runs before the hoisted vi.mock factories, so `use` is already a
// spy when fetch.ts calls client.interceptors.request.use(...).
const { use } = vi.hoisted(() => ({ use: vi.fn() }))

vi.mock('axios', () => ({
  default: { create: () => ({ interceptors: { request: { use } } }) },
}))
vi.mock('@/config/i18n', () => ({ default: { resolvedLanguage: 'fr' } }))

type AxiosRequest = { headers: Record<string, string>; params?: Record<string, unknown> }
const interceptor = use.mock.calls[0][0] as (req: AxiosRequest) => AxiosRequest

describe('api request interceptor', () => {
  it('attaches the bearer token and resolved locale to every request', () => {
    atlasAuth.apiKey = 'test-key-123'

    const request = interceptor({ headers: {} })

    expect(request.headers['Authorization']).toBe('Bearer test-key-123')
    expect(request.params?.locale).toBe('fr')
  })

  it('preserves existing query params while adding the locale', () => {
    atlasAuth.apiKey = 'k'

    const request = interceptor({ headers: {}, params: { latitude: 52 } })

    expect(request.params).toMatchObject({ latitude: 52, locale: 'fr' })
  })
})
