# Indeemo Design System for AI

This repository contains materials, guidelines, and artifacts for creating an AI-enabled design system for Indeemo.

**Project:** Indeemo — https://indeemo.com/

**Contents:**
- `GUIDELINE.md`: Consolidated guidelines for Figma + Make workflows, AI prompt patterns, and design system integration.
- `TOKEN_DOCUMENTATION.md`: Comprehensive documentation for all design tokens (colors, typography, scales, and usage).
- `QUICKSTART.md`: Quick start guide for syncing design tokens to Figma via the REST API.
- `tokens/`: JSON files defining design tokens (colors, spacing, typography).
- `src/figma_variables_bridge.js`: MCP bridge server for syncing tokens to Figma.

**Goal:** Provide a reproducible, auditable design-system foundation (tokens, components, documentation and automation patterns) that pairs with AI-assisted workflows.

## Key Figma Files

This project references three essential Figma files:

- **Token Library:** Design tokens (colors, spacing, typography) — [View file](https://www.figma.com/design/xKCxXToxIpf4ELOSMaUDYT/Indeemo-Tokens?node-id=2002-100&m=dev)
- **UI Kit:** Reusable components — [View file](https://www.figma.com/design/ytUJSttPknq8WjzSQYlFux/Indeemo-UI-Kit?node-id=8-310&m=dev)
- **Icons:** Icon library — [View file](https://www.figma.com/design/JPIsyRnhHuBWwJSeVEVsmc/Indeemo-Icons?node-id=0-1&m=dev)

If you don't have access to these files, contact your project administrator.

## 🚀 Quick Start: Figma Variables API

**New!** You can now define design tokens as JSON and sync them to Figma automatically.

1. **Start the bridge:** `npm start`
2. **Set credentials:** `export FIGMA_TOKEN="your_token"`
3. **Ask the assistant:** "Sync `tokens/colors.json` to Figma"

See `QUICKSTART.md` for full instructions and examples.

**Benefits:**
- Version-controlled design tokens (stored as JSON in this repo)
- Automated sync to Figma Variables
- Support for light/dark modes and multiple themes
- Easy collaboration and code review for token changes

---

## Getting Started

1. Review `GUIDELINE.md` for design-system workflows and AI prompt patterns
2. Review `TOKEN_DOCUMENTATION.md` for comprehensive token reference
3. Access the Figma files listed above to view or edit design assets
4. **New:** Check `QUICKSTART.md` to sync design tokens to Figma via API
