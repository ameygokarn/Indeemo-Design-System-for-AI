#!/usr/bin/env node
import fs from 'fs';

const tokens = JSON.parse(fs.readFileSync('./tokens/tokens.json', 'utf8'));

// Helper to replace all instances in an object
function replaceReferencesInObject(obj, oldRef, newRef) {
  const str = JSON.stringify(obj);
  const newStr = str.replace(new RegExp(`"${oldRef}\\.`, 'g'), `"${newRef}.`);
  return JSON.parse(newStr);
}

// 1. Move shadows into styles and remove color from link typography
const newTokens = {
  styles: {
    typography: {},
    shadow: tokens.typography.shadow || {}
  },
  color: tokens.color,
  semantic: {},
  surface: {}
};

// Copy typography but remove color property from link tokens
for (const [key, value] of Object.entries(tokens.typography)) {
  if (key === 'shadow') {
    continue; // Already moved
  }
  if (key === 'link') {
    // Remove color from link typography
    newTokens.styles.typography[key] = {};
    for (const [linkKey, linkValue] of Object.entries(value)) {
      if (linkValue.value && linkValue.value.color) {
        const {color, ...rest} = linkValue.value;
        newTokens.styles.typography[key][linkKey] = {
          ...linkValue,
          value: rest,
          description: linkValue.description.replace(/Purple.*/, '16px Regular text with underline. Color applied via semantic token.')
        };
      } else {
        newTokens.styles.typography[key][linkKey] = linkValue;
      }
    }
  } else {
    newTokens.styles.typography[key] = value;
  }
}

// 2. Move link colors to semantic
if (!newTokens.semantic.typography) {
  newTokens.semantic.typography = {};
}
if (!newTokens.semantic.typography.link) {
  newTokens.semantic.typography.link = {};
}

newTokens.semantic.typography.link = {
  default: {
    value: "{color.ramp.purple.850}",
    type: "color",
    description: "Link default color. Purple for primary links."
  },
  hover: {
    value: "{color.ramp.purple.750}",
    type: "color",
    description: "Link hover color. Slightly darker purple for interactive hover state."
  },
  visited: {
    value: "{color.ramp.purple.700}",
    type: "color",
    description: "Link visited color. Different purple to denote visited state."
  }
};

// 3. Update surface fills: undercanvas from cream, others from white
const surfaceFills = {
  "elevation-negative-1": {
    value: "{color.ramp.cream.200}",
    type: "color",
    description: "Undercanvas surface fill. Cream from ramp for background content behind sticky elements. Figma type: COLOR. CSS: --surface-fill-elevation-negative-1. Z-index: -1.",
    extensions: {
      figma: {
        resolvedType: "COLOR",
        cssVariable: "--surface-fill-elevation-negative-1",
        usage: "Undercanvas fill—hidden background content"
      }
    }
  },
  "elevation-0": {
    value: "#FFFFFF",
    type: "color",
    description: "Canvas/base surface fill. Default white background. Figma type: COLOR. CSS: --surface-fill-elevation-0. Z-index: 0.",
    extensions: {
      figma: {
        resolvedType: "COLOR",
        cssVariable: "--surface-fill-elevation-0",
        usage: "Canvas fill—default page/base background"
      }
    }
  },
  "elevation-1": {
    value: "#FFFFFF",
    type: "color",
    description: "Level 1 surface fill. White for cards and floating sections. Figma type: COLOR. CSS: --surface-fill-elevation-1. Z-index: 1–100.",
    extensions: {
      figma: {
        resolvedType: "COLOR",
        cssVariable: "--surface-fill-elevation-1",
        usage: "Level 1 fill—cards, floating sections"
      }
    }
  },
  "elevation-2": {
    value: "#FFFFFF",
    type: "color",
    description: "Level 2 surface fill. White for popovers and overlays. Figma type: COLOR. CSS: --surface-fill-elevation-2. Z-index: 100–500.",
    extensions: {
      figma: {
        resolvedType: "COLOR",
        cssVariable: "--surface-fill-elevation-2",
        usage: "Level 2 fill—popovers, dropdowns, tooltips"
      }
    }
  },
  "elevation-3": {
    value: "#FFFFFF",
    type: "color",
    description: "Level 3 surface fill. White for sticky headers and persistent elements. Figma type: COLOR. CSS: --surface-fill-elevation-3. Z-index: 500–1000.",
    extensions: {
      figma: {
        resolvedType: "COLOR",
        cssVariable: "--surface-fill-elevation-3",
        usage: "Level 3 fill—sticky headers, persistent elements"
      }
    }
  },
  "elevation-4": {
    value: "#FFFFFF",
    type: "color",
    description: "Level 4 surface fill. White for modals and dialogs. Figma type: COLOR. CSS: --surface-fill-elevation-4. Z-index: 1000+.",
    extensions: {
      figma: {
        resolvedType: "COLOR",
        cssVariable: "--surface-fill-elevation-4",
        usage: "Level 4 fill—modals, dialogs, alerts"
      }
    }
  },
  "elevation-inverse": {
    value: "#1A1A1A",
    type: "color",
    description: "Inverse surface fill. Dark background for dark mode and inverse contexts. Figma type: COLOR. CSS: --surface-fill-elevation-inverse. Z-index: 2000+.",
    extensions: {
      figma: {
        resolvedType: "COLOR",
        cssVariable: "--surface-fill-elevation-inverse",
        usage: "Inverse fill—dark mode surfaces"
      }
    }
  }
};

// Move surface fills to semantic
if (!newTokens.semantic.surface) {
  newTokens.semantic.surface = {};
}
newTokens.semantic.surface.fill = surfaceFills;

// Also copy the surface-accent to semantic
if (tokens.typography['surface-accent']) {
  newTokens.semantic.surface.accent = tokens.typography['surface-accent'];
}

// 4. Move surface structure but update references
if (tokens.surface) {
  newTokens.surface = replaceReferencesInObject(tokens.surface, 'foundation', 'semantic.surface');
}

// 5. Copy semantic tokens
if (tokens.semantic) {
  newTokens.semantic = { ...newTokens.semantic, ...tokens.semantic };
}

// Write the new file
fs.writeFileSync('./tokens/tokens.json', JSON.stringify(newTokens, null, 2) + '\n');
console.log('Tokens migrated successfully!');
