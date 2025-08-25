/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          'primary': '#003C3D',     // Dark teal
          'accent': '#C1693C',      // Orange
          'beige': '#F8F0E3',       // Background beige
          'text': '#302C37',        // Body text
          'button-hover': '#B86F52', // Button hover
          'gradient-end': '#004C5FCC', // Gradient end color
        }
      },
      fontFamily: {
        'body': ['Roboto', 'Arial', 'Helvetica', 'sans-serif'],
        'heading-primary': ['Poppins', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        'heading-secondary': ['Trebuchet MS', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'heading-small': ['Cabin', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'h1-desktop': '4em',
        'h1-tablet': '7vw',
        'h1-mobile': '28px',
        'h2-desktop': '3.2em',
        'h2-tablet': '5vw',
        'h2-mobile': '40px',
        'h4-desktop': '22px',
        'h4-mobile': '18px',
        'body-desktop': '18px',
        'body-tablet': '14px',
        'body-mobile': '18px',
        'accent-text': '28px',
      },
      backgroundImage: {
        'button-gradient': 'linear-gradient(90deg, #C1693C, #004C5FCC)',
      },
      borderRadius: {
        'button': '10px',
      },
      boxShadow: {
        'button': '0 2px 8px rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
}