# Git Commit Message Template

## Usage

Supply this file to the AI to generate a git commit message based on changes since the last commit. For small changes, aim for 140 characters. For large changes (10+ files or 100+ lines), allow up to 300 characters.

## Format

The AI should:

1. Analyze the git diff to understand changes
2. Create a concise commit message under 140 characters for small changes
3. For large changes (10+ files or 100+ lines), allow up to 300 characters
4. Use conventional commit format: `type: description`
5. Focus on the most significant changes
6. Use commas instead of dashes between items (per user preference)
7. Prioritize the most impactful changes when space is limited

## Commit Types

- `feat`: New features or game mechanics
- `fix`: Bug fixes
- `refactor`: Code refactoring
- `docs`: Documentation changes
- `style`: Code style changes (formatting, CSS)
- `test`: Test changes
- `chore`: Maintenance tasks (deps, config)
- `perf`: Performance improvements
- `build`: Build system changes

## Examples

### Small Changes (under 140 chars)

- `refactor: extract useGameContext to separate file, update imports`
- `feat: add Activity component for background rendering`
- `fix: resolve ESLint errors with useEffectEvent pattern`
- `chore: upgrade React 19.2, update ESLint to flat config`

### Large Changes (up to 300 chars)

- `feat: migrate to ESLint flat config, add React Compiler rules, implement useEffectEvent for stable callbacks, convert conditional renders to Activity component, extract context hooks, upgrade React 19.2 and deps, resolve all linting errors`
- `refactor: reorganize game state management, extract custom hooks (useCountdown, useGameContext), implement Activity for optimized rendering, add useEffectEvent for effect callbacks, update component structure`

## Instructions for AI

1. Run `git diff` to see unstaged changes
2. Run `git diff --cached` to see staged changes
3. Run `git diff --stat` to see change summary
4. Analyze the changes and categorize them
5. Count files changed and lines modified
6. Generate a descriptive commit message:
   - Small changes (under 10 files, under 100 lines): aim for 140 characters
   - Large changes (10+ files or 100+ lines): allow up to 300 characters
7. Use conventional commit format with appropriate type
8. Focus on the most impactful changes
9. Use commas instead of dashes between items
10. Consider game-specific changes (components, hooks, context, game mechanics)
