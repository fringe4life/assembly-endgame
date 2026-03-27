import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Global CSS variables (injected on :root) and Preflight (CSS reset)
  globalVars: {
    "--min-height": "4rem",
  },
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Pre-generate utilities for language badge colors (used via runtime `css()` in App).
  staticCss: {
    css: [
      {
        properties: {
          color: ["white", "neutral.900"],
          backgroundColor: [
            "orange.700",
            "blue.500",
            "yellow.200",
            "cyan.400",
            "blue.600",
            "green.700",
            "lime.400",
            "red.600",
            "indigo.700",
          ],
        },
      },
    ],
  },

  // Theme customization (tokens, breakpoints, semantic roles)
  theme: {
    extend: {
      tokens: {
        colors: {
          // Brand cream (used as `color: "white"` in components)
          white: { value: "#f9f4da" },
          // Page shell (matches previous global oklch values)
          pageCanvas: { value: "oklch(27.8% 0.033 256.848)" },
          shellSurface: { value: "oklch(26.9% 0 0)" },
        },
        animations: {
          top: { value: "top ease-in 500ms 1" },
          right: { value: "right ease-out 750ms 1" },
          left: { value: "left ease-in-out 1s 1" },
          bottom: { value: "bottom ease-in 1.25s 1" },
        },
      },
      semanticTokens: {
        colors: {
          "bg.canvas": { value: { base: "{colors.pageCanvas}" } },
          "bg.shell": { value: { base: "{colors.shellSurface}" } },
          "text.muted": { value: { base: "{colors.neutral.400}" } },
          "intent.success": { value: { base: "{colors.green.600}" } },
          "intent.danger": { value: { base: "{colors.red.500}" } },
          "intent.info": { value: { base: "{colors.violet.500}" } },
        },
      },
      breakpoints: {
        xs: "288px",
      },
      keyframes: {
        top: {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        right: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        left: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        bottom: {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },

  // Global layout/typography (View Transition rules stay in src/index.css)
  globalCss: {
    body: {
      fontFamily: '"Hanken Grotesk", sans-serif',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      fontSynthesis: "none",
      textRendering: "optimizeLegibility",
      bg: "bg.canvas",
    },
    footer: {
      marginBlockStart: "4",
      color: "white",
      textAlign: "center",
    },
    "body > div": {
      maxInlineSize: "592px",
      minBlockSize: "100dvh",
      marginInline: "auto",
      bg: "bg.shell",
    },
    "#root": {
      inlineSize: "100%",
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
