# How to Request a README Update (AI Runnable)

Provide ONLY this file in future sessions to have the AI re-scan and update `README.md` without giving full repo context.

## What the AI will do

- Re-scan these sources: `package.json`, `vite.config.ts`, `tsconfig.json`, `eslint.config.ts`, `tailwind.config.ts`, `index.html`, `src/**/*.tsx`, `src/**/*.ts`.
- Update sections in `README.md`:
  - Prerequisites and Getting Started
  - Available scripts from `package.json`
  - Tech stack and configuration notes (Vite, React 19, React Compiler, Tailwind v4, TypeScript)
  - Project structure overview
  - **Badge version numbers** (sync with package.json versions)
- Keep wording concise, match existing style, do not over-explain.

## Rules

### General Guidelines

- Use Bun commands where possible; reflect `bun` as the package manager.
- Preserve existing README headings and tone, only patch relevant sections.
- Do not change license wording.
- **Keep updates concise** - avoid verbose explanations, focus on essential information.

### Logical Grouping

When adding or updating content, place information in the appropriate existing section:

- **Styling-related** → "Styling" section (TailwindCSS v4, CSS utilities, cva for variants)
- **React 19-related** → "React 19 Features" section (Activity component, useEffectEvent, React Compiler)
- **Performance-related** → "Performance Optimizations" section
- **State management** → "State Management" section (React Context, hooks)
- **Build tools** → "Build System" under "Tech Stack"
- **Linting** → "Code Quality" section (ESLint flat config, React Compiler rules)
- **Game mechanics** → "Game Features" or "How It Works" section

Do NOT create new top-level sections for features that fit within existing sections.

### Content Standards

- Reflect the React 19 and ESLint flat config standards.
- Mention React Compiler integration via `babel-plugin-react-compiler`.
- Mention `useEffectEvent` for stable event callbacks.
- Mention `Activity` component for background rendering.
- Mention ESLint plugins: `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.
- Keep code examples short and focused (remove verbose explanations).
- Use bullet points over paragraphs where possible.

### Badge Version Sync

Always check `package.json` for current versions and update README badges accordingly:

- React: `react` version
- TypeScript: `typescript` version
- TailwindCSS: `tailwindcss` version
- Vite: `vite` version
- ESLint: `eslint` version
- React Compiler: `babel-plugin-react-compiler` version

## Quick prompt you can paste

Copy this into the chat with this file attached:

```
Please update README.md based on the codebase. Keep sections accurate and concise, prefer Bun commands, include React 19 features (Activity, useEffectEvent), React Compiler notes, ensure scripts from package.json are reflected, sync badge version numbers with package.json, logically group new information into existing sections (no new top-level sections), and keep all updates brief. Keep headings and tone.
```

## Post-update

- Run lint check: `bun run lint`
- Test the build: `bun run build`
