import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#e08e79",
          },
          secondary: {
            foreground: "#FFFFFF",
            DEFAULT: '#92bbb8',
          },
          tertiary: {
            foreground: "#FFFFFF",
            DEFAULT: '#a1c3d7',
          },
        },
      },
      dark: {
        extend: {
          colors: {
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#92bbb8",
            },
            secondary: {
              foreground: "#FFFFFF",
              DEFAULT: '#e08e79',
            },
            tertiary: {
              foreground: "#FFFFFF",
              DEFAULT: '#a1c3d7',
            },
          },
          borderColor: {
            DEFAULT: '#1e1e1e',
          },
          backgroundColor: {
            DEFAULT: '#1e1e1e',
          },
        } 
      }
    }
  })],
}
