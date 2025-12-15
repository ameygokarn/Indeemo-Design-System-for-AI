# Indeemo Design System Token Improvement Plan

## Overview
Systematic enhancement of design tokens based on Carbon Design System best practices while maintaining Token Studio compatibility. This plan follows a phased approach based on priority and impact.

## Phase 1: Critical - Week 1 (Accessibility & Foundation)

### 1. Breakpoint Tokens
- [ ] **Add responsive breakpoint tokens**
  - Define breakpoints: sm (320px), md (672px), lg (1056px), xl (1312px), max (1584px)
  - Use `number` type for Token Studio compatibility
  - Test export to Figma variables

### 2. Missing Interactive States (Accessibility Requirement)
- [ ] **Add focus states**
  - Primary focus: `{color.ramp.pink.600}` for 3:1 minimum contrast
  - Secondary focus: `{color.ramp.purple.600}`
  - Include descriptions for Figma Make

- [ ] **Add active states**
  - Active state for buttons during click/activation
  - Ensure proper contrast ratios

- [ ] **Add selected states**
  - For tabs, menu items, selected options
  - Consistent visual treatment

### 3. Icon Size Tokens
- [ ] **Add basic icon sizing**
  - Standard sizes: xs (16px), sm (20px), md (24px), lg (32px), xl (40px)
  - Use `sizing` type for Token Studio
  - Include descriptions for Figma variable mapping

## Phase 2: High Priority - Week 2 (Component Foundation)

### 4. Carbon-like Type Roles
- [ ] **Implement systematic typography roles**
  - Heading-01 through Heading-07 (12px to 36px)
  - Body-01 through Body-04 (12px to 18px)
  - Code, caption, label roles
  - Update `styles.typography` section

### 5. Component Tokens
- [ ] **Add button tokens**
  - Border radius, border width, padding (sm/md/lg)
  - Use `borderRadius`, `borderWidth`, `spacing` types

- [ ] **Add input tokens**
  - Padding, border radius, border colors
  - Focus and error states

- [ ] **Add card tokens**
  - Padding, border radius, shadow references

### 6. Grid System Tokens
- [ ] **Add 2x grid system**
  - Column counts per breakpoint (sm:4, md:8, lg:16, xl:16, max:16)
  - Gutter and margin tokens referencing spacing scale
  - Responsive grid variables

## Phase 3: Medium Priority - Week 3 (Enhanced Systems)

### 7. Icon Color Tokens
- [ ] **Add semantic icon colors**
  - Primary, secondary, disabled icon colors
  - Interactive icon states (default, hover)
  - Feedback icon colors (error, success, warning, info)

### 8. Motion & Animation Tokens
- [ ] **Add timing and easing tokens**
  - Duration: fast (100ms), moderate (200ms), slow (300ms)
  - Easing: standard, entrance, exit
  - Use `duration` and `cubicBezier` types

### 9. Overlay Colors
- [ ] **Add overlay semantic tokens**
  - Background overlay: rgba(0, 0, 0, 0.5)
  - Scrim overlay: rgba(0, 0, 0, 0.7)
  - For modals, dialogs, floating elements

## Phase 4: Nice-to-Have - Week 4 (Advanced Features)

### 10. Responsive Typography
- [ ] **Add breakpoint-based type scales**
  - Adjust font sizes at different breakpoints
  - Responsive line heights
  - Enhanced readability

### 11. Expanded Component Tokens
- [ ] **Add tokens for all major components**
  - Modals, dialogs, alerts
  - Navigation, tabs, accordions
  - Tables, lists, forms

### 12. Data Visualization Colors
- [ ] **Add chart and graph colors**
  - Sequential, diverging, categorical color scales
  - Accessible color combinations
  - Chart-specific semantic tokens

## Token Studio Compatibility Requirements

All tokens must:
- ✅ Use proper Token Studio types (`spacing`, `sizing`, `duration`, `cubicBezier`, etc.)
- ✅ Include descriptions for Figma Make ingestion
- ✅ Maintain backward compatibility where possible
- ✅ Export correctly to Figma variables
- ✅ Follow naming conventions: `category.tokenName.scale`

## Success Metrics

1. **Accessibility**: All interactive states meet WCAG 2.1 AA requirements
2. **Consistency**: Component implementations use tokens consistently (90%+ token usage)
3. **Developer Experience**: Clear token naming and comprehensive documentation
4. **Performance**: Minimal CSS output from token generation (<50KB for all tokens)
5. **Maintainability**: Easy to update and extend token system

## Implementation Notes

### Spacing Scale (Already Implemented)
- ✅ Base unit: `brand.spacing.base` (2px)
- ✅ 14-step scale: xxs (2px) to 9xl (192px)
- ✅ All values are multiples of 2px
- ✅ References used for scalability (`{spacing.base} * N`)

### Current Strengths to Maintain
- Comprehensive color ramps with WCAG contrast data
- Clear semantic organization (surface, interactive, feedback)
- Detailed typography scale with Figma Make metadata
- IBM Plex Sans font family with regular/bold weights

### Documentation Updates Required
- Update `TOKEN_DOCUMENTATION.md` after each phase
- Add examples for new token categories
- Include usage guidelines for designers and developers
- Update `GUIDELINE.md` with new workflows

## References
- [Token Studio Documentation](https://docs.tokens.studio/)
- [Carbon Design System](https://carbondesignsystem.com/)
- [Figma Variables](https://help.figma.com/hc/en-us/articles/15139647170711-Create-and-manage-variables)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Based on detailed analysis in `CARBON_IMPROVEMENTS_ANALYSIS.md`*
*Last Updated: December 15, 2025*
*Next Review: After Phase 1 completion*
