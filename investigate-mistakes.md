# Investigation: Broken Semantic Tokens and Missing Typography Foundation

## Incident Report
**Date:** December 17, 2025
**Issue:** User reported "semantic is totally broken" and "can't see the foundation tokens for typography" after recent edits to `tokens/tokens.json`.

## Analysis Steps
1.  **Check latest commit for theme export fix (CRITICAL)**: Reviewed commit `25246b1`. It aimed to remove duplicate typography tokens. However, user feedback indicates `brand` MUST contain foundational typography tokens (`fontFamily`, `fontWeight`, `lineHeight`). The "theme export fix" likely refers to the `$themes` and `$metadata` configuration which must be preserved.
2.  **Verify Token Groupings against requirements**:
    *   **Brand (foundation)**: Should contain `brand colours`, `ramps`, `font families`, `font weights`, `line heights`.
        *   *Status*: `fontFamily` and `fontWeight` restored. `lineHeight` restored to `brand`.
    *   **Semantic**: ONLY for semantic colour.
        *   *Status*: Verified. Contains `surface`, `interactive`, etc. which are color-based.
    *   **Styles**: Composite tokens. Typography should reference foundation for family/weight and viewport grouping for size/height.
        *   *Status*: References updated to `{brand.typography...}`. `lineHeight` references `{brand.typography.lineHeight...}` as requested (non-scaling). `fontSize` references `{viewport/.../fontSize...}` (scaling).
    *   **Viewport groupings**: Scale of aspects that change when viewport is changed (`spacing`, `font size`, etc.).
        *   *Status*: `lineHeight` removed as it does not scale.

## Findings
*   `brand` set was missing `lineHeight` tokens, now restored.
*   `styles` references were updated to align with the new structure.
*   `semantic` integrity verified.
*   `viewport` sets cleaned of non-scaling tokens.

## To-Do List (Recovery Plan)
- [x] **Restore Brand Line Heights**: Add `lineHeight` tokens to the `brand` set (Foundation).
- [x] **Verify Semantic Integrity**: Confirm `semantic` set contains ONLY color tokens and references are valid.
- [x] **Verify Styles Typography**:
    - [x] Font Family: Reference `{brand.typography.fontFamily.a}`.
    - [x] Font Weight: Reference `{brand.typography.fontWeight.regular}` / `{brand.typography.fontWeight.bold}`.
    - [x] Font Size: Reference `{viewport/.../fontSize...}`.
    - [x] Line Height: Reference `{brand.typography.lineHeight...}` (Updated requirement: never scale).
- [x] **Verify Theme Export Config**: Ensure `$themes` and `$metadata` sections at the end of `tokens.json` match the user's expectations and latest commit.
- [x] **Cleanup**: Remove any duplicate top-level `typography` sets if they exist (verified: they don't).
