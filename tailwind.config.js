module.exports = {
  darkMode: "class", // <- pastikan ini ada
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        indigo: "#6366F1",
        softPink: "#FFDDEE",
        mistWhite: "#FAFAFF",
        richGray: {
          700: "#374151",
          800: "#1F2937",
        },
      },
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
