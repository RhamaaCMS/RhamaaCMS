/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "../Motify/templates/**/*.html",
    "../utils/templates/**/*.html",
    "../apps/**/templates/**/*.html",
    "./static_src/**/*.{js,jsx,scss}",
    "./node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A9FE6', // Sky Blue - Main primary color from image
          50: '#EBF5FE',
          100: '#D7EBFD',
          200: '#B0D7FB',
          300: '#88C3F9',
          400: '#61AFF7',
          500: '#4A9FE6', // Main shade
          600: '#2B7FD4',
          700: '#1C60A9',
          800: '#0E407E',
          900: '#072053',
        },
        secondary: {
          DEFAULT: '#F2F2F2', // Light Gray
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F2F2F2', // Main shade
          300: '#E6E6E6',
          400: '#D9D9D9',
          500: '#CCCCCC',
          600: '#B3B3B3',
          700: '#999999',
          800: '#808080',
          900: '#666666',
        },
        accent1: {
          DEFAULT: '#5DCE57', // Lime Green
          50: '#EFF9EF',
          100: '#DFF3DE',
          200: '#BFE7BD',
          300: '#9EDB9C',
          400: '#7ED57B',
          500: '#5DCE57', // Main shade
          600: '#3EB538',
          700: '#2F892B',
          800: '#205C1D',
          900: '#102E0E',
        },
        accent2: {
          DEFAULT: '#FFA726', // Soft Amber / Orange Tint
          50: '#FFF5E6',
          100: '#FFEACC',
          200: '#FFD699',
          300: '#FFC166',
          400: '#FFAD33',
          500: '#FFA726', // Main shade
          600: '#E68A00',
          700: '#B36B00',
          800: '#804C00',
          900: '#4D2E00',
        },
        danger: {
          DEFAULT: '#EF5350', // Soft Red
          50: '#FDEEEE',
          100: '#FBDDDD',
          200: '#F7BBBB',
          300: '#F39999',
          400: '#F17775',
          500: '#EF5350', // Main shade
          600: '#EA2521',
          700: '#C11A16',
          800: '#8F1310',
          900: '#5D0C0A',
        },
        navy: {
          DEFAULT: '#002D72', // Deep Navy
          50: '#E6EBF4',
          100: '#CCD7E9',
          200: '#99AFD3',
          300: '#6687BD',
          400: '#335FA7',
          500: '#003791',
          600: '#002D72', // Main shade
          700: '#002259',
          800: '#001640',
          900: '#000B26',
        },
        text: {
          DEFAULT: '#333333', // Charcoal Gray
          light: '#777777', // Lighter text for secondary content
          dark: '#111111', // Darker text for emphasis
        },
        background: {
          DEFAULT: '#FFFFFF', // White
          alt: '#F8F9FA', // Slightly off-white for alternating sections
          dark: '#333333', // Dark background for contrast sections
        },
        success: '#5DCE57', // Same as accent1
        warning: '#FFA726', // Same as accent2
        info: '#007BFF', // Same as primary
        error: '#EF5350', // Same as danger
      },
      fontFamily: {
        sans: ['Hubot Sans', 'system-ui', 'sans-serif'],
        heading: ['Mona Sans', 'system-ui', 'sans-serif'],
        hubot: ['Hubot Sans', 'system-ui', 'sans-serif'],
        mona: ['Mona Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brutal-flat': 'var(--brutal-shadow-flat)',
        'brutal-pressed': 'var(--brutal-shadow-pressed)',
        'brutal-flat-sm': 'var(--brutal-shadow-flat-sm)',
        'brutal-pressed-sm': 'var(--brutal-shadow-pressed-sm)',
      },
      borderRadius: {
        'neu': 'var(--brutal-radius)',
      },
      textColor: {
        'content': 'var(--content)',
        'content-muted': 'var(--content-muted)',
      },
      backgroundColor: {
        'content-bg': 'var(--background)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      tabSize: {
        1: '1',
        2: '2',
        4: '4',
        8: '8',
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      addUtilities({
        '.tab-2': {
          'tab-size': '2',
        },
      });
    },
  ],
}
