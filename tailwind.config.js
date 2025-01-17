import { nextui } from '@nextui-org/theme'
import defaultTheme from 'tailwindcss/defaultTheme'

const TEAL_COLOR = {
  DEFAULT: '#82b1ae',
  10: '#f4f8f7', // alt #e9f1f0
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
  10: '#fBf3f1',
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

const TAILWIND_REM_TO_PX = {
  borderRadius: {
    none: "0px",
    sm: "2px",
    DEFAULT: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    "2xl": "16px",
    "3xl": "24px",
    full: "9999px",
  },
  columns: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    "3xs": "256px",
    "2xs": "288px",
    xs: "320px",
    sm: "384px",
    md: "448px",
    lg: "512px",
    xl: "576px",
    "2xl": "672px",
    "3xl": "768px",
    "4xl": "896px",
    "5xl": "1024px",
    "6xl": "1152px",
    "7xl": "1280px",
  },
  fontSize: {
    xs: ["12px", { lineHeight: "16px" }],
    sm: ["14px", { lineHeight: "20px" }],
    base: ["16px", { lineHeight: "24px" }],
    lg: ["18px", { lineHeight: "28px" }],
    xl: ["20px", { lineHeight: "28px" }],
    "2xl": ["24px", { lineHeight: "32px" }],
    "3xl": ["30px", { lineHeight: "36px" }],
    "4xl": ["36px", { lineHeight: "36px" }],
    "5xl": ["48px", { lineHeight: "1" }],
    "6xl": ["60px", { lineHeight: "1" }],
    "7xl": ["72px", { lineHeight: "1" }],
    "8xl": ["96px", { lineHeight: "1" }],
    "9xl": ["144px", { lineHeight: "1" }],
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
  },
  maxWidth: ({ theme, breakpoints }) => ({
    none: "none",
    0: "0px",
    xs: "320px",
    sm: "384px",
    md: "448px",
    lg: "512px",
    xl: "576px",
    "2xl": "672px",
    "3xl": "768px",
    "4xl": "896px",
    "5xl": "1024px",
    "6xl": "1152px",
    "7xl": "1280px",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    prose: "65ch",
    ...breakpoints(theme("screens")),
  }),
  spacing: {
    px: "1px",
    0: "0",
    0.5: "2px",
    1: "4px",
    1.5: "6px",
    2: "8px",
    2.5: "10px",
    3: "12px",
    3.5: "14px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    11: "44px",
    12: "48px",
    14: "56px",
    16: "64px",
    20: "80px",
    24: "96px",
    28: "112px",
    32: "128px",
    36: "144px",
    40: "160px",
    44: "176px",
    48: "192px",
    52: "208px",
    56: "224px",
    60: "240px",
    64: "256px",
    72: "288px",
    80: "320px",
    96: "384px",
  },
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
    ...TAILWIND_REM_TO_PX,
    fontSize: {
      'xs': ['12px', {
        lineHeight: '1.66667',
        letterSpacing: '0.36px',
      }],
      'sm': ['13px', {
        lineHeight: '1.5',
        letterSpacing: '0.36px',
      }],
      'base': ['14px', '1.2'],
      'md': ['14px', '1.2'],
      'lg': ['17px', {
        lineHeight: '1.2',
        fontWeight: '600',
      }],
      'xl': ['20px', {
        lineHeight: '1.2',
        fontWeight: '600',
      }],
      '2xl': ['30px', {
        lineHeight: '1.166667',
        letterSpacing: '0.8px',
      }],
    },
    fontFamily: {
      'sans': ['Raleway', ...defaultTheme.fontFamily.sans],
      'serif': defaultTheme.fontFamily.serif,
      'mono': defaultTheme.fontFamily.mono,
    },
    backgroundImage: {
      'circle-pattern': "url('/graphics/circle.svg')",
    }
  },
  defaultTheme: 'light',
  darkMode: "class",
  plugins: [nextui({
    layout: {
      radius: {
        small: "2px", // rounded-small
        medium: "4px", // rounded-medium
        large: "8px", // rounded-large
      },
      fontSize: {
        tiny: "12px", // text-tiny
        small: "14px", // text-small
        medium: "16px", // text-medium
        large: "18px", // text-large
      },
      lineHeight: {
        tiny: "16px", // text-tiny
        small: "20px", // text-small
        medium: "24px", // text-medium
        large: "28px", // text-large
      },
    },
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
