import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// Fast local/unit lane: pure, dependency-light specs co-located with the code
// they cover (`src/**/*.test.ts(x)`). Node-only — component specs assert SSR
// markup via `renderToStaticMarkup` rather than booting jsdom (mirrors
// WeMeditateWeb). See `.claude/rules/tests.md`.
//
// `tsconfigPaths` resolves the `@/…` alias the same way Vite does, so specs and
// the modules they import can use it. Smoke specs hit a deployed preview over
// the network and live in their own config (vitest.smoke.config.ts) — they're
// excluded here so `pnpm test:run` never touches the network.
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'build', '.ladle', 'tests/smoke/**'],
  },
})
