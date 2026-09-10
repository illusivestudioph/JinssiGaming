/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fefcf9',
          100: '#fdf8f1',
          200: '#fcf3b9', // Vanilla
          300: '#fcdfaa', // Peach Yellow
          400: '#fbca9a', // Peach
          500: '#e0bf91',
        },
        peach: {
          50: '#fff5f0',
          100: '#ffe8df',
          200: '#fcdfaa', // Peach Yellow
          300: '#fbca9a', // Peach
          400: '#fcb274', // Sandy brown (light)
          500: '#fd9a4d', // Sandy brown
          600: '#e05a3a',
        },
        pastel: {
          blue: {
            100: '#E3ECFF',
            200: '#B9D3FF',
            300: '#9BC1FF',
            400: '#83BAFF',
          },
          sandy: '#FD9A4D',
          sandyLight: '#FCB274',
          peach: '#FBCA9A',
          peachYellow: '#FCDFAA',
          vanilla: '#FCF3B9',
        },
        tan: {
          50: '#faf6f0',
          100: '#f0e8db',
          200: '#e2d4bf',
          300: '#d0bd9e',
          400: '#9b7a4d',
          500: '#8f764f',
          600: '#6f583b',
        },
        earth: {
          50: '#fdf8f4',
          100: '#f9ede0',
          200: '#f0d9c0',
          300: '#e6c09a',
          400: '#d9a472',
          500: '#c98a52',
          600: '#b07240',
          700: '#8f5a33',
        },
        sage: {
          100: '#e8f0e4',
          200: '#cfe0c8',
          300: '#a8c89e',
          400: '#82ad76',
          500: '#649058',
        },
        rose: {
          100: '#fce8e8',
          200: '#f8cfcf',
          300: '#f0a8a8',
          400: '#e58080',
          500: '#d05858',
        },
        ink: {
          700: '#5c4a3a',
          800: '#4a3a2c',
          900: '#3a2e22',
        },
      },
      fontFamily: {
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
        display: ['"Fredoka"', 'system-ui', 'sans-serif'],
        witchcraft: ['"Witchcraft"', '"Fredoka"', 'system-ui', 'sans-serif'],
        matcha: ['"Matcha Mint"', '"Fredoka"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'cozy': '0 4px 14px -2px rgba(180, 140, 100, 0.15)',
        'cozy-lg': '0 8px 30px -4px rgba(180, 140, 100, 0.2)',
        'cozy-sm': '0 2px 8px -2px rgba(180, 140, 100, 0.1)',
        'inner-cozy': 'inset 0 2px 6px -2px rgba(180, 140, 100, 0.12)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'pop': 'pop 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
