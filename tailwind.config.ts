// Tailwind maps utility names to the central brand tokens; components avoid duplicated hex values.
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        burgundy: "var(--color-burgundy)",
        "burgundy-deep": "var(--color-burgundy-deep)",
        ivory: "var(--color-ivory)",
        cream: "var(--color-cream)",
        gold: "var(--color-gold)",
        espresso: "var(--color-espresso)",
        charcoal: "var(--color-charcoal)",
      },
      fontFamily: {
        display: "var(--font-display)",
        ui: "var(--font-ui)",
        label: "var(--font-label)",
      },
      maxWidth: { content: "var(--content-max)" },
      minHeight: { touch: "44px" },
      minWidth: { touch: "44px" },
    },
  },
  plugins: [],
};

export default config;
