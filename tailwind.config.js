/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown': '#B38F66',
        'cyan': '#214454'
      },
      keyframes: {
        widthDown: {
          '0%': { transform: 'translateY(-88px)'},
          '100%' : { transform: 'translateY(0px)'},
        },
        removeButtonUp: {
          '0%': { transform: 'translateY(42px)' },
          '100%' : { transform: 'translateY(0px)' },
        },
        expenseFormSwipeLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%' : { transform: 'translateX(0px)' },
        },
        expenseFormSwipeRight: {
          '0%': { transform: 'translateX(0px)' },
          '100%' : { transform: 'translateX(100%)' },
        },
      },
      animation: {
        widthDown: 'widthDown 0.5s ease-in-out',
        removeButtonUp: 'removeButtonUp 0.5s ease-in-out',
        expenseFormSwipeLeft: 'expenseFormSwipeLeft 0.5s ease-in-out',
        expenseFormSwipeRight: 'expenseFormSwipeRight 0.5s ease-in-out'
      }
    }
  },
  plugins: [],
}
