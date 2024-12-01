/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        white: "#FFFFF0",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
         
      },

      borderLoading: {
        '0%': { borderColor: 'blue' },
        '25%': { borderColor: 'green' },
        '50%': { borderColor: 'yellow' },
        '75%': { borderColor: 'orange' },
        '100%': { borderColor: 'blue' },
      },

      animation: {
        borderLoading: 'borderLoading 2s linear infinite',
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        
      },
      boxShadow: {
        'glow-t': '0 -5px 10px 2px rgba(0, 112, 244, 0.6)', // Custom glow shadow
      },
    },
    screens: {
      xxs: "400px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
  darkMode: "class",
};
