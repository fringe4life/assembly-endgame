# Panda CSS audit

This report combines the **Panda MCP** tools (`get_usage_report`, `get_semantic_tokens`, `get_config`) with a pass over `panda.config.ts` and `src/`. It describes how the project uses Panda CSS **after** the cleanup work: semantic tokens, `globalCss`, tokenized borders/spacing, and consistent `css()` / recipes.

---

## MCP summary (project Panda server)

### Usage report (`get_usage_report`, scope: `all`)

The tool reports **category-level** stats: how many tokens exist per category, how many are used in the codebase, and counts of **hardcoded** values the analyzer still attributes outside the token system.

| Category      | Approx. token usage | Hardcoded (reported) |
|---------------|--------------------|----------------------|
| Animations    | 37.5%              | 3                    |
| Font weights  | 33.3%              | 0                    |
| Radii         | 22.2%              | 0                    |
| Font sizes    | 21.4%              | 0                    |
| Spacing       | 12.7%              | 4                    |
| Shadows       | 10%                | 0                    |
| Colors        | 8.3%               | 2                    |
| Sizes         | 3.4%               | 4                    |
| Easings       | 0%                 | 1                    |
| Borders       | 0%                 | 2                    |
| Line heights  | 0%                 | 2                    |
| Aspect ratios | 0%                 | 1                    |

**Interpretation:** Most of the default Panda preset remains unused (normal for a small app). Nonzero **hardcoded** counts are worth occasional review (animations, spacing, sizes, borders) if you want the analyzer fully quiet.

### Semantic tokens (`get_semantic_tokens`)

The MCP tool returned **`data: []`** in this environment even though `semanticTokens` are defined in `panda.config.ts` (e.g. `bg.canvas`, `bg.shell`, `text.muted`, `intent.*`). Treat the MCP list as unreliable here; confirm semantics via `bunx panda codegen` and generated CSS variables on `:root` (e.g. `--colors-bg\.canvas`).

---

## Current alignment (what the codebase does now)

| Area | Practice |
|------|----------|
| **Semantic colors** | `theme.extend.semanticTokens.colors` maps roles such as `bg.canvas`, `bg.shell`, `text.muted`, `intent.success` / `danger` / `info` to `{colors.*}` references. `game-status.tsx` uses intent tokens; `header.tsx` uses `text.muted` for the subtitle. |
| **Primitives** | Brand `white`, `pageCanvas`, and `shellSurface` tokens; slide **animations** and **keyframes** live in `panda.config.ts`. |
| **Globals** | `globalCss` in `panda.config.ts` sets `body`, `footer`, `body > div`, `#root` (typography, `bg.canvas` / `bg.shell`, layout). **`src/index.css`** only holds View Transition rules and layer ordering. |
| **Borders / spacing** | `flex-wrap` uses spacing scale (`gap` not raw `2px`). Difficulty / guess-letter / new-game use split **border/outline width + style** instead of fragile `1px solid` / `4px solid` shorthands where refactored. |
| **Animation vs fire effect** | `game-status-lose.tsx` uses `cx(css({ animation: … }), "font-effect-fire-animation")` so Panda animation tokens are not merged with the Google Fonts effect class in one `animation` value. |
| **Language badges** | `languages.ts` lists **palette token keys**; `app.tsx` applies them with `css()` (and `staticCss` pre-generates those utilities). |
| **Badge** | Base styles are `rounded`, `p`, `fontWeight` — no `filter: "md"`. |
| **Config** | Comment above `globalVars` / `preflight` describes global CSS variables and Preflight; redundant flat tokens like `red500` / `neutral900` were removed in favor of scales + semantics. |
| **Entry / styles** | No `/styled-system/styles.css` link in `index.html`; styles load through `main.tsx` → `index.css` and PostCSS. |
| **Layout API** | Keyboard row uses **`FlexWrap` + `css` overrides** instead of `styled-system/jsx` primitives. |

---

## Residual gaps (optional polish)

1. **MCP hardcoded counts** — Revisit any remaining raw values the analyzer still flags (animations, spacing, sizes, borders, line heights, aspect ratios) and either tokenize or accept as intentional.
2. **Palette vs semantic names** — Many components still use scale steps directly (`green.600`, `white`, etc.). Migrating more reads to semantic tokens (`intent.*`, `text.muted`, …) is optional and improves theme swaps.
3. **MCP semantic list** — If `get_semantic_tokens` stays empty locally, rely on codegen output rather than MCP for semantic token inventory.

---

*Generated with Panda MCP usage report and repository review.*
