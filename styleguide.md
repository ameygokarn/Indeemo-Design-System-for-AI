# Assistant Prompt Styleguide for Indeemo Design System

**⚠️ Figma Make Tailored:** This design system is now optimized for ingestion by Figma Make and other LLMs. All tokens include clear descriptions, Figma variable types, and CSS variable recommendations to ensure seamless automation and code generation.

Purpose
- This document explains how to write prompts for the assistant and what style/format to expect back. Use this as the definitive prompt/style contract when asking the assistant to generate design tokens, components, docs, or code.

## Token Structure Overview

**Three Core Sets:**
- **`brand`** — Foundational colors (brand palette and color ramps with WCAG contrast data)
- **`semantic`** — Semantic tokens organized by context (surface fills, interactive states, feedback colors)
- **`styles`** — Exportable styles and effects (typography, shadows). Only place where anything is exported as a style/effect in Token Studio.

**Semantic Token Categories:**

1. **Surface Fills** (`semantic.surface` + `semantic.elevation`)
   - **Undercanvas:** Below-canvas level (-1). For sticky/floating elements.
   - **Canvas:** Base level (0). Primary page/screen background.
   - **Levels 1-4:** Progressive elevation for cards, overlays, modals, dropdowns.
   - **Inverse:** Dark background for high-contrast sections.
   - **Accent:** Strong (brand pink) and subtle (light pink) for badges/highlights.

2. **Interactive** (`semantic.interactive`)
   - **Primary buttons:** Fill, text, icon colors for main CTAs.
   - **Secondary buttons:** Fill, border, text, icon colors for secondary actions.
   - **Links:** Default, hover, visited states for hyperlinks.

3. **Feedback** (`semantic.feedback`)
   - **Error, Success, Warning, Info:** Fill, text, border, icon colors for banner/notification components.

4. **Borders** (`semantic.border`)
   - **Border.elevation.level-2.primary:** Use with level-2 surfaces for contained components.

For detailed information, see `docs/TOKENS-README.md` and `docs/RESTRUCTURE-SUMMARY.md`.

## Token Studio Workflow (Primary Method)

**Important Context:** This project uses **Tokens Studio for Figma** (free tier) as the primary method for managing design tokens.

**Workflow:**
1. Design tokens are created and managed in Figma using the Tokens Studio plugin
2. The plugin exports tokens as JSON files
3. These JSON files are synced to this Git repository (`tokens/` directory)
4. The assistant helps with formatting, organizing, and consuming these tokens

**When working with tokens:**
- Tokens are stored in JSON format following the Tokens Studio structure
- The assistant should expect Token Studio JSON format when reading token files
- When asked to "sync tokens from Figma," expect the user to paste Token Studio JSON output
- The assistant should help convert Token Studio JSON to other formats (CSS variables, SCSS, JS objects) as needed
- Variables in Figma may not be directly accessible via REST API (requires Enterprise plan)

**Token Studio Resources:**
- Plugin: https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma
- Documentation: https://docs.tokens.studio/
- The plugin is free to use with basic features

General principles
- Be explicit: include desired output format (JSON/CSS/Markdown/TSX), target platform (web/mobile/react/vue), and any constraints (no Tailwind, use CSS variables, etc.).
- Provide context: include the token file, component name, or a short design note; include the Figma node id or screenshot when relevant.
- Ask for one thing at a time: request token generation separately from component code to keep outputs small and verifiable.

Tone & verbosity
- Prefer concise, technical responses for code and exact outputs. Use a short explanatory paragraph (2–3 sentences) when giving rationale.

Formatting expectations
- When asking for tokens: request a single canonical JSON output and optionally a CSS variables block. Example:

  Output tokens as JSON (canonical):

  ```json
  {
    "color": {
      "primary": {"100": "#fff1f5", "500": "#da095e"}
    }
  }
  ```

  ## Accessibility: Links & Underline

  - Use `typography-style.link.default` for link text and `typography-style.link.hover` for interactive state. These styles include the link color and underline.
  - Ensure link color and underline pass WCAG AA contrast requirements against their background:
    - For normal text: contrast >= 4.5:1
    - For large text (≥ 18px bold or 24px regular): contrast >= 3:1
  - Do not rely solely on color to indicate links. Use underline or another clear indicator and provide a focus style for keyboard navigation (outline or highlight with at least 3:1 contrast).
  - Example (CSS):

  ```css
  .link {
    color: var(--color-ramp-purple-850);
    text-decoration: underline;
  }
  .link:hover { color: var(--color-ramp-purple-750); }
  .link:focus { outline: 2px solid var(--color-ramp-purple-750); outline-offset: 2px; }
  ```

## Typography Styles Overview (Figma Make Optimized)

All typography styles are now documented with Figma variable types and CSS variable recommendations for LLM and Figma Make ingestion.

**Current Typography Styles:**
- `headline` (large/medium/small): Section and subsection headings (16–20px, Bold)
- `display` (large): Hero and marketing headings (28px, Bold) — *NEW*
- `body-emphasis` (large/medium/small): Emphasized body copy (12–18px, Bold)
- `body` (large/medium/small): Primary body text (12–18px, Regular)
- `label` (large/medium/small): Form labels and UI labels (12–18px, Bold)
- `caption` (small): Metadata, hints, timestamps (12px, Regular) — *NEW*
- `link` (default/hover/visited): Interactive links with accessible underline

**Token Format for Figma Make:**
Each typography token includes:
- `fontFamily`: Reference to brand font family (e.g., `{brand.fontFamily.a}`)
- `fontWeight`: Regular or Bold (e.g., `{brand.fontWeight.bold}`)
- `fontSize`: Semantic size alias (e.g., `{scale.fontSize.md}`)
- `lineHeight`: Semantic line-height alias (e.g., `{scale.lineHeight.normal}`)
- `description`: Purpose, Figma variable type, CSS variable name, and accessibility notes
- `extensions.figma`: Figma Make metadata (resolved type, CSS variable, usage)

**Example Token (with Figma Make metadata):**
```json
"headline": {
  "large": {
    "value": {
      "fontFamily": "{brand.fontFamily.a}",
      "fontWeight": "{brand.fontWeight.bold}",
      "fontSize": "{scale.fontSize.xl}",
      "lineHeight": "{scale.lineHeight.comfortable}"
    },
    "type": "typography",
    "description": "Headline Large (20px/22px, Bold). Purpose: Section headings. Figma variable type: TYPOGRAPHY. CSS var: --typography-headline-large. Accessibility: use for prominent headings with sufficient contrast."
  }
}
```

- When asking for component code: specify the framework. If not specified, assistant will return plain React + CSS (no Tailwind).
- For documentation: prefer Markdown with usage examples, props table, and code snippets.

Naming conventions (assistant should follow)
- Token names: `category.tokenName.scale` (e.g., `color.brand.500`, `spacing.8`).
- Component names: `ComponentName/Variant/Size` in human readable kebab or Pascal depending on code target. When creating files, use kebab-case file names.
- **Token references:** When creating semantic tokens that share the same value as another semantic token, use deep references to the semantic token (e.g., `{semantic.interactive.primary.text.default}`) rather than duplicating the foundation reference. This creates a single source of truth and allows future flexibility to change values independently if needed.

Examples of good prompts
- "Generate JSON tokens for primary, neutral, and success palettes with 5 stops each, and output CSS variables."
- "Create a React button component `Button` with props `variant` ('primary'|'secondary'), `size` ('small'|'medium'|'large'), and include accessible attributes. Return component file `Button.jsx` and `Button.css`."
- **Token Studio specific:** "Here's the Token Studio JSON export [paste JSON]. Save these tokens to the tokens/ folder organized by category."
- **Token Studio specific:** "Convert the Token Studio tokens in `tokens/colors.json` to CSS custom properties."

Validation & tests
- When asking for code generation, ask also for a set of 3 unit or snapshot tests (optional). The assistant can generate Jest/React Testing Library snippets.

Error handling & decisions
- If the assistant lacks required context (missing tokens, unclear platform), it will pause and list minimal choices for the user to pick.

Commit & file layout guidance
- When producing files, include suggested file paths (e.g., `src/components/button/Button.jsx`, `tokens/colors.json`) and a short commit message template.

Example prompt template (copy/paste)

"I want a [framework] component named [ComponentName]. Inputs: [list props]. Constraints: [list constraints]. Output: 1) component file with code, 2) CSS file, 3) README doc with usage examples. Keep code plain JS/React unless I request TypeScript." 
