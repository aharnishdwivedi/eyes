/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baby-pink': '#FFB6C1',
        'soft-pink': '#FFC0CB',
        'soft-purple': '#DDA0DD',
        'lavender': '#E6E6FA',
        'pastel-purple': '#C8A2C8',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'heart-beat': 'heart-beat 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'blink': 'blink 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        'heart-beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blink: {
          '0%, 90%, 100%': { opacity: 1 },
          '95%': { opacity: 0.3 },
        },
      },
    },
  },
  plugins: [],
}

