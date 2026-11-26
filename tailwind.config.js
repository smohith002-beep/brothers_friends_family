/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bff: {
          midnight: "#06152D",
          deep: "#0A2348",
          electric: "#168BFF",
          ice: "#D8ECFF",
          gold: {
            DEFAULT: "#C8A96B",
            light: "#E2CF9F",
            dark: "#9E7F43",
            glow: "rgba(200, 169, 107, 0.4)",
          },
          softgrey: "#F4F6F9",
          navy: {
            950: "#030B17",
            900: "#06152D",
            850: "#0A2348",
            800: "#0E2F60",
            700: "#133D7D",
            600: "#1A4F9E",
          },
        },
      },
      fontFamily: {
        serif: ["'Cinzel'", "'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #DFCA9B 0%, #C8A96B 50%, #9E7F43 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 0%, rgba(200, 169, 107, 0.2) 50%, transparent 100%)",
        "luxury-navy": "radial-gradient(circle at 50% 20%, #0A2348 0%, #06152D 70%, #030B17 100%)",
      },
      boxShadow: {
        "gold-sm": "0 0 15px -3px rgba(200, 169, 107, 0.35)",
        "gold-lg": "0 10px 30px -5px rgba(200, 169, 107, 0.3)",
        "luxury": "0 20px 50px rgba(6, 21, 45, 0.6)",
      },
    },
  },
  plugins: [],
};
