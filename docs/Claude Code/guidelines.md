# Claude Code Guidelines — Indeemo Design System

Purpose
- Provide concise, actionable guidelines for Claude Code to generate UI code, components, and token-aware CSS using the Indeemo design tokens.
- Distilled from TOKEN_DOCUMENTATION.md and guideline.md and aligned to Claude Code best practices (clear system instructions, constrained outputs, explicit examples).

How to use this file
- Include this file as the primary guideline when running Claude Code across the repository or when using Figma Make with Claude Code.
- Keep prompts short, reference the relevant tokens and CSS file (`docs/Claude Code/claude-code.css`), and require unit-testable outputs.

Principles for LLM-driven code generation
1. Be explicit and prescriptive.
   - Use exact CSS variable names and token references when styling (e.g. `var(--surface-canvas)`, `var(--semantic-interactive-link)`).
   - Provide exact return types, file names, and the directory to write outputs.
2. Single-responsibility tasks.
   - Ask Claude Code to perform one action per prompt (generate component, produce CSS, write tests, make docs).
3. Minimal but sufficient context.
   - Attach only the relevant token snippets or a link to `docs/Claude Code/claude-code.css`.
4. Supply examples and expected output formats.
   - Prefer machine-readable output (JSON, YAML, or code blocks) and include test cases where applicable.

Prompt structure recommendations (Claude Code specific)
- System message (guiding the assistant): short 1–3 lines setting tone and strict constraints (e.g., "Produce code that uses only the provided tokens. Return only files and no commentary unless asked.").
- User instruction: describe the task in one sentence, followed by a short bullets list of constraints.
- Provide examples: show a minimal input and expected output. If requesting multiple files, provide an explicit mapping (path → expected content type).

Example prompt template
```
System: You are Claude Code. Produce only code files requested. Use tokens from docs/Claude Code/claude-code.css for styling.
User: Create a React `Button` component that uses `--semantic-interactive-primary-fill` for background, `--semantic-interactive-primary-text` for text color. Include unit tests. Output files: src/components/Button.jsx, src/components/Button.test.jsx
Constraints:
- Use function components and CSS modules
- Tests must run with Jest
- Do not import external UI libs
``` 

Token & style usage rules
- Prefer semantic tokens over raw colors/sizes. Use the CSS variables in `docs/Claude Code/claude-code.css` as the authoritative mapping for resolved values.
- Do not hardcode hex or px values in generated code; reference CSS variables unless the output specifically requests resolved values (for screenshots, previews, or third-party systems that don't consume CSS variables).
- For components meant to be copy/paste-ready in environments without CSS variables, include a companion `.css` with resolved values using the provided `claude-code.css` as source.

Formatting & output rules
- Use fenced code blocks with language tags for any code examples.
- When returning multiple files, reply with a JSON manifest listing path, brief description, and the file contents encoded as a string or code block.
- Prefer idempotent operations: repeated prompts should produce the same files unless inputs change.

Testing & verification
- Whenever generating components, include at least one unit test (Jest + React Testing Library or equivalent) that asserts rendering and token-driven styles.
- Include sample snapshots or CSS assertions verifying `background-color` equals `var(--semantic-interactive-primary-fill)`.

Security & safety
- Do not include secrets or external API keys. If a task requires integration, instruct the user to provide credentials through secure environment variables (never embed them in code).
- Validate external URLs and disallow network calls in generated code without explicit permission.

Performance & accessibility
- Generated UI components must meet WCAG AA color contrast ratios (4.5:1 for body text). When using tokens, prefer semantically-correct pairings (e.g., `surface.*` + `text.*`).
- Include keyboard focus styles and `aria` attributes for interactive components.

Claude-specific tips (based on Claude Code best practices)
- Prefer short, explicit system messages over long instructions.
- Use few-shot examples sparingly — prefer one clear example.
- Ask for strict, machine-readable outputs (JSON manifest) for downstream automation.
- When requesting code, include the runtime (Node, Deno) and test harness expectations.

Distilled token rules (from TOKEN_DOCUMENTATION.md & guideline.md)
- Token sets: `brand` (foundation colors/spacing), `semantic` (component-first tokens), `viewport` (responsive overrides), `styles` (composite tokens exported to Figma).
- Use flattened references in composite tokens (e.g. `{typography.scale.md}`), avoid hardcoding set names in references.
- Typography defaults for UI copy:
  - Small: 14px
  - Medium: 16px
  - Large: 18px
  - Default body: 16px / line-height 20px
- Links: use underline + `var(--semantic-interactive-link)` (single color token, no hover/visited states in tokens)

When to resolve tokens to raw values
- Resolve tokens when generating a standalone CSS file for external consumption, emails, or screenshots.
- DO NOT resolve tokens when generating component code that will consume the CSS variables at runtime.

Examples
- Output manifest example (Claude should return this when asked to create files):
```json
[
  {"path":"src/components/Button.jsx","description":"React button component","content":"<JSX code here>"},
  {"path":"src/components/button.module.css","description":"CSS module using tokens","content":".btn { background: var(--semantic-interactive-primary-fill); }"}
]
```

Checks before finishing a task
- Ensure no hardcoded tokens (unless requested).
- Include unit tests and README instructions for running them.
- Validate CSS variable usage and include companion resolved CSS when requested.

Contact / escalation
- If Claude is uncertain about token usage or naming, ask the user for the exact variable name or point to `docs/Claude Code/claude-code.css`.

---

_Last updated: December 18, 2025 — distilled for Claude Code workflows._
