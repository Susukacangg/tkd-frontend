/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  important: true,
  theme: {
      extend: {
          colors: {
              primary: "#f5bd02"
          },
          screens: {
              'xs': '480px',
              'xxs': '320px',
          },
      },
  },
  corePlugins: {
      preflight: false,
  },
  plugins: [],
};
