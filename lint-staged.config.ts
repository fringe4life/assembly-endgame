import type { Configuration } from "lint-staged";

const config: Configuration = {
  // Lint and fix TypeScript/JavaScript files
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  // Format other files
  "*.{json,md,css,html}": "prettier --write",
};

export default config;
