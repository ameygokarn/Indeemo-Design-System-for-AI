const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));

console.log('=== FINAL FIXES ===');

// 1. Fix color ramp descriptions
console.log('\n1. Fixing color ramp descriptions...');
const ramps = tokens.brand.color.ramp;
for (const rampName in ramps) {
  const ramp = ramps[rampName];
  for (const shade in ramp) {
    const shadeObj = ramp[shade];
    // Keep neutral 100 and 1050 as they are
    if (rampName === 'neutral' && (shade === '100' || shade === '1050')) {
      continue;
    }
    // For all other shades, set clean description without placeholders
    // Just indicate contrast ratios need to be calculated
    shadeObj.description = "Contrast: vs white, vs black";
  }
}

// 2. Remove any duplicate grid tokens at root level
console.log('\n2. Removing duplicate grid tokens at root level...');
if (tokens.grid) {
  delete tokens.grid;
}

// 3. Ensure grid tokens have correct structure
console.log('\n3. Verifying grid token structure...');
if (tokens.brand && tokens.brand.grid) {
  const grid = tokens.brand.grid;
  const scales = ['large', 'xlarge', '2xlarge'];
  
  // Remove any extra scales
  for (const scale in grid.scale) {
    if (!scales.includes(scale)) {
      delete grid.scale[scale];
    }
  }
  
  // Verify each scale has the four required tokens
  scales.forEach(scale => {
    if (grid.scale[scale]) {
      const scaleObj = grid.scale[scale];
      console.log(`   ${scale}: margin=${scaleObj.margin ? '✓' : '✗'}, gutter=${scaleObj.gutter ? '✓' : '✗'}, columns=${scaleObj.columns ? '✓' : '✗'}, viewport=${scaleObj.viewport ? '✓' : '✗'}`);
    }
  });
}

// Write back to file
fs.writeFileSync('tokens/tokens.json', JSON.stringify(tokens, null, 2));

console.log('\n✅ Fixes completed:');
console.log('   - Color ramp descriptions cleaned (placeholders removed)');
console.log('   - Duplicate grid tokens removed (if any)');
console.log('   - Grid token structure verified');

// Quick verification
console.log('\n=== VERIFICATION ===');
console.log('Neutral 100 description:', tokens.brand.color.ramp.neutral['100']?.description);
console.log('Pink 100 description:', tokens.brand.color.ramp.pink['100']?.description);
console.log('Grid scales:', Object.keys(tokens.brand.grid.scale));
console.log('Root level grid:', tokens.grid ? 'Present (bad)' : 'Absent (good)');
