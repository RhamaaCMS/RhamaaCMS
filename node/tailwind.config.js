/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Preline uses html.dark class
  content: [
    "../templates/**/*.html",
    "../utils/templates/**/*.html", 
    "../apps/**/templates/**/*.html",
    "../static_src/**/*.{js,jsx,scss}",
    "./node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      // =============================================================================
      // GLOBAL DESIGN SYSTEM - RHAMAA BRAND
      // =============================================================================
      
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: '#1a4a47',
          50: '#f0f9f8',
          100: '#ccebe8',
          200: '#99d6d1',
          300: '#66c2ba',
          400: '#33ada3',
          500: '#1a4a47',
          600: '#153b39',
          700: '#102c2b',
          800: '#0b1e1d',
          900: '#050f0e',
        },
        secondary: {
          DEFAULT: '#b8860b',
          50: '#faf5d9',
          75: '#f7ebb8',
          100: '#f4e4a6',
          200: '#e8d074',
          300: '#dcbc42',
          400: '#d4a00f',
          500: '#b8860b',
          600: '#9a7209',
          700: '#7c5e07',
          800: '#5e4905',
          900: '#403503',
        },
        
        // Neutral Colors
        grey: {
          50: '#f6f6f8',
          100: '#e0e0e0',
          150: '#c8c8c8',
          200: '#929292',
          400: '#5c5c5c',
          500: '#333333',
          600: '#262626',
          700: '#222222',
          800: '#1d1d1d',
        },
        
        // Status Colors
        info: {
          50: '#e2f5fc',
          75: '#80b6c7',
          100: '#1d7792',
          125: '#186076',
        },
        positive: {
          50: '#e0fbf4',
          100: '#1b8666',
        },
        warning: {
          50: '#fff5d8',
          75: '#fdd074',
          100: '#faa500',
        },
        critical: {
          50: '#fef0f0',
          100: '#fd5765',
          200: '#ca3b3b',
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.25' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'lg': ['1.125rem', { lineHeight: '1.5' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.25' }],
        '3xl': ['1.875rem', { lineHeight: '1.25' }],
        '4xl': ['2.25rem', { lineHeight: '1.25' }],
      },
      
      spacing: {
        'xs': 'var(--g-spacing-xs)',
        'sm': 'var(--g-spacing-sm)',
        'md': 'var(--g-spacing-md)',
        'lg': 'var(--g-spacing-lg)',
        'xl': 'var(--g-spacing-xl)',
        '2xl': 'var(--g-spacing-2xl)',
      },
      
      borderRadius: {
        'sm': 'var(--g-border-radius-sm)',
        'md': 'var(--g-border-radius-md)',
        'lg': 'var(--g-border-radius-lg)',
        'xl': 'var(--g-border-radius-xl)',
        '2xl': 'var(--g-border-radius-2xl)',
        'full': 'var(--g-border-radius-full)',
      },
      
      boxShadow: {
        'sm': 'var(--g-shadow-sm)',
        'md': 'var(--g-shadow-md)',
        'lg': 'var(--g-shadow-lg)',
        'xl': 'var(--g-shadow-xl)',
      },
      
      // Component-specific utilities
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
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
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    
    // Custom utilities plugin
    function({ addUtilities, addComponents, theme }) {
      // Tab size utility
      addUtilities({
        '.tab-2': {
          'tab-size': '2',
        },
        '.tab-4': {
          'tab-size': '4',
        },
        '.resize-vertical': {
          'resize': 'vertical',
        },
        '.resize-horizontal': {
          'resize': 'horizontal',
        },
        '.resize-both': {
          'resize': 'both',
        },
        '.resize-none': {
          'resize': 'none',
        },
      });
      
      // Global design system utilities
      addUtilities({
        '.g-focus': {
          'outline': '2px solid var(--g-color-focus)',
          'outline-offset': '2px',
        },
        '.g-focus-visible': {
          '&:focus-visible': {
            'outline': '2px solid var(--g-color-focus)',
            'outline-offset': '2px',
          },
        },
      });
      
      // Component base styles
      addComponents({
        '.g-btn': {
          '@apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 g-focus-visible': {},
          'background-color': 'var(--g-color-surface-button-default)',
          'color': 'var(--g-color-text-button)',
          'border': '1px solid transparent',
          
          '&:hover': {
            'background-color': 'var(--g-color-surface-button-hover)',
          },
          
          '&:disabled': {
            'background-color': 'var(--g-color-surface-button-inactive)',
            'color': 'var(--g-color-text-meta)',
            'cursor': 'not-allowed',
          },
        },
        
        '.g-btn-outline': {
          '@apply g-btn': {},
          'background-color': 'transparent',
          'color': 'var(--g-color-text-button-outline-default)',
          'border-color': 'var(--g-color-border-button-outline-default)',
          
          '&:hover': {
            'background-color': 'var(--g-color-surface-button-outline-hover)',
            'color': 'var(--g-color-text-button-outline-hover)',
            'border-color': 'var(--g-color-border-button-outline-hover)',
          },
        },
        
        '.g-input': {
          '@apply w-full px-3 py-2 text-sm rounded-md transition-colors duration-200 g-focus-visible': {},
          'background-color': 'var(--g-color-surface-field)',
          'border': '1px solid var(--g-color-border-field-default)',
          'color': 'var(--g-color-text-label)',
          
          '&::placeholder': {
            'color': 'var(--g-color-text-placeholder)',
          },
          
          '&:hover': {
            'border-color': 'var(--g-color-border-field-hover)',
          },
          
          '&:disabled': {
            'background-color': 'var(--g-color-surface-field-inactive)',
            'border-color': 'var(--g-color-border-field-inactive)',
            'cursor': 'not-allowed',
          },
        },
        
        '.g-card': {
          '@apply rounded-lg shadow-md': {},
          'background-color': 'var(--g-color-surface-dashboard-panel)',
          'border': '1px solid var(--g-color-border-furniture)',
        },
        
        '.g-panel': {
          '@apply p-6 g-card': {},
        },
      });
    },
  ],
}
