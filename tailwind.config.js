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
        "bounce-x": {
          "0%, 20%, 50%, 80%, 100%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 0.2, 1)",
          },
          "40%": {
            transform: "translateX(-10px)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 0.2, 1)",
          },
          "60%": {
            transform: "translateX(-8px)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "move-x": "move-x 1s ease-in-out infinite",
        "bounce-x": "bounce-x 1.9s infinite 350ms",
        anim: "tra",
      },
    },
  },
  plugins: [require("daisyui")],
};
