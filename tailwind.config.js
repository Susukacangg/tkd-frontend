const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
      fontFamily: {
          sans: ['"Playfair Display"', 'Cambria', 'Georgia', 'Times', 'serif']
      },
      extend: {
          colors: {
              primary: "#f5bd02"
          },
      },
  },
  plugins: [],
});
