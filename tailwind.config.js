import { nextui } from '@nextui-org/theme'
import defaultTheme from 'tailwindcss/defaultTheme'

const TEAL_COLOR = {
  DEFAULT: '#82b1ae',
  50: '#c1d8d7',
  100: '#b1cfcc',
  200: '#a2c5c2',
  300: '#92bbb8', // Original
  400: '#82b1ae',
  500: '#73a7a4',
  600: '#639e99',
  700: '#598f8a',
  800: '#4f7f7b',
  900: '#456f6c',
}

const ORANGE_COLOR = {
  DEFAULT: '#e08e79',
  50: '#f3d3cc',
  100: '#eec2b7',
  200: '#eab1a2',
  300: '#e59f8e',
  400: '#e08e79', // Original
  500: '#db7d64',
  600: '#d66b50',
  700: '#d25a3b',
  800: '#c64d2d',
  900: '#b14529',
}

const BLUE_COLOR = {
  DEFAULT: '#8fb8cf',
  50: '#d7e5ee',
  100: '#c5dae6',
  200: '#b3cedf',
  300: '#a1c3d7', // Original
  400: '#8fb8cf',
  500: '#7dacc8',
  600: '#6ba1c0',
  700: '#5996b8',
  800: '#4a8aae',
  900: '#427b9c',
}

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
    fontSize: {
      'xs': ['0.75rem', {
        lineHeight: '1.25rem',
        letterSpacing: '0.36px',
      }],
      'sm': ['0.815rem', {
        lineHeight: '1.25rem',
        letterSpacing: '0.36px',
      }],
      'base': ['0.875rem', '1.075rem'],
      'lg': ['1.0625rem', {
        lineHeight: '1.25rem',
        fontWeight: '600',
      }],
      'xl': ['1.25rem', {
        lineHeight: '1.5rem',
        fontWeight: '600',
      }],
      '2xl': ['1.875rem', {
        lineHeight: '1.166667',
        letterSpacing: '0.8px',
      }],
    },
    fontFamily: {
      'sans': ['Raleway', ...defaultTheme.fontFamily.sans],
      'serif': [...defaultTheme.fontFamily.serif],
      'mono': ['Iosevka Term Web', ...defaultTheme.fontFamily.mono],
    },
    backgroundImage: {
      'circle-pattern': "url('/graphics/circle.svg')",
    }
  },
  defaultTheme: 'light',
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            ...TEAL_COLOR,
            foreground: "#000000",
          },
          secondary: {
            ...ORANGE_COLOR,
            foreground: "#000000",
          },
          tertiary: {
            ...BLUE_COLOR,
            foreground: "#000000",
          },
          danger: {
            ...ORANGE_COLOR,
          },
          focus: TEAL_COLOR,
        },
      },
      dark: {
        extend: {
          colors: {
            primary: {
              ...ORANGE_COLOR,
              foreground: "#FFFFFF",
            },
            secondary: {
              ...TEAL_COLOR,
              foreground: "#000000",
            },
            tertiary: {
              ...BLUE_COLOR,
              foreground: "#000000",
            },
            danger: {
              ...ORANGE_COLOR,
              foreground: "#000000",
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
