/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          "00": "#FFFFFF",
          "100": "#F7F8F9",
          "200": "#F3F4F5",
          "300": "#EEEFF1",
          "400": "#DCDEE3",
          "500": "#D1D3D8",
          "600": "#B0B3BA",
          "700": "#868B94",
          "800": "#555D6D",
          "900": "#2A3038",
          "1000": "#1A1C20",
        },
        sogang: {
          100: "#FDF0F0",
          700: "#E84336",
          800: "#CA1D13",
          900: "#921708",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [],
};
