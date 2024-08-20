// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgb(106, 139, 180)',
        'custom-light-blue': 'rgb(163, 179, 204)',
        'custom-gray': 'rgb(208, 199, 194)',
        'custom-light-gray': 'rgb(243, 240, 231)',
        'custom-dark-gray':'rgb(115, 98, 79)',
        'custom-green': 'rgb(183, 210, 197)',
        'custom-brown': 'rgb(208, 199, 194)',
        'custom-red': "#d2b7b7",
        'bg-green': "rgba(203,206,201,255)"
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-10%)' },
        },
      },
      animation: {
        'wave-1': 'wave 10s ease-in-out infinite',
        'wave-2': 'wave 15s ease-in-out infinite',
        'wave-3': 'wave 20s ease-in-out infinite',
        'wave-4': 'wave 25s ease-in-out infinite',
        'wave-5': 'wave 30s ease-in-out infinite',
        'wave-6': 'wave 35s ease-in-out infinite',
      },
      fontFamily: {
        'ibm-plex-mono': ['"IBM Plex Mono"', 'monospace'],
        'Beba':['"Bebas Neue"', 'sans-serif'],
        'fjalla': ['Fjalla One', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'istok': ['Istok Web', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
