Tokens — central readme

This document explains the structure of the design tokens in `tokens/tokens.json`, provides an overview of the token categories (typography, color, etc.), and shows examples and a migration guide to the new semantic typography names.

1. Overview: token file & structure

- Location: `tokens/tokens.json`.
- Format: JSON tokens grouped by a semantic object structure, e.g. `typography.scale.fontSize`, `foundation.color.brand`, `foundation.color.ramp`, `typography-style`.
- Purpose: central place for design tokens used by the system and for Figma > tokens export.

2. Typography tokens

- Top-level: `typography.brand`, `typography.scale` and `typography-style`.
- `typography.brand`: font family and font weight tokens (e.g., `brand.fontFamily.a`, `brand.fontWeight.bold`).
- `typography.scale`: contains `base`, `ratio` and the font size / line height numeric steps. Numeric tokens are still available but semantic aliases were added for clarity.

New semantic font-size aliases (under `typography.scale.fontSize`):
- `xxs`  -> numeric 50 (8px)
- `xs`   -> numeric 75 (12px)
- `sm`   -> numeric 85 (14px)
- `md`   -> numeric 100 (16px)
- `lg`   -> numeric 110 (18px)
- `xl`   -> numeric 125 (20px)
- `xxl`  -> numeric 135 (22px)
- `3xl`  -> numeric 150 (24px)
- `4xl`  -> numeric 175 (28px)
- `5xl`  -> numeric 200 (32px)
- `6xl`  -> numeric 210 (34px)
- `7xl`  -> numeric 225 (36px)

New semantic line-height aliases (under `typography.scale.lineHeight`):
- `tight`     -> numeric 100 (16px)
- `snug`      -> numeric 110 (18px)
- `normal`    -> numeric 125 (20px)
- `comfortable` -> numeric 135 (22px)
- `relaxed`   -> numeric 150 (24px)
- `loose`     -> numeric 175 (28px)
- `extra-loose` -> numeric 200 (32px)

3. Typography styles

- `typography-style` contains semantic styles like `headline`, `body`, and `label` with variants (e.g., `large`, `medium`, `small`).
- Each style references tokens in `typography.brand` and `typography.scale` — either numeric tokens or the new semantic aliases.
- Example:
  - `typography-style.headline.large.value.fontSize` -> `{scale.fontSize.xl}`
  - `typography-style.headline.large.value.lineHeight` -> `{scale.lineHeight.comfortable}`

4. Color tokens

- Categorized under `foundation.color`.
  - `foundation.color.brand`: top-level named colors for brand palette (e.g., `cream`, `yellow`, `orange`, `red`, `pink`, `purple`, `dark-blue`, `grey`, `neutral`).
  - `foundation.color.ramp`: each color has multiple shades arranged by numeric shade keys (e.g., `100`, `150`, `200`, `...`, `1050`). These include HSL values and WCAG contrast notes in the `description` field.

Usage example:
- `foundation.color.ramp.cream.100` returns the cream 100 color value.
- `foundation.color.brand.yellow` returns a brand single-color entry.

5. Deprecation & migration

- Numeric tokens have been removed in favor of the semantic aliases (xxs, xs, sm, md, lg, xl, xxl, 3xl, …).
- If you still have references to numeric tokens in your code or in historical files, let me know and I can add a small script to convert them to the new semantic names automatically.
- Example migration you should do manually or via a script:
  - `fontSize.125` -> `fontSize.xl`
  - `lineHeight.135` -> `lineHeight.comfortable`

6. Best practices

- Prefer semantic tokens (e.g., `scale.fontSize.md`, `scale.lineHeight.normal`) in code and new components for readability.
- Use `typography-style` entries for consistent typographic application — these contain a combined set of `fontFamily`, `fontWeight`, `fontSize` and `lineHeight`.
- Use color ramp values from `foundation.color.ramp` for accessible color choices; check `description` for WCAG details.

7. Consumption & toolchain

- This repo is set up for design tokens; integrate with your token transform steps (style-dictionary, Tailwind plugin, CSS variable generator, etc.) as needed.
- If you want, we can add a simple token-to-CSS generation script or transformations.

8. Next steps & suggestions

- Standardize numeric to semantic alias tokens across existing code and other tokens (automatable with a migration script).
- Add a simple script in `scripts/` to export CSS variables from `tokens/tokens.json`.
- Add a `tokens-test` that validates token names and expected patterns.

If you want this doc further expanded (e.g., examples for a specific token transformation pipeline), tell me where you will use the tokens and I'll add a snippet targeted at that stack.
