# Investigation: Broken Semantic Tokens and Typography References

## Incident Report
**Date:** December 17, 2025
**User Feedback:** "Semantic colour still broken", "typography style references still broken".
**Specific Examples:**
*   `link.large` should use `{typography.fontFamily.a}` instead of `{brand.typography.fontFamily.a}`.
*   `link.large` should use `{typography.fontSize.lg}` instead of `{viewport/medium.typography.fontSize.lg}`.
*   `link.large` should use `{typography.lineHeight.loose}` instead of `{brand.typography.lineHeight.loose}`.

## Root Cause Analysis (Mistakes Made)
1.  **Misunderstanding Token Studio Resolution:** I assumed that explicit references (e.g., `{brand.typography...}`) were safer. However, Token Studio works by "flattening" the active token sets. When the `brand` set is active (source), its tokens are exposed at the root level of that set's structure. If `typography` is a top-level group *within* the `brand` set, it resolves as `{typography...}` when `brand` is active.
2.  **Viewport Reference Error:** I explicitly referenced `{viewport/medium...}` in `styles`. This hardcodes the dependency to the "medium" set. The correct approach for Token Studio (especially with theme switching) is to reference the generic token path `{typography.fontSize...}`. The *value* of that token is determined by which viewport set (Small, Medium, Large, XLarge) is currently *active* in the theme.
3.  **Semantic Set Breakage:** If `semantic` tokens reference `brand` tokens using explicit `{color.brand...}` paths, but the `brand` set structure exposes them differently (or if the plugin expects flattened paths when `brand` is a source), the references break. However, `semantic` tokens usually reference `brand` tokens. The issue might be similar: referencing `{color.brand.cream}` vs `{brand.color.brand.cream}` vs `{cream}`? No, standard is `{color.brand.cream}` if `color` is at the root of `brand`.
    *   **Wait**, if I changed `styles` references to be explicit `{brand...}`, maybe I inadvertently changed `semantic` references too? I should check.
    *   **Or**, if the "theme export" configuration expects `brand` to be treated as a base set where references *dont* need the set name prefix.

## Correction Plan
1.  **Revert to Implicit References in `styles`**: Update `styles` tokens to use paths relative to the active source sets (Brand and Viewport).
    *   `{brand.typography.fontFamily.a}` -> `{typography.fontFamily.a}`
    *   `{brand.typography.fontWeight...}` -> `{typography.fontWeight...}`
    *   `{brand.typography.lineHeight...}` -> `{typography.lineHeight...}`
    *   `{viewport/medium.typography.fontSize...}` -> `{typography.fontSize...}` (This is the critical fix for viewport scaling!)
2.  **Investigate Semantic Colors**: Check `semantic` references. They currently look like `{color.brand.white}`. If `color` is the top-level key in the `brand` set, this reference is correct *within* the context of active themes. If they are broken, maybe the definition in `brand` is wrong?
    *   In `brand`: `"color": { "brand": { ... } }`.
    *   So `{color.brand.white}` is correct.
    *   Why "broken"? Maybe the user means they don't show up?
    *   I will double-check the JSON structure of `semantic` again.

## To-Do List (New Phase)
- [ ] **Fix Typography Style References**:
    - [ ] Change `fontFamily` refs to `{typography.fontFamily.a}`.
    - [ ] Change `fontWeight` refs to `{typography.fontWeight...}`.
    - [ ] Change `lineHeight` refs to `{typography.lineHeight...}`.
    - [ ] Change `fontSize` refs to `{typography.fontSize...}` (removing `viewport/medium` prefix).
- [ ] **Investigate Semantic Set**:
    - [ ] Verify `semantic` references match the structure in `brand`.
    - [ ] Ensure no explicit set prefixes (like `brand.`) are used if they are not needed.
- [ ] **Verify Themes**: Check if `$themes` properly enables `brand` and `viewport` sets so that `{typography...}` resolves correctly.
- [ ] **Commit and Push**: Ensure clean history.
