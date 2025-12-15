const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));

console.log('Starting fixes...');

// 1. Fix grid tokens
console.log('\n1. Fixing grid tokens...');
if (tokens.brand && tokens.brand.grid) {
  const grid = tokens.brand.grid;
  const scales = ['large', 'xlarge', '2xlarge'];
  
  scales.forEach(scale => {
    if (grid.scale && grid.scale[scale]) {
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
      
      // Remove any extra properties
      const allowedKeys = ['margin', 'gutter', 'columns', 'viewport'];
      for (const key in scaleObj) {
        if (!allowedKeys.includes(key)) {
          delete scaleObj[key];
        }
      }
    }
  });
  
  // Remove any other scales
  for (const scale in grid.scale) {
    if (!['large', 'xlarge', '2xlarge'].includes(scale)) {
      delete grid.scale[scale];
    }
  }
}

// 2. Remove duplicate grid tokens at root level
console.log('\n2. Removing duplicate grid tokens at root level...');
if (tokens.grid) {
  delete tokens.grid;
}

// 3. Fix color ramp descriptions
console.log('\n3. Fixing color ramp descriptions...');
const ramps = tokens.brand.color.ramp;
for (const rampName in ramps) {
  const ramp = ramps[rampName];
  for (const shade in ramp) {
    const shadeObj = ramp[shade];
    // Remove placeholder and set a clean description
    // We'll set it to "Contrast: vs white, vs black" without placeholders
    // But for neutral 100 and 1050, we keep the existing one (which is already fixed)
    if (rampName === 'neutral') {
      if (shade === '100' || shade === '1050') {
        // Keep as is
        continue;
      }
    }
    // For all other shades, set a clean description
    shadeObj.description = "Contrast: vs white, vs black";
  }
}

// Write back to file
fs.writeFileSync('tokens/tokens.json', JSON.stringify(tokens, null, 2));

console.log('\n✅ Fixes completed:');
console.log('   - Grid tokens fixed and duplicates removed');
console.log('   - Color ramp descriptions cleaned (placeholders removed)');
console.log('\nNote: Ramp progression adjustment requires more details from the user.');
console.log('Please provide specific guidance on how to adjust the progression.');
