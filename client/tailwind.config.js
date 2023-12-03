/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow : {
        logBtn : 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        header : 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
      },
      fontFamily : {
        Nova : "'Nova Square', sans-serif",
        Roboto : "'Roboto', sans-serif",
        OpenSans : "'Open Sans', sans-serif"
      }
    },
  },
  plugins: [],
}

