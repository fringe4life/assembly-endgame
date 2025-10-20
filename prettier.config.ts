import type { Config } from "prettier";

const config: Config = {
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 80,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
