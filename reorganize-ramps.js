const fs = require('fs');

// Read the tokens file
const tokensPath = '/Users/ameygokarn/Documents/Indeemo Design System AI/Indeemo-Design-System-for-AI/tokens/tokens.json';
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

console.log('🔄 Starting ramp reorganization...\n');

// Step 1: Rename neutral.Light to white and neutral.Dark to black
console.log('Step 1: Renaming neutral colors...');
const neutralLight = tokens.brand.color.brand.neutral.Light;
const neutralDark = tokens.brand.color.brand.neutral.Dark;

tokens.brand.color.brand.white = neutralLight;
tokens.brand.color.brand.black = neutralDark;
delete tokens.brand.color.brand.neutral;

console.log('✓ neutral.Light → white');
console.log('✓ neutral.Dark → black\n');

// Step 2: Extract base colors and determine their ramp positions
const baseColors = {
  neutral: { value: tokens.brand.color.brand.white.value, hsl: 'hsl(0, 0%, 100%)' }, // white
  pink: tokens.brand.color.brand.pink,
  purple: tokens.brand.color.brand.purple,
  'dark-blue': tokens.brand.color.brand['dark-blue'],
  red: tokens.brand.color.brand.red,
  orange: tokens.brand.color.brand.orange,
  green: tokens.brand.color.brand.green
};

// Step 3: Get existing ramps
const oldRamps = tokens.brand.color.ramp;

// Step 4: Create new ramps in desired order with base colors
const newRamps = {};
const order = ['neutral', 'pink', 'purple', 'dark-blue', 'red', 'orange', 'green'];

console.log('Step 2: Reorganizing ramps and injecting base colors...\n');

order.forEach(colorName => {
  console.log(`Processing ${colorName} ramp...`);
  
  if (oldRamps[colorName]) {
    const oldRamp = oldRamps[colorName];
    const baseColor = baseColors[colorName];
    
    // Calculate lightness value from the base color to determine correct position
    let baseLightness = 50; // default
    
    // Extract lightness from HSL if available
    if (baseColor.value && baseColor.value.includes('hsl')) {
      const match = baseColor.value.match(/hsl\([^,]+,\s*[^,]+%,\s*(\d+)%/);
      if (match) {
        baseLightness = parseInt(match[1]);
      }
    }
    
    const newRamp = {};
    
    // Copy all existing shades
    Object.entries(oldRamp).forEach(([shade, token]) => {
      newRamp[shade] = token;
    });
    
    // Inject base color at appropriate shade based on lightness
    // The base color should be at a shade that matches its lightness
    // For example: white (100% lightness) → shade 100; black (0% lightness) → shade 1000+
    let baseShade = '500'; // default middle position
    
    if (baseLightness >= 98) baseShade = '100'; // very light
    else if (baseLightness >= 95) baseShade = '150';
    else if (baseLightness >= 90) baseShade = '200';
    else if (baseLightness >= 80) baseShade = '300';
    else if (baseLightness <= 2) baseShade = '1000'; // very dark
    else if (baseLightness <= 10) baseShade = '950';
    else if (baseLightness <= 20) baseShade = '900';
    else if (baseLightness <= 30) baseShade = '850';
    else if (baseLightness <= 40) baseShade = '800';
    else if (baseLightness <= 55) baseShade = '700';
    else if (baseLightness <= 70) baseShade = '600';
    else if (baseLightness <= 80) baseShade = '500';
    else if (baseLightness <= 90) baseShade = '300';
    
    // Only add base color if it doesn't exist or update description
    if (!newRamp[baseShade] || baseShade === '500') {
      newRamp[baseShade] = {
        value: baseColor.value,
        type: 'color',
        description: `Base ${colorName} color (${baseShade} shade). Direct reference to brand.${colorName}.`
      };
      console.log(`  └─ Added base color at shade ${baseShade}`);
    }
    
    newRamps[colorName] = newRamp;
  }
});

// Step 5: Remove grey ramp and yellow ramp (keep only the 7 specified)
console.log('\nStep 3: Removing grey and yellow ramps...');
if (oldRamps.grey) delete oldRamps.grey;
if (oldRamps.yellow) delete oldRamps.yellow;
console.log('✓ Removed grey ramp');
console.log('✓ Removed yellow ramp (not in final order)\n');

// Update tokens with new ramps
tokens.brand.color.ramp = newRamps;

// Step 6: Update brand colors - remove nested structure
console.log('Step 4: Flattening brand color structure...');
const flatBrand = {};
Object.entries(tokens.brand.color.brand).forEach(([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value) && value.value) {
    flatBrand[key] = value;
  } else if (typeof value === 'string') {
    flatBrand[key] = { value, type: 'color' };
  }
});
tokens.brand.color.brand = flatBrand;
console.log('✓ Flattened brand color structure\n');

// Write back
fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2));

console.log('✅ Ramp reorganization complete!');
console.log('\nSummary:');
console.log('- Renamed neutral.Light → white');
console.log('- Renamed neutral.Dark → black');
console.log('- New ramp order: neutral, pink, purple, dark-blue, red, orange, green');
console.log('- Removed grey and yellow ramps');
console.log('- Each ramp now has base color injected at appropriate shade');
console.log('- JSON file updated successfully');
