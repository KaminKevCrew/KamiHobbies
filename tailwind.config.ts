import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import icons from 'rocketicons/tailwind'

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
      require('daisyui'),
      icons
  ],

  daisyui: {
    themes: true,
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  }
} satisfies Config;
