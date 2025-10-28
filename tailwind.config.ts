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
        navidad: {
          rojo: '#C41E3A',
          verde: '#165B33',
          dorado: '#FFD700',
          nieve: '#F8F9FA',
          oscuro: '#1A1A1A',
        },
      },
      fontFamily: {
        navidad: ['"Mountains of Christmas"', 'cursive'],
      },
    },
  },
  plugins: [],
}
export default config