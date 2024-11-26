/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        colors: {
        main: '#F3C5C5',
        secondary: '#C1A3A3',
        tertiary: '#886F6F',
        brownie: '#694E4E',
            white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}