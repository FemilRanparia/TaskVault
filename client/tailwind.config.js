export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Futuristic gradient palette
        primary: {
          50: "#f0f0ff",
          100: "#e6e6ff",
          200: "#ccccff",
          300: "#b3b3ff",
          400: "#9999ff",
          500: "#7f7fff",
          600: "#6666ff",
          700: "#4c4cff",
          800: "#3333cc",
          900: "#1a1a99",
        },
        accent: {
          50: "#f0faff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c3d66",
        },
        cyber: {
          dark: "#0a0e27",
          darker: "#060914",
          light: "#1a1f3a",
          neon: "#00d9ff",
          purple: "#b366ff",
          pink: "#ff006e",
          lime: "#00ff00",
        }
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        'gradient-neon': 'linear-gradient(135deg, #00d9ff 0%, #b366ff 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-pink': '0 0 20px rgba(255, 0, 110, 0.3)',
        'glow-purple': '0 0 20px rgba(179, 102, 255, 0.3)',
      }
    },
  },
  plugins: [],
};

