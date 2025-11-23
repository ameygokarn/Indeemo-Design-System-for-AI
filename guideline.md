# Figma + Make Guidelines for Indeemo Design System

Purpose
- Provide practical guidance for using Figma together with automation (Make.com or similar automation tools) to build, maintain, and scale a design system for Indeemo.
- Focus on reusable components, tokens, versioning, accessibility, and collaboration patterns that work well with AI-assisted generation.

Recommended workflow
1. Define tokens first: color, spacing, typography, radii, elevation, and motion. Store tokens as a single source of truth (JSON/CSS variables / design tokens file).
2. Build atomic components in Figma (atoms → molecules → organisms) using components and variant groups. Name components consistently: `component/name/variant` (see naming below).
3. Export assets from Figma with explicit export presets (PNG/SVG) and an assets manifest. Use a local preview server for assets during development.
4. Use automation (Make.com, GitHub Actions, or custom scripts) to:
   - Sync tokens between Figma and code (export/import JSON)
   - Export component screenshots and assets to the repo
   - Validate accessibility checks (contrast ratios, aria labels) via linters or scripts
5. Version components and tokens: use semantic versioning for tokens and components. Tag releases and include changelogs.

File & Figma organization
- Single Figma file for core components (masters). Keep platform-specific files (web/mobile) separate.
- Pages: `Tokens`, `Foundations`, `Components`, `Patterns`, `Documentation`.
- Components: group by function and size (e.g., `Button/Primary/Medium`, `Button/Secondary/Small`). Use Variants to capture states (default, hover, pressed, disabled).

Naming conventions
- Tokens: `color.primary.500`, `spacing.8`, `radius.small`, `font.size.100`.
- Components: `componentName/variant/size` (e.g., `button/primary/medium`).
- Layers: keep short but meaningful names, avoid system-generated names.

Component design rules (buttons example)
- States: Default, Hover, Pressed, Disabled, Focused.
- Variants: size (Small/Medium/Large), type (Primary/Secondary/IconOnly), state.
- Accessibility: minimum contrast ratio 4.5:1 for body text in primary states; 3:1 for large text/UI elements.

Tokens & export
- Maintain a JSON token file as canonical source: `tokens/colors.json`, `tokens/typography.json`.
- Automate pushing tokens to code: generate `:root` CSS variables, Tailwind config, and JSON for JS consumption.

Collaboration & handoff
- Keep one source-of-truth Figma file and publish a “library” that other files consume.
- Use component documentation frames within Figma (prop tables, usage notes, anatomy).
- Use automated exports to produce a living documentation site (Storybook, Zeroheight, or custom site).

Automation (Make.com / Integrations)
- Use Make or similar to trigger exports on publish: when the Figma library is updated, export tokens and assets and commit to a branch.
- Typical automation steps: download file -> extract tokens -> commit token JSON -> generate CSS/token artifacts -> publish docs.

Testing & validation
- Run automated visual regression (per-component screenshots) after token changes.
- Run accessibility checks (contrast, label presence) as part of CI.

Examples & resources
- Figma documentation: https://help.figma.com/
- Figma Community for component patterns: https://www.figma.com/community
- Make (automation) docs: https://www.make.com/en
- Useful YouTube channels and playlists:
  - Figma official channel
  - Jesse Showalter — Figma & design system tutorials
  - DesignCourse — UI & component design tutorials

Tips & best practices
- Keep tokens minimal, purposeful, and named for intent (use `brand.primary` rather than `magenta-700` when possible).
- Prefer component props/variants over manually overriding styles in instances.
- Document rationale for token choices (why colors, spacing scale), not only the values.

Maintenance checklist (on every release)
- Bump token version and record changes in changelog.
- Run visual regression and accessibility tests.
- Update documentation frames and publish a new Figma library release.

Further reading
- “Design Systems” (Brad Frost) — structure and reasoning behind atomic design
- Figma blog & Figma community examples for real-world design systems
