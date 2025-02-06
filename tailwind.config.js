module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: '#FFA500',
        'orange-dark': '#CC8400', // Darker shade of orange
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
          '@apply uppercase bg-orange hover:bg-orange-dark text-white py-3 px-5 rounded-full mt-4 transition ease-in-out font-medium': {},
        },
        '.corporate-btn': {
          '@apply uppercase bg-orange hover:bg-orange-dark text-white py-3 px-3 rounded-full mt-4 transition ease-in-out font-medium': {},
        },
      });
    },
  ],
}