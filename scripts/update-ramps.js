const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));

// Helper function to calculate approximate contrast ratio
// This is a simplified version - in reality would need proper color conversion
function getContrastDescription(colorName, shade) {
  // For placeholder - in real implementation would need to calculate actual contrast
  return "Contrast: 🔴 vs white, 🔴 vs black";
}

// Update cream ramp colourspace from HSL to SRGB
function updateCreamRampColourspace() {
  const creamRamp = tokens.brand.color.ramp.cream;
  for (const shade in creamRamp) {
    const shadeObj = creamRamp[shade];
    if (shadeObj.$extensions && shadeObj.$extensions['studio.tokens']) {
      if (shadeObj.$extensions['studio.tokens'].modify) {
        shadeObj.$extensions['studio.tokens'].modify.space = 'srgb';
      }
    }
  }
}

// Update all ramp descriptions to only show contrast ratios
function updateRampDescriptions() {
  const ramps = tokens.brand.color.ramp;
  
  for (const rampName in ramps) {
    const ramp = ramps[rampName];
    
    for (const shade in ramp) {
      const shadeObj = ramp[shade];
      
      // Remove existing description and add minimal contrast info
      // For now using placeholder - would need actual color calculation
      if (rampName === 'neutral') {
        if (shade === '100') {
          shadeObj.description = "Contrast: 1:1 vs white, 21:1 vs black";
        } else if (shade === '1050') {
          shadeObj.description = "Contrast: 21:1 vs white, 1:1 vs black";
        } else {
          // For middle shades of neutral, use placeholder
          shadeObj.description = "Contrast: 🔴 vs white, 🔴 vs black";
        }
      } else {
        // For color ramps
        shadeObj.description = "Contrast: 🔴 vs white, 🔴 vs black";
      }
    }
  }
}

// Update neutral ramp to use proper half-step progression
function updateNeutralRamp() {
  const neutralRamp = tokens.brand.color.ramp.neutral;
  
  // The neutral ramp should have:
  // 100: pure white (color.brand.white) 
  // 1050: pure black (color.brand.black)
  // In-between: progressive darkening with half-step modifiers
  
  // Current structure looks correct, just ensure first and last steps are right
  neutralRamp['100'].value = '{color.brand.white}';
  neutralRamp['1050'].value = '{color.brand.black}';
  
  // Update descriptions for neutral ramp
  neutralRamp['100'].description = "Contrast: 1:1 vs white, 21:1 vs black";
  neutralRamp['1050'].description = "Contrast: 21:1 vs white, 1:1 vs black";
}

// Apply all updates
updateCreamRampColourspace();
updateRampDescriptions();
updateNeutralRamp();

// Write back to file
fs.writeFileSync('tokens/tokens.json', JSON.stringify(tokens, null, 2));
console.log('✓ Updated cream ramp colourspace from HSL to SRGB');
console.log('✓ Updated all ramp descriptions to show only contrast ratios');
console.log('✓ Updated neutral ramp first/last steps to pure white/black');
console.log('✓ Note: Contrast ratios are placeholders - would need actual color calculation');
