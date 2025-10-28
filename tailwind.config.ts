import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E11D48',
          hover: '#BE123C',
          light: '#FFF1F2',
          dark: '#9F1239',
        },
        secondary: {
          DEFAULT: '#16A34A',
          hover: '#15803D',
          light: '#F0FDF4',
          dark: '#166534',
        },
        accent: {
          DEFAULT: '#EAB308',
          hover: '#CA8A04',
          light: '#FEF9C3',
          dark: '#A16207',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
