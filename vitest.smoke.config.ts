import { defineConfig } from 'vitest/config'

// Smoke specs run against a deployed Cloudflare Pages preview (PREVIEW_URL),
// not the local build — they're fetch-based and need no browser. Kept in a
// separate config so they never run in the fast local/unit lane.
export default defineConfig({
  test: {
    include: ['tests/smoke/**/*.smoke.test.ts'],
    environment: 'node',
    testTimeout: 30_000,
    hookTimeout: 30_000,
    // Network round-trips against a real edge deployment — give them room and
    // retry transient failures rather than flaking the job.
    retry: 2,
    bail: 0,
  },
})
