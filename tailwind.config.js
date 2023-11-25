/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "p-color": "#03045e",
        "s-color": "#023e8a",
        "t-color": "#0096c7",
        "f-color": "#48cae4",
        "indigo-color": "#818cf8",
      },
      keyframes: {
        "move-x": {
          "0%, 100%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(8deg)" },
        },
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "move-x": "move-x 1s ease-in-out infinite",
        anim: "tra",
      },
    },
  },
  plugins: [require("daisyui")],
};
