/** @type {import('tailwindcss').Config} */
export const prefix = 'tw-';
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      primary: '#6e02b1',
      secondary: '#26a69a',
      accent: '#9c27b0',
    },
  },
  fontFamily: {
    poppins: 'Poppins',
    anton: 'Anton',
  },
  screens: {
    sm: '600px',
    // => @media (min-width: 640px) { ... }

    md: '1024px',
    // => @media (min-width: 768px) { ... }

    lg: '1280px',
    // => @media (min-width: 1024px) { ... }

    xl: '1440px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1920px',
    // => @media (min-width: 1536px) { ... }
  },
};
export const plugins = [];
