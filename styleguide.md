# Assistant Prompt Styleguide for Indeemo Design System

Purpose
- This document explains how to write prompts for the assistant and what style/format to expect back. Use this as the definitive prompt/style contract when asking the assistant to generate design tokens, components, docs, or code.

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
