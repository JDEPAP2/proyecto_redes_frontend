const flowbite = require("flowbite-react/tailwind");
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily:{
        'sans': ["Afacad Flux","Proxima Nova", ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'bg': "url('/public/bg.jpg')",
        'logo': "url('/public/Logo.svg')",

      },
      height: {
        '100': '30rem',
        '120':"30rem",
        '128': '32rem',
        '132': '37rem',
        '150': '45rem',
        '170': '70rem',
        '180': '82rem',
        '200': '90rem',
      },
      width: {
        '100': '28rem',
        '120': "45rem",
        '128': '50rem',
        '150': '60rem',
        '170': '70rem',
        '180': '82rem',
        '200': '90rem',
      },
      minHeight:{
          '100': '28rem',
          '120':"30rem",
          '125':"31rem",
          '128': '32rem',
          '130': '40rem',
          '135': '48rem',
          '150': '60rem',
          '170': '70rem',
          '180': '82rem',
          '200': '90rem',
      }
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
}