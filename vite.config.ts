import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    cssInjectedByJsPlugin() //{ dev: { enableDev: true }})
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        widget: './src/Widget.tsx',
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === 'widget' ? 'assets/js/[name].js' : 'assets/[name].js';
        },
      },
    },
  },
  /*experimental: {
    renderBuiltUrl(filename: string) {
      return "http://localhost:4173/" + filename;
    },
  },*/
})
