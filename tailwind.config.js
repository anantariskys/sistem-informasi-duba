/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aquaMint: '#6FD0B4',
        blueGradient: {
          start: '#2D99DA',
          end: '#64C2BF',
        },
        magentaPink: {
          start: '#C62D83',
          end: '#862B90',
        },
        darkPurple: '#901B81',
      },
    },
  },
  plugins: [],
};
