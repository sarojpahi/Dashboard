module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        cus: "1fr 2fr 1fr 1fr",
      },
    },
  },
  plugins: [],
};
