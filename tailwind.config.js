/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#1D48E7",
        brandLightBlue: "#ECF0FD",
        brandDark: "#2C2C2C",
        brandWhite: "#fff",
        brandGray: "#A2A2A3",
      },
      boxShadow: {
        'custom-xl': '0 10px 20px rgba(65, 101, 235, 0.8)',
      },
    },
  },
  plugins: [],
}

