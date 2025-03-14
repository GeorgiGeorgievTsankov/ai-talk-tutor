/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}' // Updated to look for .jsx instead of .tsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};