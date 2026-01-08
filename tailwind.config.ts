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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#73af17',
          50: '#f0f9e8',
          100: '#ddf1c8',
          200: '#c0e69c',
          300: '#9dd666',
          400: '#7fc23a',
          500: '#73af17',
          600: '#5a8a0f',
          700: '#466810',
          800: '#3a5312',
          900: '#324613',
        },
        // Brand colors
        'brand-green': '#73af17',
        'brand-dark': '#111827',
        'brand-light': '#FFFFFF',
        'brand-gray': '#374151',
        'text-gray-light': '#6B7280',
        'text-gray-dark': '#9CA3AF',
        'border-gray': '#B8BDC5',
        'accent-amber': '#F59E0B',
        'accent-orange': '#F97316',
        'danger-red': '#DC2626',
      },
      borderRadius: {
        'brand': '8px',
      },
    },
  },
  plugins: [],
}
export default config

