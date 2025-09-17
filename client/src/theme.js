// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // adjust paths based on your setup
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#5739ebff",
          100: "#e9d8fd",
          500: "#6b46c1", // purple used in sidebar
        },
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
