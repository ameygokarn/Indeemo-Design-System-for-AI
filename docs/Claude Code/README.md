# Claude Code — Indeemo Design System

Purpose
- Explain how to use the Claude Code files in this folder to request safe, auditable token edits from an LLM agent.

Files
- `claude-code.css` — single authoritative resolved CSS file containing semantic variables (hex/px). Agents should reference these variables and produce overrides rather than inventing raw colors.
- `manifest.full.json` — full machine-readable manifest of tokens (path → css variable, raw value, resolved value, description). Use this to find and map tokens.
- `manifest.json` — compact sample manifest for quick automation examples.
- `claude-code.full.css` — large, commented CSS with all token comments (audit-friendly). Optional.
- `override-template.json` — schema the agent must return when making edits.
- `example-prompt.txt` — example system + user prompt and expected manifest output.

Agent workflow (recommended)
1. Read `manifest.full.json` to locate the token path and CSS variable to change.
2. Compute the new value using only variable-based operations (e.g., scale by ratio, color-mix) and produce a minimal `override-template.json` containing the change(s).
3. If preview requested: return a `/* PREVIEW */` CSS snippet showing the override variables, but do not replace `claude-code.css`.
4. Wait for explicit user confirmation `"apply"` before committing `override-template.json` into `claude-code.css`.

Natural-language mapping rules
- Size changes: multiply by `--typography-ratio` (default 1.125). Round px to whole numbers.
- Color tint/shade changes: compute HSL adjustments and return a new override variable (e.g., `--color-brand-pink-darker`).
- Prefer variable overrides; avoid returning raw hex values as final answers unless user explicitly requests a resolved stylesheet.

Validation
- Agents must validate contrast for any text/background pair changed and flag if WCAG AA is not met.
- If a token cannot be resolved, ask the user; do not guess.

Example quick prompt
- "Increase headline size" → Agent finds `styles.headline.large` in `manifest.full.json`, multiplies resolved pixel value by `--typography-ratio`, and returns `override-template.json` with the updated value and reason.

Security & safety
- Never include secrets, credentials, or external network calls in generated code.
- All changes must be auditable via `manifest.full.json` and `claude-code.full.css` comments.

Contact
- For ambiguities in token naming, provide the exact `path` from `manifest.full.json` when asking the user for clarification.

_Last updated: December 18, 2025_
