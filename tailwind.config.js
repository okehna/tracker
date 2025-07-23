// tailwind.config.js
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      fontFamily: {
        gothic: ["'Century Gothic'", "sans-serif"],
        gothicBold: ["'Century Gothic Bold'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
