import { describe, expect, test } from 'vitest'

// Smoke test: does the Cloudflare Pages preview serve the SPA shell for a deep
// link that isn't the root? The standalone build uses BrowserRouter, so a direct
// GET /search only returns the app if the `public/_redirects` fallback
// (`/* /index.html 200`) is deployed — this guards that fix (from PR #3). The
// embeddable widget uses HashRouter and doesn't depend on the fallback.
//
// PREVIEW_URL is injected by CI after discovering the preview deployment; the
// spec skips when it's absent (e.g. local runs, forked PRs without secrets).

const PREVIEW_URL = process.env.PREVIEW_URL?.replace(/\/$/, '')

describe('SPA deep-link fallback', () => {
  test.skipIf(!PREVIEW_URL)('serves the SPA shell at a deep link (/search)', async () => {
    const res = await fetch(`${PREVIEW_URL}/search`)

    expect(res.status).toBe(200)

    const html = await res.text()

    // Same shell as the root page — _redirects rewrote /search to index.html.
    expect(html).toContain('id="syatlas"')
  })
})
