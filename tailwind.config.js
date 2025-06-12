/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lilac: {
          500: '#C8A2C8',
          600: '#B689B6',
          900: '#8B5F8B',
        },
        lilac_shadow: "#56365C",
        french_lilac: "#86608E",
      } 
    },
  },
  plugins: [],
}

