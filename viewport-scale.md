# Viewport Scale Plan

This document outlines the plan to reorganize all design tokens under viewport groupings for easy export to Token Studio. All scalable aspects (grid, typography, fluid spacing) and static spacing (duplicated for organizational purposes) will be grouped under each viewport breakpoint.

## Viewport Breakpoints

- **small**: 0-767px
- **medium**: 768-1023px
- **large**: 1024-1439px
- **xlarge**: 1440-1920px

## Grid Scaling

Each viewport will contain grid properties that scale appropriately:

### Small
- Column: 4
- Margin: 20px
- Gutter: 20px
- Viewport: 393px

### Medium
- Column: 12
- Margin: 24px
- Gutter: 20px
- Viewport: 768px

### Large
- Column: 12
- Margin: 32px
- Gutter: 20px
- Viewport: 1024px

### XLarge
- Column: 12
- Margin: 32px
- Gutter: 20px
- Viewport: 1440px

## Typography Scaling

Typography uses a mathematical approach with base values and multipliers for scalable, responsive design.

### Font Size Calculation
Font sizes are calculated using: `base_font_size × scale_factor × viewport_multiplier`

Where:
- **base_font_size**: Reference font size (16px)
- **scale_factor**: Relative size multiplier for each scale step (e.g., 0.5 for xxs, 1.0 for md, 1.5 for xl)
- **viewport_multiplier**: Adjusts all typography proportionally per viewport

### Viewport Typography Multipliers
- **small**: base_font_size = 14px, multiplier = 1.0
- **medium**: base_font_size = 16px, multiplier = 1.0
- **large**: base_font_size = 16px, multiplier = 1.125
- **xlarge**: base_font_size = 16px, multiplier = 1.25

### Font Size Scale Factors (Applied to All Viewports)
- xxs: 0.5 (8px → 8px → 8px → 10px across viewports)
- xs: 0.75 (10px → 12px → 14px → 14px)
- sm: 0.875 (12px → 14px → 16px → 18px)
- md: 1.0 (14px → 16px → 18px → 20px)
- lg: 1.125 (16px → 18px → 20px → 22px)
- xl: 1.25 (18px → 20px → 22px → 24px)
- xxl: 1.375 (20px → 22px → 24px → 26px)
- 3xl: 1.5 (20px → 24px → 26px → 28px)
- 4xl: 1.75 (24px → 28px → 30px → 34px)
- 5xl: 2.0 (28px → 32px → 36px → 40px)
- 6xl: 2.125 (30px → 34px → 38px → 42px)
- 7xl: 2.25 (32px → 36px → 40px → 44px)

### Line Heights (Fixed multipliers, applied to calculated font sizes)
- tight: 1.0 (100% of font size)
- normal: 1.125 (112.5% of font size)
- loose: 1.25 (125% of font size)
- extra-loose: 1.5 (150% of font size)

## Spacing Scaling

### Static Spacing (Global, non-scaling)
Static spacing tokens remain global and do not scale with viewport. They follow a progressive scale from 2px to 200px.

Naming convention: `spacing.static.010`, `spacing.static.020`, etc.

Values:
- 010: 2px
- 020: 4px
- 030: 6px
- 040: 8px
- 050: 10px
- 060: 12px
- 080: 16px
- 100: 20px
- 120: 24px
- 160: 32px
- 200: 40px
- 240: 48px
- 280: 56px
- 320: 64px
- 360: 72px
- 400: 80px
- 480: 96px
- 560: 112px
- 640: 128px
- 800: 160px
- 960: 192px
- 1000: 200px

### Fluid Spacing (Viewport-scaling)
Fluid spacing uses multipliers for proportional scaling across viewports.

### Fluid Spacing Calculation
Fluid spacing is calculated using: `base_spacing × scale_factor × viewport_multiplier`

Where:
- **base_spacing**: Reference spacing unit (4px)
- **scale_factor**: Relative size multiplier for each spacing step (e.g., 0.5 for 010, 1.0 for 040, 2.0 for 080)
- **viewport_multiplier**: Adjusts all fluid spacing proportionally per viewport

### Viewport Fluid Spacing Multipliers
- **small**: base_spacing = 4px, multiplier = 1.0
- **medium**: base_spacing = 4px, multiplier = 1.0
- **large**: base_spacing = 4px, multiplier = 1.25
- **xlarge**: base_spacing = 4px, multiplier = 1.5

### Fluid Spacing Scale Factors (Applied to All Viewports)
- 010: 0.5 (2px → 2px → 2px → 2px across viewports)
- 020: 1.0 (4px → 4px → 4px → 6px)
- 040: 2.0 (8px → 8px → 10px → 12px)
- 060: 3.0 (12px → 12px → 14px → 18px)
- 080: 4.0 (16px → 16px → 20px → 24px)
- 100: 5.0 (20px → 20px → 24px → 30px)
- 120: 6.0 (24px → 24px → 28px → 36px)
- 160: 8.0 (32px → 32px → 40px → 48px)
- 240: 12.0 (48px → 48px → 60px → 72px)
- 320: 16.0 (64px → 64px → 80px → 96px)

## Proposed Token Implementation

Below is the detailed proposal for tokens to be added to `tokens/tokens.json`. Each token shows its grouping path, value in each viewport, and type.

### Grid Tokens

**Grouping:** `viewport.{viewport}.grid.*`

| Token Path | Small (0-767px) | Medium (768-1023px) | Large (1024-1439px) | XLarge (1440-1920px) | Type |
|------------|-----------------|---------------------|---------------------|----------------------|------|
| `viewport.small.grid.column` | 4 | - | - | - | spacing |
| `viewport.small.grid.margin` | 20 | - | - | - | spacing |
| `viewport.small.grid.gutter` | 20 | - | - | - | spacing |
| `viewport.small.grid.viewport` | 393 | - | - | - | spacing |
| `viewport.medium.grid.column` | - | 12 | - | - | spacing |
| `viewport.medium.grid.margin` | - | 24 | - | - | spacing |
| `viewport.medium.grid.gutter` | - | 20 | - | - | spacing |
| `viewport.medium.grid.viewport` | - | 768 | - | - | spacing |
| `viewport.large.grid.column` | - | - | 12 | - | spacing |
| `viewport.large.grid.margin` | - | - | 32 | - | spacing |
| `viewport.large.grid.gutter` | - | - | 20 | - | spacing |
| `viewport.large.grid.viewport` | - | - | 1024 | - | spacing |
| `viewport.xlarge.grid.column` | - | - | - | 12 | spacing |
| `viewport.xlarge.grid.margin` | - | - | - | 32 | spacing |
| `viewport.xlarge.grid.gutter` | - | - | - | 20 | spacing |
| `viewport.xlarge.grid.viewport` | - | - | - | 1440 | spacing |

### Typography Tokens

**Grouping:** `viewport.{viewport}.typography.*`

Font sizes calculated using multipliers, line heights are consistent across viewports.

| Token Path | Small (14px × 1.0) | Medium (16px × 1.0) | Large (16px × 1.125) | XLarge (16px × 1.25) | Type |
|------------|---------------------|----------------------|-----------------------|-----------------------|------|
| `viewport.small.typography.fontSize.xxs` | 8 | 8 | 8 | 10 | fontSizes |
| `viewport.small.typography.fontSize.xs` | 10 | 12 | 14 | 14 | fontSizes |
| `viewport.small.typography.fontSize.sm` | 12 | 14 | 16 | 18 | fontSizes |
| `viewport.small.typography.fontSize.md` | 14 | 16 | 18 | 20 | fontSizes |
| `viewport.small.typography.fontSize.lg` | 16 | 18 | 20 | 22 | fontSizes |
| `viewport.small.typography.fontSize.xl` | 18 | 20 | 22 | 24 | fontSizes |
| `viewport.small.typography.fontSize.xxl` | 20 | 22 | 24 | 26 | fontSizes |
| `viewport.small.typography.fontSize.3xl` | 20 | 24 | 26 | 28 | fontSizes |
| `viewport.small.typography.fontSize.4xl` | 24 | 28 | 30 | 34 | fontSizes |
| `viewport.small.typography.fontSize.5xl` | 28 | 32 | 36 | 40 | fontSizes |
| `viewport.small.typography.fontSize.6xl` | 30 | 34 | 38 | 42 | fontSizes |
| `viewport.small.typography.fontSize.7xl` | 32 | 36 | 40 | 44 | fontSizes |
| `viewport.small.typography.lineHeight.tight` | 1.0 | 1.0 | 1.0 | 1.0 | lineHeights |
| `viewport.small.typography.lineHeight.normal` | 1.125 | 1.125 | 1.125 | 1.125 | lineHeights |
| `viewport.small.typography.lineHeight.loose` | 1.25 | 1.25 | 1.25 | 1.25 | lineHeights |
| `viewport.small.typography.lineHeight.extra-loose` | 1.5 | 1.5 | 1.5 | 1.5 | lineHeights |

### Fluid Spacing Tokens

**Grouping:** `viewport.{viewport}.spacing.fluid.*`

Fluid spacing calculated using multipliers for proportional scaling.

| Token Path | Small (4px × 1.0) | Medium (4px × 1.0) | Large (4px × 1.25) | XLarge (4px × 1.5) | Type |
|------------|-------------------|---------------------|---------------------|---------------------|------|
| `viewport.small.spacing.fluid.010` | 2 | 2 | 2 | 2 | spacing |
| `viewport.small.spacing.fluid.020` | 4 | 4 | 4 | 6 | spacing |
| `viewport.small.spacing.fluid.040` | 8 | 8 | 10 | 12 | spacing |
| `viewport.small.spacing.fluid.060` | 12 | 12 | 14 | 18 | spacing |
| `viewport.small.spacing.fluid.080` | 16 | 16 | 20 | 24 | spacing |
| `viewport.small.spacing.fluid.100` | 20 | 20 | 24 | 30 | spacing |
| `viewport.small.spacing.fluid.120` | 24 | 24 | 28 | 36 | spacing |
| `viewport.small.spacing.fluid.160` | 32 | 32 | 40 | 48 | spacing |
| `viewport.small.spacing.fluid.240` | 48 | 48 | 60 | 72 | spacing |
| `viewport.small.spacing.fluid.320` | 64 | 64 | 80 | 96 | spacing |

### Static Spacing Tokens

**Grouping:** `viewport.{viewport}.spacing.static.*` (duplicated in each viewport)

These remain static and do not scale with viewport, but are grouped under each viewport for organizational purposes.

| Token Path | All Viewports | Type |
|------------|---------------|------|
| `viewport.small.spacing.static.010` | 2 | spacing |
| `viewport.small.spacing.static.020` | 4 | spacing |
| `viewport.small.spacing.static.030` | 6 | spacing |
| `viewport.small.spacing.static.040` | 8 | spacing |
| `viewport.small.spacing.static.050` | 10 | spacing |
| `viewport.small.spacing.static.060` | 12 | spacing |
| `viewport.small.spacing.static.080` | 16 | spacing |
| `viewport.small.spacing.static.100` | 20 | spacing |
| `viewport.small.spacing.static.120` | 24 | spacing |
| `viewport.small.spacing.static.160` | 32 | spacing |
| `viewport.small.spacing.static.200` | 40 | spacing |
| `viewport.small.spacing.static.240` | 48 | spacing |
| `viewport.small.spacing.static.280` | 56 | spacing |
| `viewport.small.spacing.static.320` | 64 | spacing |
| `viewport.small.spacing.static.360` | 72 | spacing |
| `viewport.small.spacing.static.400` | 80 | spacing |
| `viewport.small.spacing.static.480` | 96 | spacing |
| `viewport.small.spacing.static.560` | 112 | spacing |
| `viewport.small.spacing.static.640` | 128 | spacing |
| `viewport.small.spacing.static.800` | 160 | spacing |
| `viewport.small.spacing.static.960` | 192 | spacing |
| `viewport.small.spacing.static.1000` | 200 | spacing |
| *(Same tokens for medium, large, xlarge with identical values)* | | |

## JSON Structure Example

```json
{
  "viewport": {
    "small": {
      "grid": {
        "column": { "value": "4", "type": "spacing" },
        "margin": { "value": "20", "type": "spacing" },
        "gutter": { "value": "20", "type": "spacing" },
        "viewport": { "value": "393", "type": "spacing" }
      },
      "typography": {
        "fontSize": {
          "xxs": { "value": "8", "type": "fontSizes" },
          "xs": { "value": "12", "type": "fontSizes" },
          // ... all font sizes
        },
        "lineHeight": {
          "tight": { "value": "1.0", "type": "lineHeights" },
          "normal": { "value": "1.125", "type": "lineHeights" },
          "loose": { "value": "1.25", "type": "lineHeights" },
          "extra-loose": { "value": "1.5", "type": "lineHeights" }
        }
      },
      "spacing": {
        "static": {
          "010": { "value": "2", "type": "spacing" },
          "020": { "value": "4", "type": "spacing" },
          // ... all static spacing
        },
        "fluid": {
          "010": { "value": "2", "type": "spacing" },
          "020": { "value": "4", "type": "spacing" },
          // ... all fluid spacing
        }
      }
    },
    "medium": {
      // Similar structure with medium values
    },
    "large": {
      // Similar structure with large values
    },
    "xlarge": {
      // Similar structure with xlarge values
    }
  }
}
```

## Implementation Notes

1. **Typography**: Initially uses the same values across all viewports. Future scaling can be implemented by adjusting the base multiplier per viewport.

2. **Fluid Spacing**: Base values shown. Actual implementation will require scaling logic (e.g., percentage-based scaling relative to viewport size).

3. **Existing Tokens**: The current `viewport/large` and `viewport/xlarge` in tokens.json appear to have swapped viewport values and should be corrected to match this proposal.

4. **Token Studio Export**: This structure enables easy export to Token Studio with viewport-specific token sets that can be toggled based on breakpoint.

5. **Token Migration**: Move existing tokens from `styles` group rather than duplicating them. This ensures no duplicate tokens exist.

## Implementation To-Do

- [ ] **Audit Current Token Structure**: Review existing `styles.typography` and `styles.spacing` tokens to identify what needs to be moved vs. what stays
- [ ] **Move Typography Tokens**: Relocate `styles.typography.*` tokens to `viewport.{viewport}.typography.*` structure with calculated values
- [ ] **Move Spacing Tokens**: Relocate existing spacing scale to `viewport.{viewport}.spacing.static.*` (duplicated across viewports for organization)
- [ ] **Implement Multipliers**: Add base values and multipliers to enable mathematical scaling calculations
- [ ] **Update Token References**: Ensure all moved tokens maintain proper references and don't break existing usage
- [ ] **Update Current Typography Styles**: Modify existing `styles.link`, `styles.body`, and `styles.label` tokens to reference new viewport groupings instead of old `typography.scale.*` paths
- [ ] **Remove Old Structure**: Delete the original `styles` group after successful migration
- [ ] **Add Grid Tokens**: Implement the grid scaling tokens for each viewport
- [ ] **Add Fluid Spacing**: Create new fluid spacing tokens with multiplier-based calculations
- [ ] **Update Themes**: Modify `$themes` configuration to work with new viewport structure
- [ ] **Test Token Resolution**: Verify all tokens resolve correctly in Token Studio and CSS output
- [ ] **Update TOKEN_DOCUMENTATION.md**: Update relevant sections (Typography Styles, Spacing Scale, token tables, etc.) to reflect new viewport-based structure once `tokens/tokens.json` is updated
- [ ] **Push and Merge to Main**: Commit all changes and merge the viewport scale implementation to the main branch in the repository

This structure allows for easy export to Token Studio with viewport-specific scaling while maintaining global static spacing.
