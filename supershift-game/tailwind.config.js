/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arcade: {
          dark: '#090d16',
          panel: '#111827',
          surface: '#1f293d',
          border: '#374151',
          emerald: '#10b981',
          electric: '#3b82f6',
          purple: '#8b5cf6',
          gold: '#f59e0b',
          crimson: '#ef4444',
          fluGrena: '#8a1538',
          fluVerde: '#006437',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 20px -2px rgba(16, 185, 129, 0.5)',
        'glow-blue': '0 0 20px -2px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px -2px rgba(139, 92, 246, 0.5)',
        'glow-gold': '0 0 20px -2px rgba(245, 158, 11, 0.5)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
