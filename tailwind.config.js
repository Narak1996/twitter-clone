/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontFamily:{
      sans:['"Assistant"','sans-serif']
    },
    extend: {
      colors:{
        'primary-100':'rgba(52, 152, 219,0.2)',
        'danger-100':'rgba(231, 76, 60,0.2)',
        'light-500':'rgba(245, 246, 250,1.0)',
        'success-100':'rgba(46, 204, 113,0.2)',


        'success':'rgba(46, 204, 113,1.0)',
        'primary':'rgba(52, 152, 219,1.0)',
        'info':'rgba(26, 188, 156,1.0)',
        'warning':'rgba(230, 126, 34,1.0)',
        'danger':'rgba(231, 76, 60,1.0)',
        'light':'rgba(236, 240, 241,1.0)',
        'bee':'rgba(241, 196, 15,1.0)',
        'violet':'rgba(155, 89, 182,1.0)',
        'dark':'rgba(52, 73, 94,1.0)',


        'primary-o':'rgba(41, 128, 185,1.0)',
        'success-o':'rgba(46, 204, 113,1.0)',
        'info-o':'rgba(22, 160, 133,1.0)',
        'warning-o':'rgba(211, 84, 0,1.0)',
        'danger-o':'rgba(192, 57, 43,1.0)',
        'light-o':'rgba(189, 195, 199,1.0)',
        'bee-o':'rgba(243, 156, 18,1.0)',
        'violet-o':'rgba(142, 68, 173,1.0)',
        'dark-o':'rgba(44, 62, 80,1.0)',
        'shadow':'rgba(44, 62, 80,0.4)',
      },
      animation: {
        fade: 'fadeOut 0.4s ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.transparent') },
        },
      }),
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

