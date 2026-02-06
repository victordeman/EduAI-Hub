import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
        },
        secondary: {
          500: 'var(--color-secondary-500)',
        },
        'bg-dark': 'var(--color-bg-dark)',
        surface: 'var(--color-surface)',
        'surface-light': 'var(--color-surface-light)',
      },
    },
  },
  plugins: [],
};

export default config;
