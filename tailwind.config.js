import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // Fonts
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Body text
        display: ["'Space Grotesk'", "Inter", "sans-serif"], // Hero titles, headings
      },

      // Custom screens
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      // Colors
      colors: {
        primary: "#6791dd",
        secondary: "#17abdc",
        accent: "#f0f0f0",
        "text-dark": "#e0e0e0",
        "text-light": "#1a1a1a",
        "background-dark": "#0e0e1a",
        "background-light": "#fafafa",
        "nav-background-dark": "#1a1a2e",
        "nav-background-light": "#ffffff",
        "button-background": "#6791dd",
        "button-hover": "#557ac6",
        gold: "#FFD700",
        platinum: "#e5e4e2",
        royal: "#7F00FF",
        ocean: "#00c6ff",
      },

      // Layout
      spacing: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
        192: "48rem",
        224: "56rem",
        256: "64rem",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
      },
      aspectRatio: {
        a4: "1 / 1.414",
      },

      // Shadows
      boxShadow: {
        glass: "0 8px 32px rgba(31, 38, 135, 0.2)",
        neon: "0 0 8px #6791dd, 0 0 16px #17abdc",
      },

      // Radius
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        glass: "2rem",
      },

      // Blur sizes
      blur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },

      // Z-Index
      zIndex: {
        max: "9999",
      },

      // Backgrounds
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      },

      // Animations
      animation: {
        "text-glow": "text-glow 3s ease-in-out infinite",
        "pulse-slow": "pulse 6s ease-in-out infinite",
        dropShadow: "dropShadow 0.3s ease-in-out",
        float: "float 6s ease-in-out infinite",
        flicker: "flicker 3s infinite alternate",
      },

      // Keyframes
      keyframes: {
        "text-glow": {
          "0%, 100%": {
            textShadow: "0 0 10px #6791dd, 0 0 20px #17abdc",
          },
          "50%": {
            textShadow: "0 0 20px #6791dd, 0 0 40px #17abdc",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            opacity: "0.99",
          },
          "20%, 24%, 55%": {
            opacity: "0.4",
          },
        },
        dropShadow: {
          title: "0 2px 4px rgba(0,0,0,0.3)",
        },
      },
    },
  },
  plugins: [forms, typography, aspectRatio],
};
