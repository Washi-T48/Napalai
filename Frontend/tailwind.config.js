/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // ตั้ง Roboto เป็นฟอนต์เริ่มต้น
      },
      colors: {
        customBlue: '#0D1F2D',
        customSlateBlue: '#354656',
        customฺBorder: '#5882C1',
        customฺButton: '#0D6E6E',
        customฺButtomHover: '#4A9D9C',
        customwhite: '#F1F2F3'
      },
    },
  },
  plugins: [],
}

