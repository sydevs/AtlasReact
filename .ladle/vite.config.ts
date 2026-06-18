import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'

// Ladle runs its own Vite + React (SWC) plugin internally and hard-sets Vite's
// `root` to its own app directory. That breaks vite-tsconfig-paths (it can't find
// our tsconfig.json from there), so the app's usual `@/*` alias mechanism won't
// work here. Instead we resolve `@/` explicitly to the repo's `src/`. Ladle merges
// this alias array with its own (msw/axe-core) aliases, so both survive.
//
// The Tailwind/NextUI/PostCSS pipeline is still picked up automatically from the
// root `postcss.config.js`. We intentionally do NOT add the production
// css-injected-by-js plugin or the app's multi-entry build config — the decorator
// imports `globals.css` directly instead.
const srcDir = fileURLToPath(new URL('../src', import.meta.url))

export default defineConfig({
  resolve: {
    alias: [{ find: /^@\//, replacement: `${srcDir}/` }],
  },
})
