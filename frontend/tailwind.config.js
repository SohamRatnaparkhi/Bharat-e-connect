/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'mont': ['var(--font-mont)'],
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'rad-blue-grad-tl': 'radial-gradient(circle at top left, #5D8BF436, transparent 40%)',
        'rad-blue-grad-tr': 'radial-gradient(circle at top right, #5D8BF436, transparent 40%)',
        'rad-blue-grad-bl': 'radial-gradient(circle at bottom left, #5D8BF436, transparent 40%)',
        'rad-blue-grad-br': 'radial-gradient(circle at bottom right, #5D8BF436, transparent 40%)',
        'rad-blue-grad-tl-br': 'radial-gradient(circle at top left, #5D8BF436, transparent 40%), radial-gradient(circle at bottom right, #5D8BF436, transparent 40%)',
        'rad-blue-grad-tr-bl': 'radial-gradient(circle at top right, #5D8BF436, transparent 50%), radial-gradient(circle at bottom left, #5D8BF436, transparent 50%)',

        'app-logo': 'url(/logos/BharatConnect-logo.png)',
        'aicte-logo': 'url(/logos/aicte-logo.png)',
      },
      height: {
        '5%': '5%',
        '10%': '10%',
        '15%': '15%',
        '20%': '20%',
        '25%': '25%',
        '30%': '30%',

        '70%':'70%',
        '75%':'75%',
        '80%':'80%',
        '85%':'85%',
        '90%':'90%',
        '95%':'95%',
      },
      width: {
        '5%': '5%',
        '10%': '10%',
        '15%': '15%',
        '20%': '20%',
        '25%': '25%',
        '30%': '30%',

        '70%':'70%',
        '75%':'75%',
        '80%':'80%',
        '85%':'85%',
        '90%':'90%',
        '95%':'95%',
      },
    },
  },
  plugins: [],
}