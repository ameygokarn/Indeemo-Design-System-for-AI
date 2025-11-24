# Figma + Make Guidelines for Indeemo Design System

Purpose
- ProvFurther reading
- "Design Systems" (Brad Frost) — structure and reasoning behind atomic design
- Figma blog & Figma community examples for real-world design systems

---

## Figma Make: Best Practices & Integration Guide

**What is Figma Make?**
Figma Make is an AI-powered tool within Figma that generates functional prototypes and web applications directly from your design library. It uses your design system's style context (CSS, colors, typography) to ensure generated code is consistent with your design specifications.

**Key Benefits for Indeemo Design System:**
- Generate production-ready components with consistent styling automatically
- Reduce manual hand-off between design and development
- Ensure accessibility (WCAG AA contrast, semantic HTML) in generated code
- Reduce iterations by having accurate design-to-code translation
- Enable non-engineers to build functional prototypes

### Exporting Your Design Library to Figma Make

**Step 1: Prepare Your Figma Library**
1. In Figma Design, ensure your core design system file has a published library containing:
   - All foundational tokens (typography, color, spacing)
   - All component variants (states, sizes, types)
   - Documentation frames with usage guidance
2. Use consistent naming conventions (e.g., `button/primary/medium`, `headline.large`)
3. Organize library pages: `Tokens`, `Foundations`, `Components`, `Documentation`

**Step 2: Export to Figma Make**
1. Navigate to **Assets panel** → **Libraries** in your Figma file
2. Find your library file and click **Publish** (if not already published)
3. Once published, click **Export for Make**
   - Figma will extract your design styles into a CSS file (`globals.css`)
   - This includes color palettes, typography, variables, and borders/radius
   - Export process may take a few minutes
4. Click **Go to Figma Make** to use the exported library in Figma Make

**What Gets Extracted:**
Figma Make extracts four categories of styles from your library:
- **Color palettes** – brand and semantic colors with their values
- **Typography** – font families, weights, sizes, and line heights
- **Variables** – design tokens structured with Figma variable syntax
- **Borders and corner radius** – spacing and corner radius tokens

**Important Note on Variable Syntax:**
Figma Make currently does NOT preserve complex variable syntax or token references exactly as defined. Instead:
- Variables are pulled as a simplified subset
- Complex token structures are converted to raw CSS values
- A single unified `globals.css` file is generated
- This ensures generated code aligns reliably with foundational styles

**Recommendation:** Document any advanced token rules, semantic aliases, or state-based variables in your `guidelines.md` file (see section below).

### Customizing Figma Make Behavior

**Editing Extracted Styles (CSS Customization)**
1. In Figma Make file, click ⚙️ (Settings) → **Edit styles**
2. Modify the generated `globals.css` to shape Figma Make's output:
   - Adjust color values, spacing scale, typography hierarchy
   - Add custom CSS rules for complex patterns
   - Fine-tune responsive breakpoints
3. Changes only affect this Figma Make file; they do NOT update the library

**Adding Guidelines (Behavior Rules)**
1. In Figma Make file, click ⚙️ (Settings) → **Edit guidelines**
2. Add rules to `guidelines.md` to instruct Figma Make how to use your styles

### Guidelines.md Best Practices for Figma Make

**Purpose:** The `guidelines.md` file in Figma Make is free-form text where you specify rules and instructions for how Figma Make should generate code using your design system.

**What to Document:**

#### 1. Token & Variable Rules
```markdown
### Tokens & Semantic Aliases

**Font Sizes (Semantic Aliases):**
- Use `--font-size-xxs` (10px) for micro UI labels
- Use `--font-size-xs` (12px) for captions and small text
- Use `--font-size-sm` (14px) for body and labels
- Use `--font-size-md` (16px) for default body text
- Use `--font-size-lg` (18px) for large body and emphasis
- Use `--font-size-xl` (20px) for section headings
- Use `--font-size-2xl` (24px) for subsection headings
- Use `--font-size-3xl` (28px) for main headings
- Use `--font-size-4xl` (32px) for hero headings
- Use `--font-size-5xl` (40px) for display text

**Line Heights (Semantic Aliases):**
- `--line-height-tight` (1.2) for headlines and dense UI
- `--line-height-normal` (1.4) for body text
- `--line-height-comfortable` (1.6) for long-form content

**Font Weights:**
- Use `font-weight: 400` (Regular) for body, captions, labels
- Use `font-weight: 700` (Bold) for headings, emphasis, CTAs
```

#### 2. Typography Style Definitions
```markdown
### Typography Styles

**Headline (Large/Medium/Small):**
- Large: 20px Bold, 1.4 line-height (section headings)
- Medium: 16px Bold, 1.4 line-height (subsection headings)
- Small: 14px Bold, 1.2 line-height (small headings)

**Display Large:**
- 28px Bold, 1.2 line-height (hero headings, marketing text, page titles)

**Body (Large/Medium/Small):**
- Large: 18px Regular, 1.6 line-height (emphasized body, introductions)
- Medium: 16px Regular, 1.6 line-height (default body text)
- Small: 14px Regular, 1.6 line-height (secondary body, annotations)

**Body-Emphasis (Large/Medium/Small):**
- Large: 18px Bold, 1.6 line-height (emphasized paragraphs)
- Medium: 16px Bold, 1.6 line-height (strong text, feature callouts)
- Small: 14px Bold, 1.6 line-height (bold labels, highlights)

**Label (Large/Medium/Small):**
- Large: 18px Bold, 1.4 line-height (form labels, large UI labels)
- Medium: 16px Bold, 1.4 line-height (button text, standard UI labels)
- Small: 14px Bold, 1.2 line-height (small UI labels, badges)

**Caption Small:**
- 12px Regular, 1.2 line-height (metadata, timestamps, breadcrumbs, hints)

**Link Styles:**
- Default: Use `--color-primary` with `text-decoration: underline`
- Hover: Use `--color-primary` with `text-decoration: underline` + 10% opacity increase
- Visited: Use `--color-secondary` with `text-decoration: underline`
- Always include focus state: `outline: 2px solid --color-primary`
```

#### 3. Accessibility Requirements
```markdown
### Accessibility Guidelines

**Color Contrast:**
- All body text must meet WCAG AA contrast ratio of 4.5:1 minimum against background
- UI labels and large text (18px+) must meet 3:1 minimum contrast
- Interactive elements (links, buttons) must maintain 3:1 contrast in all states

**Typography & Readability:**
- Body text should use line-height of 1.5 or greater for legibility
- Minimum font size for body text: 14px (use 16px for optimal readability)
- Use letter-spacing: 0 (normal) for all typography

**Links & Interactive Elements:**
- All links must have underline (text-decoration: underline)
- Links must have distinct color from surrounding text (use --color-primary)
- Always include focus state: `outline: 2px solid --color-primary; outline-offset: 2px`
- Distinguish visited links with different color (--color-secondary)

**Semantic HTML:**
- Use `<h1>`, `<h2>`, `<h3>` for headline styles (in order of hierarchy)
- Use `<p>` for body styles
- Use `<strong>` or `<b>` for body-emphasis styles
- Use `<label>` for form labels
- Use `<small>` for captions
- Use `<a>` with proper href for links
```

#### 4. Component Behavior & Patterns
```markdown
### Component Generation Rules

**Buttons:**
- Primary buttons: use --color-primary background with white text
- Secondary buttons: use white background with --color-primary border and text
- Hover state: increase opacity by 10% or darken by 1 shade
- Disabled state: use --color-neutral-400 with reduced opacity (50%)
- Maintain 44x44px minimum touch target size

**Form Inputs:**
- Use 14px-16px font size for input text
- Include placeholder text in light gray (--color-neutral-500)
- Add 2px solid border in --color-neutral-300 (default state)
- Focus state: 2px solid --color-primary border
- Disabled state: use --color-neutral-200 background with reduced opacity

**Navigation:**
- Use --font-size-md (16px) for navigation links
- Active state: bold weight + underline with --color-primary
- Hover state: increase opacity by 10%

**Cards & Containers:**
- Use --radius-small (4px) for subtle cards
- Use --radius-medium (8px) for standard containers
- Add 1px solid border in --color-neutral-200
- Use --color-neutral-50 for card background
```

#### 5. Color Usage Guidelines
```markdown
### Color Semantics & Usage

**Primary Color (--color-primary):**
- Use for CTAs, links, highlights, active states
- Ensure 4.5:1 contrast with background

**Secondary Color (--color-secondary):**
- Use for alternate CTAs, visited states, secondary interactions
- Provide visual distinction from primary

**Neutral Colors (--color-neutral-[50..1050]):**
- 50–200: Light backgrounds, disabled states
- 300–600: Borders, dividers, secondary text
- 700–900: Primary text, headings
- 1000+: Dark backgrounds (if needed)

**Semantic Colors:**
- Success/Green: for confirmations, completions
- Warning/Yellow: for alerts, cautions
- Error/Red: for errors, destructive actions
- Info/Blue: for informational messages
```

#### 6. Elevation & Surface System
```markdown
### Elevation System & Surface Layers

**Philosophy:** The elevation system creates a visual hierarchy through layered surfaces, shadows, and z-index levels. Each elevation level has a corresponding shadow effect and surface fill that work together to indicate depth and interaction.

**Elevation Levels (Z-Index & Mapping):**

| Level | Z-Index | Use Case | Surface Fill | Shadow |
|-------|---------|----------|--------------|--------|
| **Undercanvas** | -1 | Hidden/background content (behind sticky headers) | Cream (from ramp) | None (0px) |
| **Canvas** (Default) | 0 | Main page background, primary content area | White | Minimal (0px 1px 2px) |
| **Level 1** | 1–100 | Cards, floating sections, tabs | White | Noticeable (0px 3px 8px) |
| **Level 2** | 100–500 | Dropdowns, tooltips, popovers, context menus | White | Stronger (0px 6px 16px) |
| **Level 3** | 500–1000 | Sticky headers, persistent navigation bars | White | Pronounced (0px 10px 24px) |
| **Level 4** | 1000+ | Modals, dialogs, alerts, full-screen overlays | White | Maximum (0px 16px 32px) |
| **Inverse** | 2000+ | Dark backgrounds, dark mode surfaces | Dark (#1A1A1A) | Light shadow (0px 6px 16px) |

**Using Surface Tokens in Code:**
```css
/* Canvas level (default page background) */
body {
  background-color: var(--surface-canvas-fill);
  box-shadow: var(--shadow-elevation-0);
}

/* Card at Level 1 */
.card {
  background-color: var(--surface-level-1-fill);
  box-shadow: var(--shadow-elevation-1);
  z-index: 10;
}

/* Dropdown at Level 2 */
.dropdown {
  background-color: var(--surface-level-2-fill);
  box-shadow: var(--shadow-elevation-2);
  z-index: 200;
}

/* Modal at Level 4 */
.modal {
  background-color: var(--surface-level-4-fill);
  box-shadow: var(--shadow-elevation-4);
  z-index: 1000;
}
```

**Key Rules:**
- Always pair a surface fill with its corresponding shadow for consistent elevation
- Use z-index ranges rather than specific values to allow flexibility
- Level 0 (canvas) is the default; only use higher levels when content needs to float above
- Undercanvas (-1) should be used sparingly (e.g., content behind sticky sidebars)
- Inverse level is reserved for dark mode and special high-contrast scenarios
- Each level maintains a 1:1 mapping for future dark mode support (all surfaces stay white except inverse and undercanvas)

**Surface Accents:**
Each elevation level (canvas, undercanvas, and levels 1–4) includes two accent color options for highlighting and emphasis:

- **accent-strong** (brand pink): Use for primary emphasis, interactive highlights, call-to-action areas
- **accent-subtle** (tinted pink): Use for secondary emphasis, background accents, dividers

```css
/* Card with strong accent border */
.card-featured {
  background-color: var(--surface-level-1-fill);
  border-left: 4px solid var(--surface-level-1-accent-strong);
  box-shadow: var(--shadow-elevation-1);
}

/* Highlighted section with subtle accent background */
.highlight-section {
  background-color: var(--surface-level-1-accent-subtle);
  border-left: 4px solid var(--surface-level-1-accent-strong);
  padding: 16px;
}

/* Dropdown with accent indicator */
.dropdown-active {
  background-color: var(--surface-level-2-fill);
  border-bottom: 2px solid var(--surface-level-2-accent-strong);
  box-shadow: var(--shadow-elevation-2);
}
```

**For Figma Make:**
When generating code, apply these accent rules:
- Featured/highlighted cards: add `border-left: 4px solid var(--surface-{level}-accent-strong)`
- Highlighted sections: use `background-color: var(--surface-{level}-accent-subtle)` with strong accent border
- Active/selected states: add bottom or side border using accent-strong
- Background highlights: use accent-subtle at reduced opacity (20–30%) for subtle emphasis

**For Dark Mode:** Accents maintain consistent colors across light and dark modes. The accent definitions remain the same, only the surface fills change when switching theme.

**For Figma Make:**
When generating code, apply these rules:
- Dropdowns, popovers, tooltips: use Level 2 (--surface-level-2-fill + --shadow-elevation-2)
- Card containers, tabs: use Level 1 (--surface-level-1-fill + --shadow-elevation-1)
- Modal dialogs, full-screen overlays: use Level 4 (--surface-level-4-fill + --shadow-elevation-4)
- Sticky headers/footers: use Level 3 (--surface-level-3-fill + --shadow-elevation-3)
```

#### 7. Responsive & Layout Guidelines
```markdown
### Responsive Design

**Breakpoints (Mobile-First):**
- Mobile: 320px – 639px
- Tablet: 640px – 1023px
- Desktop: 1024px and above

**Spacing Scale:**
- Use multiples of 4px: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96
- Padding: 16px on mobile, 24px on tablet/desktop
- Margins: 16px mobile, 24px tablet/desktop

**Layout:**
- Max width for content: 1200px (desktop)
- Single column on mobile, 2–3 columns on tablet, 3–4 columns on desktop
```

#### 7. Documentation & Examples
```markdown
### Usage Examples

**Example: Button Component**
\`\`\`html
<!-- Primary Button -->
<button class="btn btn-primary btn-md">
  Click Me
</button>

<!-- CSS -->
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  font-size: var(--font-size-md);
  font-weight: 700;
  padding: 12px 24px;
  border-radius: var(--radius-small);
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-primary:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn-primary:disabled {
  background-color: var(--color-neutral-400);
  opacity: 0.5;
  cursor: not-allowed;
}
\`\`\`

**Example: Typography**
\`\`\`html
<!-- Headline Large -->
<h1 class="headline-lg">Main Heading</h1>

<!-- Body Medium -->
<p class="body-md">This is default body text.</p>

<!-- Caption Small -->
<small class="caption-sm">2 hours ago</small>

<!-- CSS -->
.headline-lg {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  line-height: 1.4;
}

.body-md {
  font-size: var(--font-size-md);
  font-weight: 400;
  line-height: 1.6;
}

.caption-sm {
  font-size: var(--font-size-xs);
  font-weight: 400;
  line-height: 1.2;
  color: var(--color-neutral-600);
}
\`\`\`
```

#### 8. Known Limitations & Workarounds
```markdown
### Figma Make Limitations & Solutions

**Limitation 1: Variable Syntax Not Preserved**
- Variables are simplified to raw CSS values in globals.css
- Solution: Document all semantic token rules in this guidelines.md file

**Limitation 2: Complex State Management**
- Advanced variant state logic may not export perfectly
- Solution: Specify required states explicitly (default, hover, active, disabled, focus)

**Limitation 3: Component-Only Export**
- Figma Make extracts styles but NOT component instances or structure
- Solution: Provide clear documentation of how components should be assembled

**Workaround: Re-Export After Library Updates**
- If you update your Figma library, you MUST re-export to Figma Make
- Re-exported library only affects NEW Figma Make files going forward
- Existing Figma Make files created before update will not auto-update
```

### Workflow: Keeping Figma Make in Sync

**When to Re-Export:**
1. After adding new typography styles ✅
2. After updating color palette ✅
3. After modifying component structure ✅
4. After adjusting spacing scale ✅
5. After changing accessibility requirements ✅

**Step-by-Step Re-Export Process:**
1. In Figma Design file, update your library (colors, typography, components, etc.)
2. Click **Publish** to publish changes to the library
3. Go to **Assets** → **Libraries** → Find your library
4. Click **Export for Make** (this will replace the previous export)
5. Click **Go to Figma Make**
6. In Figma Make, your updated `globals.css` will reflect new styles
7. Test generated code to verify styles applied correctly
8. Update `guidelines.md` if new rules or patterns were added

### Integration with Token Studio & Design Tokens

**Linking Token Studio to Figma Make:**
1. Use Token Studio plugin to manage your tokens in Figma
2. Token Studio can export tokens to JSON format (`tokens.json`)
3. Copy key token documentation into your Figma Make `guidelines.md`
4. When you export library to Figma Make, ensure all tokens are visible in `globals.css`

**Best Practice:** Maintain token definitions in both locations:
- **`tokens/tokens.json`** (canonical source) – detailed semantic aliases, Figma extensions, LLM-friendly descriptions
- **Figma Make `globals.css`** (extracted styles) – simplified, raw CSS values for code generation
- **Figma Make `guidelines.md`** (behavior rules) – semantic aliases, accessibility rules, component patterns

This ensures both human developers and AI systems (LLMs, Figma Make) can consume your design system correctly.

### Resources & Links

- **Figma Make Official Guide:** https://help.figma.com/hc/en-us/articles/33024539096471-Bring-style-context-from-a-Figma-Design-library-into-Figma-Make
- **Figma API Documentation:** https://www.figma.com/developers/api
- **Token Studio Documentation:** https://docs.tokens.studio/
- **Figma Design System Best Practices:** https://www.figma.com/design-systems/
- **Web Content Accessibility Guidelines (WCAG):** https://www.w3.org/WAI/WCAG21/quickref/ practical guidance for using Figma together with automation (Make.com or similar automation tools) to build, maintain, and scale a design system for Indeemo.
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
