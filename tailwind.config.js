//  Allow for custom css for the corporate colors
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'red-light': '#FF6666', // Lighter shade of red
        'red-dark': '#CC0000', // Darker shade of red
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.corporate': {
          '@apply uppercase bg-red-dark hover:bg-red-light text-white py-3 px-5 rounded-full mt-4 transition ease-in-out font-medium transform hover:scale-105': {},
        },
        '.corporate-btn': {
          '@apply uppercase bg-red-dark hover:bg-red-light text-white py-3 px-3 rounded-full mt-4 transition ease-in-out font-medium transform hover:scale-105': {},
        },
      });
    },
  ],
}