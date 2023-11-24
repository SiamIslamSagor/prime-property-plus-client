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
    },
  },
  plugins: [require("daisyui")],
};
