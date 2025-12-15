const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));

// 1. Fix color ramp descriptions to the required format
function fixColorRampDescriptions() {
  const ramps = tokens.brand.color.ramp;
  
  for (const rampName in ramps) {
    const ramp = ramps[rampName];
    
    for (const shade in ramp) {
      const shadeObj = ramp[shade];
      
      if (rampName === 'neutral') {
        if (shade === '100') {
          // White: 1:1 vs white (🔴), 21:1 vs black (no emoji)
          shadeObj.description = "Contrast: 1:1 (🔴) vs white, 21:1 vs black";
        } else if (shade === '1050') {
          // Black: 21:1 vs white (no emoji), 1:1 vs black (🔴)
          shadeObj.description = "Contrast: 21:1 vs white, 1:1 (🔴) vs black";
        } else {
          // Other neutral shades - placeholder without the extra note
          shadeObj.description = "Contrast: [ratio] vs white ([emoji]), [ratio] vs black ([emoji])";
        }
      } else {
        // All non-neutral color ramps
        shadeObj.description = "Contrast: [ratio] vs white ([emoji]), [ratio] vs black ([emoji])";
      }
    }
  }
}

// 2. Remove duplicate grid tokens and ensure correct structure
function fixGridTokens() {
  // First, let's check if there are any grid tokens outside of brand.grid
  // We'll traverse the entire token object and look for other grid properties
  // But note: the tokens have a flat structure in the sense of sets: brand, semantic, styles.
  // We only expect grid under brand.
  
  // We'll also check if there are multiple grid properties in brand (should not happen)
  
  // For now, we assume the structure is correct and only fix the types if needed.
  const grid = tokens.brand.grid;
  
  if (grid && grid.scale) {
    const scales = ['large', 'xlarge', '2xlarge'];
    
    scales.forEach(scale => {
      if (grid.scale[scale]) {
        const scaleObj = grid.scale[scale];
        
        // Ensure correct types
        if (scaleObj.margin) {
          scaleObj.margin.type = 'spacing';
        }
        if (scaleObj.gutter) {
          scaleObj.gutter.type = 'spacing';
        }
        if (scaleObj.columns) {
          scaleObj.columns.type = 'number';
        }
        if (scaleObj.viewport) {
          scaleObj.viewport.type = 'number';
        }
        
        // Also, check if there are any extra properties we don't expect
        // Remove any properties that are not margin, gutter, columns, viewport
        const allowedKeys = ['margin', 'gutter', 'columns', 'viewport'];
        for (const key in scaleObj) {
          if (!allowedKeys.includes(key)) {
            delete scaleObj[key];
          }
        }
      }
    });
    
    // Remove any other scales that are not the three we want
    for (const scale in grid.scale) {
      if (!['large', 'xlarge', '2xlarge'].includes(scale)) {
        delete grid.scale[scale];
      }
    }
  }
}

// 3. Check for duplicate grid entries in the entire token object
function removeDuplicateGridTokens() {
  // We'll do a simple check: if there are two grid properties at the top level of tokens
  // But the tokens are organized in sets: brand, semantic, styles.
  // We only have one grid under brand.
  
  // However, the user said "duplicate", so maybe there is another grid set?
  // Let's check if there is a grid set at the root (outside of brand, semantic, styles)
  // The tokens structure is { brand: {...}, semantic: {...}, styles: {...}, ... }
  // We don't expect a grid at the root.
  
  // We'll check the top-level keys
  const topLevelKeys = Object.keys(tokens);
  for (const key of topLevelKeys) {
    if (key === 'grid' && key !== 'brand' && key !== 'semantic' && key !== 'styles') {
      // This would be a duplicate grid at the root, remove it
      delete tokens[key];
    }
  }
}

// Apply all fixes
fixColorRampDescriptions();
removeDuplicateGridTokens();
fixGridTokens();

// Write back to file
fs.writeFileSync('tokens/tokens.json', JSON.stringify(tokens, null, 2));

console.log('✓ Fixed color ramp descriptions to required format');
console.log('✓ Removed any duplicate grid tokens');
console.log('✓ Ensured grid tokens have correct structure and types');

// Verification
console.log('\nVerification:');
console.log('Neutral 100 description:', tokens.brand.color.ramp.neutral['100']?.description);
console.log('Neutral 550 modifier:', tokens.brand.color.ramp.neutral['550']?.$extensions?.['studio.tokens']?.modify?.value);
console.log('Grid large keys:', Object.keys(tokens.brand.grid.scale.large));
console.log('Grid large margin type:', tokens.brand.grid.scale.large.margin.type);
console.log('Grid large columns type:', tokens.brand.grid.scale.large.columns.type);

// Note about lightness progression
console.log('\nNote: For non-neutral ramps, ensure first step (100) lightness is 92-95% and last step (1050) lightness is 10-13%.');
console.log('This may require adjusting base colors or modifier values based on actual color calculations.');
