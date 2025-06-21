/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'text-base': 'rgb(var(--color-text-base) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        'text-accent': 'rgb(var(--color-text-accent) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        starfield: 'rgb(var(--color-starfield) / <alpha-value>)',
      },
      animation: {
        'enter': 'enter 0.6s ease-out forwards',
        'aurora': 'aurora 20s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'enter': {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'aurora': {
          '0%': { 'background-position': '0% 50%', 'background-size': '300% 300%' },
          '100%': { 'background-position': '100% 50%', 'background-size': '300% 300%' },
        },
        'glow': {
          '0%': { 'text-shadow': '0 0 5px rgb(var(--color-text-accent)), 0 0 10px rgb(var(--color-text-accent))' },
          '100%': { 'text-shadow': '0 0 20px rgb(var(--color-text-accent)), 0 0 30px rgb(var(--color-text-accent))' },
        }
      }
    },
  },
  plugins: [],
}