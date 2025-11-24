import fs from 'fs';

// Read the old tokens for brand colors and ramps
const oldTokens = JSON.parse(fs.readFileSync('/tmp/tokens-old.json', 'utf-8'));
const currentTokens = JSON.parse(fs.readFileSync('./tokens/tokens.json', 'utf-8'));

// Extract brand colors and ramps from old tokens
const brandColors = oldTokens.foundation.color.brand;
const brandRamps = oldTokens.foundation.color.ramp;

// Create new structure
const newTokens = {
  "styles": currentTokens.styles,
  "brand": {
    "color": {
      "brand": brandColors,
      "ramp": brandRamps
    }
  },
  "semantic": currentTokens.semantic,
  "surface": currentTokens.surface
};

// Now update all references in semantic from {color.brand.*} and {color.ramp.*} to {brand.color.brand.*} and {brand.color.ramp.*}
function updateReferences(obj) {
  if (typeof obj === 'string') {
    // Replace {color.brand.X} with {brand.color.brand.X}
    obj = obj.replace(/{color\.brand\./g, '{brand.color.brand.');
    // Replace {color.ramp.X with {brand.color.ramp.X}
    obj = obj.replace(/{color\.ramp\./g, '{brand.color.ramp.');
    return obj;
  }
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map(updateReferences);
    } else {
      const updated = {};
      for (const [key, value] of Object.entries(obj)) {
        updated[key] = updateReferences(value);
      }
      return updated;
    }
  }
  return obj;
}

// Update references in semantic
newTokens.semantic = updateReferences(newTokens.semantic);

// Update references in surface
newTokens.surface = updateReferences(newTokens.surface);

// Write the new tokens
fs.writeFileSync('./tokens/tokens.json', JSON.stringify(newTokens, null, 2));
console.log('✓ Token migration complete');
console.log('✓ Created brand set with colors and ramps');
console.log('✓ Updated all semantic references to use brand set');
