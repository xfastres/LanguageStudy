import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#14141f',
        'surface-light': '#1e1e2e',
        'surface-lighter': '#2a2a3d',
        text: {
          primary: '#f0ede8',
          secondary: '#a8a4a0',
          muted: '#6b6768',
        },
        accent: {
          DEFAULT: '#e8a838',
          hover: '#f0b848',
          muted: '#c89030',
        },
        success: '#4ade80',
        warning: '#fbbf24',
        border: '#2a2a3d',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'subtitle-sm': ['0.875rem', { lineHeight: '1.4' }],
        'subtitle-md': ['1rem', { lineHeight: '1.5' }],
        'subtitle-lg': ['1.25rem', { lineHeight: '1.5' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
