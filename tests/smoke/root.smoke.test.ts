import { describe, expect, test } from 'vitest'

// Smoke test: does the deployed Cloudflare Pages preview actually serve the app?
// This is the minimal "is the deploy alive" check — it fetches the root page and
// asserts the SPA shell is returned. It catches a broken build, a missing
// `_redirects` fallback, or a dead deploy. Deeper interaction coverage (clicking
// the map, entity routes, locales) is tracked for follow-up.
//
// PREVIEW_URL is injected by CI after discovering the preview deployment. When
// it's absent (e.g. running locally with nothing to point at), the spec skips
// rather than failing.

const PREVIEW_URL = process.env.PREVIEW_URL?.replace(/\/$/, '')

describe('root page', () => {
  test.skipIf(!PREVIEW_URL)('serves the SPA shell at /', async () => {
    const res = await fetch(`${PREVIEW_URL}/`)
    expect(res.status).toBe(200)

    const html = await res.text()
    // The standalone build mounts into <div id="syatlas"> (see index.html).
    expect(html).toContain('id="syatlas"')
    expect(html).toMatch(/<title>[^<]*Sahaj Atlas/i)
  })
})
