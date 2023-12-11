import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        appearFromRight: "appearFromRight 0.25s ease-in-out forwards",
        fadeToLeft: "fadeToLeft 0.25s ease-in-out forwards",
        fadeIn: "fadeIn 1s ease-in-out forwards",
        fadeOut: "fadeOut 1s ease-in-out forwards",
      },
      keyframes: {
        appearFromRight: {
          from: {
            opacity: '0',
            transform: 'translateX(-200px)'
            // transform: 'translateX(100px)'
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        fadeToLeft: {
          from: {
            opacity: '1',
            // transform: 'translateX(100px)'
          },
          to: {
            opacity: '0',
            transform: 'translateX(100px)'
          }
        },
        fadeIn: {
          from: {
            opacity: "0",
            bottom: "50",
             transform: "translateY(-100px)"
          },
          to: {
            opacity: "1",
            // bottom: "2.5rem",
            transform: "translateY(0px)",
          },
        },
        fadeOut: {
          from: {
            opacity: "1",
            bottom: "2.5rem",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            bottom: "50",
            transform: "translateY(-100px)",
          },
        },
      },
      container: {
        padding: "3rem",
      },
      backgroundImage: {
        "gradient-green":
          "linear-gradient(352deg, #54AB72 5.5%, #4E9447 93.38%)",
        "gradient-green-2": "linear-gradient(180deg, #2AB032 0%, #109C59 100%)",
        "gradient-green-3":
          "linear-gradient(0deg, #E1FFE9 0%, #F9FAFB 103.77%)",
        "primary-gradient": "linear-gradient(180deg, #2AB032 0%, #109C59 100%)",
        "primary-hover-gradient":
          "linear-gradient(180deg, #129625 0%, #0B6D38 100%)",
      },
      colors: {
        "light-silver": "#D1D5DB",
        "bright-gray": "#E5E7EB",
        "ghost-white": "#F9FAFB",
        plantinum: "#E1E3E7",
        "anti-flash-white": "#F3F4F6",
        "azureish-white": "#DCF3E7",
        "primary-green": "#54AB72",
        independence: "#4B5563",
        "cadget-grey": "#9CA3AF",
        nyanza: "#E1FFE9",
        charcoal: "#374151",
        "dark-jungle-green": "#0F172A",
        "blue-berry": "#3F83F8",
        linen: "#FDECEB",
        "carmine-pink": "#F04438",
        dandelion: "#FFD66D",
        "auro-metal-saurus": "#6B7280",
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".overflow-overlay": {
          overflow: "overlay",
        },
      });
    }),
  ],
};
export default config;
