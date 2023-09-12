/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'black': '#151D1F',
      'white': '#FFF',
      'sec-blue': '#2D31FA',
      'dark-blue': '#051367',
      'light-blue': '#5D8BF4',
      'sky-blue': '#EDF2FE',
      'light-green': '#95F7B2',
      'slate-1': '#03C5C7',
      'slate-2': '#04DFFC',
    },
    
    extend: {
      fontFamily: {
        'mont': ['var(--font-mont)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        '5%': '5%',
        '10%': '10%',
        '15%': '15%',
        '20%': '20%',
        '25%': '25%',
        '30%': '30%',

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