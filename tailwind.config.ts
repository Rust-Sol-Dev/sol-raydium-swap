import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#A70A50",
          100: "#f2dbab",
        },
      },
      backgroundImage: {
        "gradient-border":
          "linear-gradient(180deg, #FAE4B4 0%, #9D7B4B 52%, #E7D7AF 100%)",
        "gradient-btn":
          "linear-gradient(180deg, #A70A50 10.98%, #890b45 48.8%, #770034 91.46%)",
      },
    },
  },
  plugins: [],
};
export default config;
