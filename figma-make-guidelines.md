# Indeemo Design System — Figma Make Guidelines

This file provides instructions for how Figma Make should generate code using the Indeemo Design System tokens and styles. Use these guidelines to control code generation behavior, accessibility standards, and component patterns.

> **TIP:** These guidelines are written as prompts for Figma Make's AI. Keep them focused and avoid over-documentation. Only include essential rules that shape code quality.

---

## General Coding Guidelines

- Always use semantic HTML (`<button>`, `<a>`, `<h1>`-`<h6>`, `<p>`, `<label>`, `<small>`, etc.) instead of `<div>` for interactive and content elements
- Prefer CSS flexbox and grid for layouts; avoid absolute positioning except for overlays and popovers
- Use mobile-first responsive design with breakpoints: Mobile (320px–639px), Tablet (640px–1023px), Desktop (1024px+)
- Refactor code to keep files small; extract reusable helpers and components
- Use CSS custom properties (variables) for all tokens: `var(--surface-level-1)`, `var(--color-brand-pink)`, etc.
- Always include focus states for interactive elements: `outline: 2px solid var(--surface-accent-strong); outline-offset: 2px`
- Never remove or hide default focus styles; ensure keyboard navigation works for all interactive elements
- Use `transition: opacity 0.2s ease` for smooth hover/state changes on interactive elements

### Accessibility Standards

- All text must meet WCAG AA contrast ratio (4.5:1 minimum for body text, 3:1 for UI labels and large text)
- Always include `aria-label` or `aria-describedby` for interactive elements without visible labels
- Form inputs require associated `<label>` elements with `htmlFor` attribute
- Button labels must be action-oriented and descriptive (e.g., "Save Settings", not "OK")
- Include `aria-current="page"` for the active navigation link
- Use `aria-expanded` on toggle buttons and dropdowns
- Include `type="button"` on all `<button>` elements (not submit/reset unless needed)

---

## Color & Surface System

### Token Usage

Always use these token categories in generated code:
- **Surface tokens:** `var(--surface-canvas)`, `var(--surface-level-1)` through `var(--surface-level-4)`, `var(--surface-inverse)`
- **Elevation shadows:** `var(--shadow-elevation-0)` through `var(--shadow-elevation-4)`, `var(--shadow-elevation-inverse)`
- **Interactive colors:** `var(--interactive-primary-fill-default)`, `var(--interactive-secondary-border-default)`, etc.
- **Feedback colors:** `var(--feedback-error-fill)`, `var(--feedback-success-text)`, etc.
- **Accents:** `var(--surface-accent-strong)` (brand pink for emphasis), `var(--surface-accent-subtle)` (light pink for backgrounds)

### Surface & Elevation Rules

**Canvas (Level 0):**
- Use for page backgrounds and main content areas
- `background-color: var(--surface-canvas); box-shadow: var(--shadow-elevation-0)`

**Level 1:**
- Use for cards, floating sections, and contained components
- `background-color: var(--surface-level-1); box-shadow: var(--shadow-elevation-1)`

**Level 2:**
- Use for dropdowns, popovers, tooltips, and context menus
- Add border for subtle visual separation: `border: 1px solid var(--border-elevation-level-2-primary)`
- `background-color: var(--surface-level-2); box-shadow: var(--shadow-elevation-2); border: 1px solid var(--border-elevation-level-2-primary)`

**Level 3:**
- Use for sticky headers and persistent navigation
- `background-color: var(--surface-level-3); box-shadow: var(--shadow-elevation-3)`

**Level 4:**
- Use for modals, dialogs, and top-level overlays
- `background-color: var(--surface-level-4); box-shadow: var(--shadow-elevation-4)`

**Inverse:**
- Use for dark backgrounds and high-contrast sections
- `background-color: var(--surface-inverse); box-shadow: var(--shadow-elevation-inverse)`

**Rule:** Always pair surface fill with corresponding shadow (same elevation level).

### Accent Colors

- **Strong Accent:** `var(--surface-accent-strong)` — For primary emphasis, badges, active borders. Use on level-1 and above.
- **Subtle Accent:** `var(--surface-accent-subtle)` — For background highlights, secondary emphasis, dividers. Apply at reduced opacity (20–30%) for subtle effect.

**Examples:**
```css
/* Featured card with accent border */
border-left: 4px solid var(--surface-accent-strong);

/* Highlighted section background */
background-color: var(--surface-accent-subtle);

/* Active indicator (e.g., active nav item) */
border-bottom: 2px solid var(--surface-accent-strong);
```

---

## Typography

### Font System

- **Font Family:** IBM Plex Sans for all text (use `var(--typography-brand-font-family)`)
- **Font Weights:** 
  - Regular (400) for body, captions, labels
  - Bold (700) for headings, emphasis, CTAs

### Typography Scale

Always use semantic font sizes from the token system:
- `xxs`: 10px — Micro labels, badges
- `xs`: 12px — Captions, small metadata
- `sm`: 14px — Form labels, small body text
- `md`: 16px — Default body text (most common)
- `lg`: 18px — Large body, emphasis
- `xl`: 20px — Section headings
- `2xl`: 24px — Subsection headings
- `3xl`: 28px — Page headings
- `4xl`: 32px — Display/hero text
- `5xl`: 40px — Large display

### Line Heights

- `1.2` (tight) — Headlines and dense UI
- `1.4` (snug) — Headings with more space
- `1.6` (comfortable) — Body text and long-form content

### Typography Styles

Generate using semantic styles, not raw font values:

- **Headline.Large:** 28px Bold, 1.4 line-height — Page titles, section headings
- **Headline.Medium:** 20px Bold, 1.4 line-height — Subsection headings
- **Headline.Small:** 16px Bold, 1.2 line-height — Card titles, labels
- **Display:** 40px Bold, 1.2 line-height — Hero text, main headings
- **Body.Large:** 18px Regular, 1.6 line-height — Emphasized text, introductions
- **Body.Medium:** 16px Regular, 1.6 line-height — Default body text (most common)
- **Body.Small:** 14px Regular, 1.6 line-height — Secondary text, annotations
- **Body-Emphasis.Large:** 18px Bold, 1.6 line-height — Emphasized paragraphs, strong text
- **Body-Emphasis.Medium:** 16px Bold, 1.6 line-height — Feature callouts, highlights
- **Body-Emphasis.Small:** 14px Bold, 1.6 line-height — Bold labels, badges
- **Label.Large:** 18px Bold, 1.4 line-height — Form labels, large UI labels
- **Label.Medium:** 16px Bold, 1.4 line-height — Button text, standard UI labels
- **Label.Small:** 14px Bold, 1.2 line-height — Small UI labels, icon labels
- **Caption:** 12px Regular, 1.2 line-height — Metadata, timestamps, breadcrumbs, hints
- **Link:** Apply `text-decoration: underline` to links; use interactive color tokens for color

---

## Interactive Components

### Buttons

#### Primary Button
- **Fill:** `var(--interactive-primary-fill-default)` (brand pink)
- **Text:** `var(--interactive-primary-text-default)` (white)
- **Icon:** `var(--interactive-primary-icon-default)` (white)
- **Hover fill:** `var(--interactive-primary-fill-hover)` (darker pink)
- **Pressed fill:** `var(--interactive-primary-fill-pressed)` (even darker pink)
- **Minimum size:** 44px × 44px for touch targets
- **Padding:** 12px horizontal, 12px vertical
- **Use:** Main call-to-action, primary actions on a page/section

**Best Practice:** Use only one primary button per section to guide users to the most important action.

#### Secondary Button
- **Fill:** `var(--interactive-secondary-fill-default)` (white/light)
- **Border:** `var(--interactive-secondary-border-default)` (brand purple)
- **Text:** `var(--interactive-secondary-text-default)` (dark)
- **Icon:** `var(--interactive-secondary-icon-default)` (dark)
- **Hover fill:** `var(--interactive-secondary-fill-hover)` (light grey)
- **Pressed fill:** `var(--interactive-secondary-fill-pressed)` (grey)
- **Minimum size:** 44px × 44px for touch targets
- **Padding:** 12px horizontal, 12px vertical
- **Use:** Alternative actions, less important than primary

**Best Practice:** Pair secondary buttons with primary buttons for supporting actions.

#### Link Button
- **Color:** `var(--interactive-link-default)` (purple)
- **Hover:** `var(--interactive-link-hover)` (darker purple)
- **Visited:** `var(--interactive-link-visited)` (visited purple)
- **Decoration:** `text-decoration: underline`
- **Use:** Hyperlinks, text-based navigation

### Forms

**Text Input:**
- Border: `1px solid var(--color-ramp-grey-300)` (default state)
- Focus border: `2px solid var(--interactive-primary-fill-default)`
- Background: `var(--surface-canvas)`
- Padding: 12px
- Font size: 16px (minimum, prevents zoom on mobile)
- Include `<label>` with `htmlFor` matching input `id`

**Disabled Input:**
- Background: `var(--color-ramp-neutral-150)`
- Border: `1px solid var(--color-ramp-grey-200)`
- Opacity: 50%

### Links & Navigation

- Always include `text-decoration: underline` on all links
- Use `aria-current="page"` on active navigation link
- Hover state: Increase opacity by 10% or darken by one ramp shade
- Focus state: `outline: 2px solid var(--surface-accent-strong); outline-offset: 2px`
- Never use color alone to distinguish links; underline is required

---

## Feedback & Messaging

### Error Messages
- **Container fill:** `var(--feedback-error-fill)` (light red)
- **Text:** `var(--feedback-error-text)` (dark red)
- **Border:** `var(--feedback-error-border)` (dark red)
- **Icon:** `var(--feedback-error-icon)` (dark red)
- **Use:** Error alerts, validation failures, destructive warnings

### Success Messages
- **Container fill:** `var(--feedback-success-fill)` (light green)
- **Text:** `var(--feedback-success-text)` (brand green)
- **Border:** `var(--feedback-success-border)` (brand green)
- **Icon:** `var(--feedback-success-icon)` (brand green)
- **Use:** Confirmation messages, completion states, successful actions

### Warning Messages
- **Container fill:** `var(--feedback-warning-fill)` (light yellow)
- **Text:** `var(--feedback-warning-text)` (dark orange)
- **Border:** `var(--feedback-warning-border)` (dark orange)
- **Icon:** `var(--feedback-warning-icon)` (dark orange)
- **Use:** Cautions, alerts, non-critical warnings

### Info Messages
- **Container fill:** `var(--feedback-info-fill)` (light blue)
- **Text:** `var(--feedback-info-text)` (dark blue)
- **Border:** `var(--feedback-info-border)` (dark blue)
- **Icon:** `var(--feedback-info-icon)` (dark blue)
- **Use:** Informational banners, tips, neutral announcements

**Rule:** Never mix feedback colors; always use the complete set (fill + text + border + icon) for consistency.

---

## Responsive Layout

### Breakpoints (Mobile-First)

```css
/* Mobile: 320px – 639px */
@media (min-width: 320px) { /* Mobile styles */ }

/* Tablet: 640px – 1023px */
@media (min-width: 640px) { /* Tablet styles */ }

/* Desktop: 1024px and above */
@media (min-width: 1024px) { /* Desktop styles */ }
```

### Spacing Scale

Use multiples of 4px: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96

- **Padding:** 16px on mobile, 24px on tablet/desktop
- **Margins:** 16px mobile, 24px tablet/desktop
- **Gap (flexbox/grid):** 8px–16px depending on context

### Layout Patterns

- **Single column:** Mobile, then expand to multi-column on tablet/desktop
- **Flex layouts:** Use flexbox for horizontal/vertical alignment; grid for complex layouts
- **Max-width:** 1200px for desktop content
- **Gutter (horizontal padding):** 16px on mobile, 24px on tablet/desktop

---

## Do's & Don'ts

### ✅ Do

| Rule | Example |
|------|---------|
| Use semantic HTML | `<button>`, `<a>`, `<h1>`, `<label>` instead of `<div>` |
| Always pair surface fill with matching shadow | Level 1 fill + Level 1 shadow |
| Include focus styles on all interactive elements | `outline: 2px solid var(--surface-accent-strong)` |
| Use token variables for all colors/spacing | `var(--surface-level-1)`, not `#ffffff` |
| Use one primary button per section/page | Guide users to the most important action |
| Add `aria-label` for icon-only buttons | `<button aria-label="Close menu">...</button>` |
| Keep button labels action-oriented | "Save Settings", not "OK" |
| Include `<label>` for form inputs | `<label htmlFor="email">Email</label><input id="email" />` |
| Use WCAG AA contrast ratios | 4.5:1 for body text, 3:1 for UI text |
| Combine accent colors thoughtfully | Use strong for emphasis, subtle for backgrounds |

### 🚫 Don't

| Rule | Example |
|-------|---------|
| Don't use hardcoded colors | Avoid `#ffffff`; use `var(--surface-canvas)` |
| Don't mix elevation levels inappropriately | Don't pair Level 1 fill with Level 3 shadow |
| Don't remove focus outlines | Never use `outline: none` without replacement |
| Don't use multiple primary buttons | Only one primary per section |
| Don't place buttons with line breaks | Keep button text on one line |
| Don't use color alone to indicate state | Always include text, underline, or icon change |
| Don't use `<div>` for buttons/links | Use semantic `<button>` and `<a>` elements |
| Don't forget aria-labels for icons | Icon-only elements need accessible names |
| Don't use low contrast text | Must pass WCAG AA (4.5:1 minimum) |
| Don't hardcode spacing values | Use spacing multiples: 4, 8, 12, 16, 20, 24, etc. |

---

## Component-Specific Guidelines

### Cards

Cards are used to group related content and actions. Always use:

```css
background-color: var(--surface-level-1);
box-shadow: var(--shadow-elevation-1);
border-radius: 8px;
padding: 16px; /* mobile */ / 24px; /* desktop */
```

**Variants:**
- **Default card:** Standard content grouping
- **Featured card:** Add `border-left: 4px solid var(--surface-accent-strong)` for emphasis
- **Interactive card:** Add `cursor: pointer` and hover opacity change; ensure keyboard navigation works

### Modals & Overlays

Modals use Level 4 surface with highest elevation:

```css
background-color: var(--surface-level-4);
box-shadow: var(--shadow-elevation-4);
position: fixed;
z-index: 1000;
```

**Rules:**
- Always include close button with `aria-label="Close"`
- Modal header should use `<h2>` or `<h3>`
- Include focus trap: first and last focusable elements should wrap focus
- Use `aria-modal="true"` on modal container

### Dropdowns & Popovers

Use Level 2 surface for floating menus:

```css
background-color: var(--surface-level-2);
box-shadow: var(--shadow-elevation-2);
border: 1px solid var(--border-elevation-level-2-primary);
z-index: 200;
```

**Rules:**
- Include `aria-expanded` on trigger button
- Close menu when user clicks outside
- Support keyboard navigation (Up/Down arrows, Escape to close)

### Navigation

Navigation bars typically use canvas or undercanvas level:

```css
background-color: var(--surface-canvas); /* or var(--surface-undercanvas) for sticky */
box-shadow: var(--shadow-elevation-0);
```

**Rules:**
- Active link: Use `aria-current="page"`
- Include responsive hamburger menu on mobile
- Support keyboard navigation (Tab between items)
- Use `<nav>` semantic element

### Alerts & Banners

Use feedback token sets (error, success, warning, info):

```css
/* Error example */
background-color: var(--feedback-error-fill);
border-left: 4px solid var(--feedback-error-border);
color: var(--feedback-error-text);
padding: 16px;
```

**Rules:**
- Always include icon + text + optional close button
- Use `role="alert"` for urgent messages
- Position at top of viewport or in-context
- Include clear, actionable messaging

---

## Performance & Code Quality

- Minimize layout thrashing; batch DOM reads and writes
- Use CSS classes instead of inline styles for repeated patterns
- Lazy-load images and defer non-critical JavaScript
- Keep component files under 300 lines; extract helpers to separate files
- Avoid deeply nested selectors (2–3 levels maximum)
- Use modern CSS (flexbox/grid) instead of floats or table layouts
- Optimize for performance: aim for Lighthouse scores of 90+ on desktop, 85+ on mobile

---

## Summary: Quick Reference

**Always use:**
- Semantic HTML (`<button>`, `<label>`, `<h1>`, etc.)
- CSS tokens: `var(--surface-level-1)`, `var(--feedback-error-fill)`, etc.
- WCAG AA contrast (4.5:1 body, 3:1 UI)
- Focus styles: `outline: 2px solid var(--surface-accent-strong)`
- Mobile-first responsive design
- Proper aria-labels and semantic roles

**Never use:**
- Hardcoded colors or spacing
- Outdated HTML (`<div>` for buttons/links)
- Removed focus styles
- Multiple primary buttons per section
- Low contrast text

**Remember:**
- Pair surface fill with matching elevation shadow
- Use accents intentionally (strong for emphasis, subtle for backgrounds)
- One primary action per section guides users effectively
- Keyboard navigation and accessibility are non-negotiable
