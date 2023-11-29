module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '101': '1.01',
        '103': '1.03',
        '98': '0.98'
      }
    }
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss-elevation'),
  ],
  daisyui: {
    themes: ["light", "dark", "black", "sunset", "aqua"],
  },
}