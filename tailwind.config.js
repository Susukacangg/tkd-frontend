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
      },
  },
  corePlugins: {
      preflight: false,
  },
  plugins: [],
};
