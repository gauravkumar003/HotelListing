/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '13px',
        'base': '14px',
        'lg': '16px',
        'xl': '18px',
      },
      colors: {
        primary: {
          DEFAULT: '#1e3c7b',
          light: '#2a4c8b',
          dark: '#15294f',
        },
        secondary: {
          DEFAULT: '#4267b2',
          light: '#5c7cbc',
          dark: '#385da3',
        },
        success: {
          DEFAULT: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
        },
        warning: {
          DEFAULT: '#ed6c02',
          light: '#ff9800',
          dark: '#e65100',
        },
        danger: {
          DEFAULT: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828',
        },
        info: {
          DEFAULT: '#0288d1',
          light: '#03a9f4',
          dark: '#01579b',
        },
        background: {
          DEFAULT: '#f5f7fa',
          paper: '#ffffff',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#666666',
          disabled: '#9e9e9e',
        },
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};