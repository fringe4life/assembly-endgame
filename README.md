# Assembly Endgame 🎮

[![React](https://img.shields.io/badge/React-19.3.0--canary-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.0.3-646CFF?logo=vite)](https://vite.dev)
[![Panda CSS](https://img.shields.io/badge/Panda%20CSS-1.9.1-FF6B4A?logo=css3)](https://panda-css.com)
[![Biome](https://img.shields.io/badge/Biome-2.4.7-60A5FA?logo=biome)](https://biomejs.dev)
[![Ultracite](https://img.shields.io/badge/Ultracite-7.3.2-7C3AED)](https://github.com/haydenbleasel/ultracite)
[![React Compiler](https://img.shields.io/badge/React%20Compiler-1.0.0-149ECA?logo=react)](https://react.dev/learn/react-compiler)
[![Husky](https://img.shields.io/badge/Husky-9.1.7-42B983?logo=git)](https://typicode.github.io/husky)

A word-guessing game built with React 19, featuring the React Compiler for automatic optimization and modern React patterns including `Activity` components and `useEffectEvent`.

## ✨ Features

- **Word Guessing Game**: Guess programming language names before time runs out
- **Difficulty Levels**: Easy (60s), Medium (45s), Hard (30s)
- **Smooth Animations**: ViewTransition API for buttery-smooth UI state changes
- **Visual Feedback**: Languages "catch fire" as you make mistakes
- **Win/Loss States**: Confetti on win, Assembly code taunts on loss
- **Audio Effects**: Evil laughter when you lose
- **Fully Typed**: 100% TypeScript with strict mode

## 🚀 Tech Stack

### Core

- **React 19.3 Canary** - Latest React with ViewTransition API
- **TypeScript 6** - Type safety and developer experience
- **Vite 8** - Lightning-fast dev server and build tool

### Styling

- **Panda CSS** - CSS-in-JS with generated `styled-system` utilities and recipes
- **CVA-style recipes** - `cva` from Panda for component variants (`styled-system/css`)

### Build & Tooling

- **React Compiler** - `@vitejs/plugin-react` with `@rolldown/plugin-babel` and `reactCompilerPreset()`
- **Biome + Ultracite** - Linting and formatting via `ultracite check` / `ultracite fix` (extends Biome with project presets)
- **lint-staged** - Runs `ultracite fix` on staged files

## 🎯 React 19 Features

This project showcases modern React 19 patterns:

### Activity Component

Used for background rendering at lower priority instead of conditional mounting:

```tsx
<Activity mode={isPlaying ? "visible" : "hidden"}>
  <GameInfo />
</Activity>
```

**Benefits:**

- Components stay mounted and preserve state
- Hidden components render at lower priority
- Avoids expensive mount/unmount cycles
- Smoother transitions

### ViewTransition

Smooth, animated transitions between UI states using the browser's View Transition API:

```tsx
<ViewTransition>
  <FlexWrap>{keyboardJSX}</FlexWrap>
</ViewTransition>
```

**Implemented transitions:**

- **Keyboard letters**: 300ms shared element morph when changing from unpressed → correct/wrong
- **Word letters**: Slide down into place with `translateY` animation
- **Timer digits**: Individual digit animations - old digits slide down and fade out, new digits slide in from above
- **GameInfo**: Slide in from left with small skew, slide out to right with larger skew (faster)
- **Languages, GameStatus, Difficulty**: Cross-fade transitions

**How it works:**

- All state updates wrapped in `startTransition` via context functions
- CSS `view-transition-name` properties enable shared element animations
- Custom keyframes for enter/exit animations with skew and translation

### useEffectEvent

Stable event callbacks that don't trigger effect re-runs:

```tsx
const onTimerEnd = useEffectEvent(() => {
  updateTimerLost(true);
});

useEffect(() => {
  // Timer logic with stable callback
}, [gameOver, timer, isPlaying]);
```

### React Compiler

Automatic optimization via Rolldown Babel preset - no manual `useMemo`/`useCallback` needed:

```typescript
// vite.config.ts
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
});
```

## 📦 Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+

## 🛠️ Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint / format (Biome via Ultracite)
bun run check
bun run fix

# Typecheck only
bun run type
```

## 📁 Project Structure

```
src/
├── components/              # UI components (badge, button, difficulty, game-*, etc.)
├── hooks/                   # useCountdown, useGameContext
├── store/                   # game-context, endgame-context-provider, use-game-context
├── assets/                  # Static assets (audio)
├── app.tsx                  # Main app
├── main.tsx                 # Entry
├── languages.ts             # Programming languages data
├── utils.ts                 # Utilities
└── words.ts                 # Word list
styled-system/               # Generated by Panda CSS (panda codegen)
panda.config.ts              # Panda theme and static CSS
```

## 🎨 State Management

Uses React Context API with derived state patterns:

- **Game State**: Win/loss status, guessed letters, current word
- **Timer State**: Countdown timer with difficulty-based duration
- **UI State**: Playing status, difficulty selection
- **Derived State**: `gameLost` and `isPlaying` computed from source state (no useEffect needed)

## 🧪 Code Quality

### Biome and Ultracite

- **`biome.jsonc`** extends Ultracite presets (`ultracite/core`, `ultracite/react`, Biome layers)
- **`bun run check`** - `ultracite check`
- **`bun run fix`** - `ultracite fix`

### Pre-commit Hooks

Husky + lint-staged run Ultracite on staged files (`lint-staged.config.ts`).

### Performance Optimizations

- **Lazy Loading**: AudioPlayer and Confetti components load only when needed
- **Derived State**: Eliminates unnecessary useEffect chains
- **React Compiler**: Automatic memoization without manual optimization
- **ViewTransitions**: Smooth animations with browser-native API

## 🎮 How It Works

1. **Select Difficulty**: Choose time limit (30s, 45s, or 60s)
2. **Start Playing**: Click any letter to begin
3. **Guess Letters**: Click letters to guess the hidden word
4. **Win Condition**: Reveal all letters before time/attempts run out
5. **Loss Condition**: Run out of time or make too many wrong guesses

## 🔧 Configuration Files

- `vite.config.ts` - Vite, React plugin, React Compiler (Rolldown Babel)
- `tsconfig.json` / `tsconfig.app.json` - TypeScript project references
- `biome.jsonc` - Biome + Ultracite extends
- `panda.config.ts` - Panda CSS theme and codegen
- `postcss.config.cjs` - Panda PostCSS plugin
- `lint-staged.config.ts` - Pre-commit Ultracite fix

## 📝 Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `bun run dev`        | Start development server             |
| `bun run build`      | Typecheck and build for production   |
| `bun run preview`    | Preview production build             |
| `bun run check`      | Ultracite / Biome check              |
| `bun run fix`        | Ultracite / Biome fix                |
| `bun run type`       | `tsc --noEmit`                       |
| `bun run prepare`    | Panda codegen + Husky (after install) |

## 🤝 Contributing

This is a learning project from the Scrimba Frontend Developer Path. Feel free to fork and experiment!

## 📄 License

MIT
