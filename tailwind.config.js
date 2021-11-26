module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './src/components/*.{js,jsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Open: ['Open Sans', 'sans-serif'],
      Bebas: ['Bebas Neue', 'cursive'],
    },
    backgroundImage: {
      design: 'url(../assets/bg.png)',
    },
    transitionProperty: {
      width: 'width',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
