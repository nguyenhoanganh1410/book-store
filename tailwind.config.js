/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Poppins: ["Poppins"],
        Inter: ["Inter"],
        DMSans: ["DMSans"],
        Raleway: ["Raleway"],
      },
      colors: {
        primary: "#27B3A0",
        primaryText: "#505050",
        secondaryText: "#2D3E50",
        lightWhite: "#F0F2F5",
        lightGray: "#D0D5DD",
        gray20: "#333333",
        darkGrey: "#8A8A8A",
        mystic: "#DCE2EB",
        grayChateau: "#9CA3AF",
        borderDarkGrey: '#282626',
        purpleLight: '#be8cf5',
        whiteColor: '#FFF',
        orangeLight: '#EE8062',
        blackLight: '#33475B',
        grayLight: '#898989',
        blueLight: '#35B0A4',
        bgF6FAFD: '#F6FAFD',
        colorFF5276: '#FF5276'
      },
      dropShadow: {
        "custom-4-4": "0 4px 4px rgba(0, 0, 0, 0.25)",
        "custom-4-8": "0 4px 8px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
