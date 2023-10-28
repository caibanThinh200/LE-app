import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        padding: "3rem",
      },
      backgroundImage: {
        "gradient-green":
          "linear-gradient(352deg, #54AB72 5.5%, #4E9447 93.38%)",
        "primary-gradient": "linear-gradient(180deg, #2AB032 0%, #29CC7E 100%)",
        "primary-hover-gradient": "linear-gradient(180deg, #129625 0%, #0B6D38 100%)"
      },
      colors: {
        "light-silver": '#D1D5DB',
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
        "carmine-pink": "#F04438"
      },
    },
  },
  plugins: [],
};
export default config;
