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
        customDarkSlateBlue: '#1D2E3D',
        CustomDeepTeal: '#1D374B',
        customฺBorder: '#5882C1',
        customฺButton: '#0D6E6E',
        customฺButtomHover: '#04504F ',
        customwhite: '#F1F2F3',
        customRed: '#FA5E55',
        custemMoreRed:'#8E1616'
      },
      backgroundImage: {
        customLinear: "linear-gradient(170deg, rgba(13, 31, 45, 1) 38%, rgba(28, 47, 64, 1) 78%), url('/imges/cycleBG.png')",
      },
      fontSize: {
        'tiny': '0.625rem',    // เพิ่มขนาดฟอนต์ใหม่ (10px)
        'xxs': '0.75rem',      // เพิ่มขนาดฟอนต์ใหม่ (12px)
        'xxl': '1.75rem',      // เพิ่มขนาดฟอนต์ใหม่ (28px)
        'huge': '3rem',        // เพิ่มขนาดฟอนต์ใหม่ (48px)
      },
      
      boxShadow: {
        'custom-shadow': '0px 48px 100px 0px rgba(17, 12, 46, 0.15)', // Add custom box-shadow
      },
      images: {
        domains: ["cloud.phraya.net"],
      },
    },
  },
  plugins: [],
}

