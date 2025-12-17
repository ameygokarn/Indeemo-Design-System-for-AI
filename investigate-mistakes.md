# Investigation: Broken Semantic Tokens and Typography References

## Incident Report
**Date:** December 17, 2025
**User Feedback:** "Semantic colour still broken", "typography style references still broken".
**Specific Examples:**
*   `link.large` should use `{typography.fontFamily.a}` instead of `{brand.typography.fontFamily.a}`.
*   `link.large` should use `{typography.fontSize.lg}` instead of `{viewport/medium.typography.fontSize.lg}`.
*   `link.large` should use `{typography.lineHeight.loose}` instead of `{brand.typography.lineHeight.loose}`.
*   **Critical Mistake:** "I dont need these [separate description tokens], the description is PART OF THE TOKEN not a seperate token".

## Root Cause Analysis (Mistakes Made)
1.  **Misunderstanding Token Studio Resolution:** I assumed that explicit references (e.g., `{brand.typography...}`) were safer. However, Token Studio works by "flattening" the active token sets.
2.  **Viewport Reference Error:** I explicitly referenced `{viewport/medium...}` in `styles`. This hardcodes the dependency to the "medium" set.
3.  **Semantic Set Breakage:** Likely due to similar reference issues or structure perception.
4.  **Description Format Error:** I erroneously created separate tokens for descriptions (e.g., `interactive.primary.fill.description`) instead of adding a `description` property to the parent token. This clutters the token file and is semantically incorrect for the design system.

## Correction Plan
1.  **Revert to Implicit References in `styles`**: Update `styles` tokens to use paths relative to the active source sets (Brand and Viewport).
    *   `{brand.typography.fontFamily.a}` -> `{typography.fontFamily.a}`
    *   `{brand.typography.fontWeight...}` -> `{typography.fontWeight...}`
    *   `{brand.typography.lineHeight...}` -> `{typography.lineHeight...}`
    *   `{viewport/medium.typography.fontSize...}` -> `{typography.fontSize...}`
2.  **Investigate Semantic Colors**: Check `semantic` references. Ensure they are correct relative to `brand` structure.
3.  **Fix Descriptions**: Remove all separate `description` tokens and ensure descriptions are properties of the actual tokens.
4.  **Update Rules**: Modify `guideline.md` to explicitly forbid separate description tokens.

## To-Do List (New Phase)
- [x] **Fix Typography Style References**:
    - [x] Change `fontFamily` refs to `{typography.fontFamily.a}`.
    - [x] Change `fontWeight` refs to `{typography.fontWeight...}`.
    - [x] Change `lineHeight` refs to `{typography.lineHeight...}`.
    - [x] Change `fontSize` refs to `{typography.fontSize...}` (removing `viewport/medium` prefix).
- [x] **Investigate Semantic Set**:
    - [x] Verify `semantic` references match the structure in `brand`.
- [x] **Fix Descriptions**:
    - [x] Remove separate description tokens from `tokens/tokens.json`.
    - [x] Verify no other separate description tokens exist.
- [x] **Update Documentation**:
    - [x] Update `guideline.md` with strict rules about description formatting.
- [ ] **Commit and Push**: Ensure clean history.
