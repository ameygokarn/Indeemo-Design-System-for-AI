# Token System Updates Summary

## 1. Brand Color System Restructuring

### Removed
- ❌ `brand.color.ramp.cream` - Too similar to yellow, removed entirely

### Added
- ✅ `brand.color.brand.green` - #2B5926 (for success states)
- ✅ `brand.color.ramp.green` - 21-shade ramp with HSL methodology (hue 120)

### Current Brand Colors
```
brand.color.brand:
  - cream
  - dark-blue
  - green (NEW)
  - grey
  - neutral
  - orange
  - pink
  - purple
  - red
  - yellow

brand.color.ramp: (all have 21 shades from 100-1050)
  - dark-blue
  - green (NEW)
  - grey
  - neutral
  - orange
  - pink
  - purple
  - red
  - yellow
```

## 2. Surface Structure Simplification

### Before (Duplicated accents at each level)
```
surface:
  undercanvas:
    fill: {surface.fill.elevation-negative-1}
    accent-strong: {surface.accent.strong}
    accent-subtle: {surface.accent.subtle}
  canvas:
    fill: {surface.fill.elevation-0}
    accent-strong: {surface.accent.strong}
    accent-subtle: {surface.accent.subtle}
  level-1:
    fill: {surface.fill.elevation-1}
    accent-strong: {surface.accent.strong}
    accent-subtle: {surface.accent.subtle}
  ... (repeated for level-2, level-3, level-4)
  inverse:
    fill: {surface.fill.elevation-inverse}
```

### After (Centralized accent group)
```
surface:
  fill:
    elevation-negative-1: {color.brand.cream}
    elevation-0: {color.brand.neutral.Light}
    elevation-1 through elevation-4: {color.brand.neutral.Light}
    elevation-inverse: {color.brand.neutral.Dark}
  
  accent: (shared by all levels)
    strong: {color.brand.pink}
    subtle: {color.ramp.pink.100}
  
  undercanvas:
    fill: {surface.fill.elevation-negative-1}
  canvas:
    fill: {surface.fill.elevation-0}
  level-1:
    fill: {surface.fill.elevation-1}
  level-2:
    fill: {surface.fill.elevation-2}
  level-3:
    fill: {surface.fill.elevation-3}
  level-4:
    fill: {surface.fill.elevation-4}
  inverse:
    fill: {surface.fill.elevation-inverse}
```

**Benefits:**
- Reduced 14 duplicate accent tokens
- Cleaner hierarchy
- Easier maintenance
- Global accent updates affect all levels automatically

## 3. Feedback Messaging System (NEW)

### New Grouping: `semantic.feedback`
Created for banner/notification component styling.

#### Structure for Each Type
```
feedback.[type]:
  - fill:   background color
  - text:   text/headline color
  - border: border color
  - icon:   icon color
```

#### Color Mappings (Based on Banner SVG)

**Error (Red)**
```
feedback.error:
  fill:   {color.ramp.red.100}        → Light red background
  text:   {color.ramp.red.900}        → Dark red text (#800008)
  border: {color.ramp.red.900}        → Dark red border
  icon:   {color.ramp.red.900}        → Dark red icon
```

**Success (Green)**
```
feedback.success:
  fill:   {color.ramp.green.100}      → Light green background
  text:   {color.brand.green}         → Brand green text (#2B5926)
  border: {color.brand.green}         → Brand green border
  icon:   {color.brand.green}         → Brand green icon
```

**Warning (Orange)**
```
feedback.warning:
  fill:   {color.ramp.yellow.100}     → Light yellow background
  text:   {color.ramp.orange.900}     → Dark orange text (#4D3C00)
  border: {color.ramp.orange.900}     → Dark orange border
  icon:   {color.ramp.orange.900}     → Dark orange icon
```

**Info (Blue)**
```
feedback.info:
  fill:   {color.ramp.dark-blue.100}  → Light blue background
  text:   {color.ramp.dark-blue.900}  → Dark blue text (#0D3B73)
  border: {color.ramp.dark-blue.900}  → Dark blue border
  icon:   {color.ramp.dark-blue.900}  → Dark blue icon
```

### Designer Usage Example (Banner Component)
```
Banner Header:
  Background: {feedback.error.fill}
  Text: {feedback.error.text}
  Border: {feedback.error.border}
  Icon: {feedback.error.icon}
```

## Token Reference Format (Token Studio)

All references use **flattened format** (set name omitted):

### Within Same Set
```
{interactive.primary.fill.default}
{typography.scale.base}
```

### Cross-Set References
```
{color.brand.green}           ← references brand.color.brand.green
{color.ramp.red.900}          ← references brand.color.ramp.red.900
```

## Summary of Changes

### Commits
1. ✅ `feat(brand,semantic): add green color and feedback messaging system`
   - Removed cream ramp
   - Added green brand color and ramp
   - Created semantic.feedback grouping with 4 types × 4 properties = 16 new tokens

2. ✅ `refactor(semantic): simplify surface structure by removing duplicate accents`
   - Centralized accent tokens
   - Reduced token count by 14
   - Improved designer experience

### Token Count Changes
- Brand colors: 10 (added green, kept cream as brand color for legacy)
- Brand ramps: 9 (added green, removed cream ramp)
- Semantic feedback: 16 new tokens (4 types × 4 properties)
- Surface: 14 tokens removed (duplicate accents)
- **Net new tokens: +2**
