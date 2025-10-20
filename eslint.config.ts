import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  // Base JS and TypeScript
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React core rules (flat) + JSX runtime
  {
    ...reactPlugin.configs.flat.recommended,
    settings: { react: { version: "detect" } },
  },
  reactPlugin.configs.flat["jsx-runtime"],

  // Hooks rules (compiler-aligned)
  reactHooks.configs.flat.recommended,

  // Project-specific additions
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // Disable ESLint rules that conflict with Prettier (must be last)
  eslintConfigPrettier,
]);
