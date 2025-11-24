import fs from 'fs';

const tokenFile = './tokens/tokens.json';
const tokens = JSON.parse(fs.readFileSync(tokenFile, 'utf-8'));

// Map hex values to token references
const hexMapping = {
  '#fffdf2': '{color.brand.cream}', // Cream - elevation-negative-1
  '#FFFFFF': '{color.brand.neutral.Light}', // White
  '#1A1A1A': '{color.brand.neutral.Dark}', // Dark
  '#F5E8EC': '{color.ramp.pink.100}' // Light pink for subtle accent
};

function replaceHexInValue(value) {
  if (typeof value !== 'string') return value;
  
  for (const [hex, token] of Object.entries(hexMapping)) {
    if (value === hex) {
      return token;
    }
  }
  return value;
}

function processObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => processObject(item));
  }
  
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  const processed = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key === 'value' && typeof val === 'string') {
      processed[key] = replaceHexInValue(val);
    } else {
      processed[key] = processObject(val);
    }
  }
  
  return processed;
}

// Process semantic set
if (tokens.semantic) {
  tokens.semantic = processObject(tokens.semantic);
  console.log('✓ Processed semantic set');
}

// Write back
fs.writeFileSync(tokenFile, JSON.stringify(tokens, null, 2) + '\n');
console.log('✓ Updated tokens.json with token references instead of hex values');

// Verify
const updated = JSON.parse(fs.readFileSync(tokenFile, 'utf-8'));
console.log('\nVerification:');
console.log('surface.fill.elevation-negative-1:', updated.semantic.surface.fill['elevation-negative-1'].value);
console.log('surface.fill.elevation-0:', updated.semantic.surface.fill['elevation-0'].value);
console.log('surface.fill.elevation-inverse:', updated.semantic.surface.fill['elevation-inverse'].value);
console.log('surface.accent.subtle:', updated.semantic.surface.accent.subtle.value);
