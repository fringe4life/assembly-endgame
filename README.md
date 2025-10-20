# Assembly Endgame 🎮

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7.1.11-646CFF?logo=vite)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.14-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![ESLint](https://img.shields.io/badge/ESLint-9.38.0-4B32C3?logo=eslint)](https://eslint.org)
[![Prettier](https://img.shields.io/badge/Prettier-3.6.2-F7B93E?logo=prettier)](https://prettier.io)
[![Husky](https://img.shields.io/badge/Husky-9.1.7-42B983?logo=git)](https://typicode.github.io/husky)

A word-guessing game built with React 19, featuring the React Compiler for automatic optimization and modern React patterns including `Activity` components and `useEffectEvent`.

## ✨ Features

- **Word Guessing Game**: Guess programming language names before time runs out
- **Difficulty Levels**: Easy (60s), Medium (45s), Hard (30s)
- **Visual Feedback**: Languages "catch fire" as you make mistakes
- **Win/Loss States**: Confetti on win, Assembly code taunts on loss
- **Audio Effects**: Evil laughter when you lose
- **Fully Typed**: 100% TypeScript with strict mode

## 🚀 Tech Stack

### Core

- **React 19.2** - Latest React with concurrent features
- **TypeScript 5.9** - Type safety and developer experience
- **Vite 7** - Lightning-fast dev server and build tool

### Styling

- **TailwindCSS v4** - Utility-first CSS framework
- **CVA** - Class variance authority for component variants
- **tailwind-merge** - Merge Tailwind classes intelligently

### Build & Tooling

- **React Compiler** - Automatic memoization and optimization
- **ESLint 9** - Flat config with React-specific rules
- **Prettier 3.6** - Code formatter with Tailwind CSS class sorting
- **TypeScript ESLint** - Type-aware linting

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

### useEffectEvent

Stable event callbacks that don't trigger effect re-runs:

```tsx
const updateGameState = useEffectEvent(
  (gameOver: boolean, wrongGuessCount: number) => {
    setGameLost((prev) => prev || wrongGuessCount >= attemptsLeft);
    setIsPlaying((prev) => (gameOver ? false : prev));
  }
);

useEffect(() => {
  updateGameState(gameOver, wrongGuessCount, attemptsLeft);
}, [gameOver, wrongGuessCount, attemptsLeft]);
```

### React Compiler

Automatic optimization via Babel plugin - no manual `useMemo`/`useCallback` needed:

```typescript
// vite.config.ts
react({
  babel: {
    plugins: [["babel-plugin-react-compiler"]],
  },
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

# Lint code
bun run lint
```

## 📁 Project Structure

```
src/
├── components/       # UI components
│   ├── Badge.tsx    # Language badges
│   ├── Button.tsx   # Generic button
│   ├── Difficulty.tsx # Difficulty selector
│   ├── GameInfo.tsx # Timer and attempts display
│   ├── GameStatus.tsx # Win/loss messages
│   ├── GuessLetter.tsx # Letter display
│   ├── Header.tsx   # Game header
│   ├── Key.tsx      # Keyboard key component
│   └── NewGame.tsx  # New game button
├── hooks/           # Custom React hooks
│   ├── useCountdown.tsx # Game timer logic
│   └── useGameContext.tsx # Context hook
├── store/           # State management
│   ├── endgame-context-provider.tsx # Game state provider
│   └── game-context.tsx # Context definition
├── assets/          # Static assets (audio)
├── App.tsx          # Main app component
├── languages.ts     # Programming languages data
├── utils.ts         # Utility functions
└── words.ts         # Word list
```

## 🎨 State Management

Uses React Context API with custom hooks:

- **Game State**: Win/loss status, guessed letters, current word
- **Timer State**: Countdown timer with difficulty-based duration
- **UI State**: Playing status, difficulty selection

## 🧪 Code Quality

### ESLint Flat Config

Modern ESLint 9 configuration with:

- `eslint-plugin-react` - React-specific rules
- `eslint-plugin-react-hooks` - Hooks rules with React Compiler support
- `eslint-plugin-react-refresh` - Fast refresh validation
- `typescript-eslint` - TypeScript-aware linting
- `eslint-config-prettier` - Disables conflicting ESLint rules

### React Compiler Linting

The `eslint-plugin-react-hooks` now includes React Compiler rules:

- `react-hooks/rules-of-hooks` - Enforces Rules of Hooks
- `react-hooks/exhaustive-deps` - Validates effect dependencies
- Compiler-specific rules for refs, purity, and optimization

### Prettier with Tailwind

Prettier automatically formats code and sorts Tailwind CSS classes:

- `prettier-plugin-tailwindcss` - Sorts classes in recommended order
- Works in JSX className, function calls (clsx, cva), and template literals
- Configured via `prettier.config.ts` for type safety

### Pre-commit Hooks

Husky + lint-staged ensure code quality before commits:

- `husky@9` - Git hooks made easy
- `lint-staged@16` - Run linters/formatters on staged files
- Configured via `lint-staged.config.ts` with TypeScript types

## 🎮 How It Works

1. **Select Difficulty**: Choose time limit (30s, 45s, or 60s)
2. **Start Playing**: Click any letter to begin
3. **Guess Letters**: Click letters to guess the hidden word
4. **Win Condition**: Reveal all letters before time/attempts run out
5. **Loss Condition**: Run out of time or make too many wrong guesses

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration with React Compiler
- `tsconfig.json` - TypeScript project references
- `eslint.config.ts` - ESLint flat config with Prettier integration
- `prettier.config.ts` - Prettier configuration with Tailwind plugin
- `lint-staged.config.ts` - Pre-commit hook configuration

## 📝 Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `bun run dev`     | Start development server  |
| `bun run build`   | Build for production      |
| `bun run lint`    | Run ESLint                |
| `bun run format`  | Format code with Prettier |
| `bun run preview` | Preview production build  |

## 🤝 Contributing

This is a learning project from the Scrimba Frontend Developer Path. Feel free to fork and experiment!

## 📄 License

MIT
