# Assistant Prompt Styleguide for Indeemo Design System

Purpose
- This document explains how to write prompts for the assistant and what style/format to expect back. Use this as the definitive prompt/style contract when asking the assistant to generate design tokens, components, docs, or code.

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

- When asking for component code: specify the framework. If not specified, assistant will return plain React + CSS (no Tailwind).
- For documentation: prefer Markdown with usage examples, props table, and code snippets.

Naming conventions (assistant should follow)
- Token names: `category.tokenName.scale` (e.g., `color.brand.500`, `spacing.8`).
- Component names: `ComponentName/Variant/Size` in human readable kebab or Pascal depending on code target. When creating files, use kebab-case file names.

Examples of good prompts
- “Generate JSON tokens for primary, neutral, and success palettes with 5 stops each, and output CSS variables.”
- “Create a React button component `Button` with props `variant` ('primary'|'secondary'), `size` ('small'|'medium'|'large'), and include accessible attributes. Return component file `Button.jsx` and `Button.css`.”

Validation & tests
- When asking for code generation, ask also for a set of 3 unit or snapshot tests (optional). The assistant can generate Jest/React Testing Library snippets.

Error handling & decisions
- If the assistant lacks required context (missing tokens, unclear platform), it will pause and list minimal choices for the user to pick.

Commit & file layout guidance
- When producing files, include suggested file paths (e.g., `src/components/button/Button.jsx`, `tokens/colors.json`) and a short commit message template.

Example prompt template (copy/paste)

"I want a [framework] component named [ComponentName]. Inputs: [list props]. Constraints: [list constraints]. Output: 1) component file with code, 2) CSS file, 3) README doc with usage examples. Keep code plain JS/React unless I request TypeScript." 
