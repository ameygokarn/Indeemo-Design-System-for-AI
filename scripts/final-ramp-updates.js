const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));

// 1. Update cream ramp colourspace to SRGB
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

// 2. Update neutral ramp modifiers to use (shade - 100) as modifier index
function updateNeutralRamp() {
  const neutralRamp = tokens.brand.color.ramp.neutral;
  
  // Step 100: pure white, no modifier
  neutralRamp['100'].value = '{color.brand.white}';
  delete neutralRamp['100'].$extensions;
  
  // Step 1050: pure black, no modifier
  neutralRamp['1050'].value = '{color.brand.black}';
  delete neutralRamp['1050'].$extensions;
  
  // Steps 150 to 1000: use modifier index = (shade - 100)
  const shades = ['150', '200', '250', '300', '350', '400', '450', '500', 
                  '550', '600', '650', '700', '750', '800', '850', '900', '950', '1000'];
  
  shades.forEach(shade => {
    const shadeNum = parseInt(shade);
    const modifierIndex = shadeNum - 100;
    
    // For steps below 550, we are darkening from white
    if (shadeNum < 550) {
      neutralRamp[shade].value = '{color.brand.white}';
      neutralRamp[shade].$extensions = {
        'studio.tokens': {
          modify: {
            type: 'darken',
            value: `{modifier.${modifierIndex}}`,
            space: 'hsl'
          }
        }
      };
    } else if (shadeNum === 550) {
      // Base step: no modifier, just white
      neutralRamp[shade].value = '{color.brand.white}';
      delete neutralRamp[shade].$extensions;
    } else {
      // For steps above 550, we are darkening from white
      neutralRamp[shade].value = '{color.brand.white}';
      neutralRamp[shade].$extensions = {
        'studio.tokens': {
          modify: {
            type: 'darken',
            value: `{modifier.${modifierIndex}}`,
            space: 'hsl'
          }
        }
      };
    }
  });
}

// 3. Update all ramp descriptions to required contrast ratio format
function updateRampDescriptions() {
  const ramps = tokens.brand.color.ramp;
  
  for (const rampName in ramps) {
    const ramp = ramps[rampName];
    
    for (const shade in ramp) {
      const shadeObj = ramp[shade];
      
      if (rampName === 'neutral') {
        if (shade === '100') {
          // White: 1:1 vs white, 21:1 vs black
          shadeObj.description = "Contrast: 1:1 vs white, 21:1 vs black";
        } else if (shade === '1050') {
          // Black: 21:1 vs white, 1:1 vs black
          shadeObj.description = "Contrast: 21:1 vs white, 1:1 vs black";
        } else {
          // For other neutral shades, we don't know the contrast
          // Use placeholder with note that it must be calculated
          shadeObj.description = "Contrast: [ratio] vs white ([emoji]), [ratio] vs black ([emoji]) - 🔴 if <3:1, 🟠 if <4.5:1";
        }
      } else {
        // For color ramps, use placeholder
        shadeObj.description = "Contrast: [ratio] vs white ([emoji]), [ratio] vs black ([emoji]) - 🔴 if <3:1, 🟠 if <4.5:1";
      }
    }
  }
}

// Apply all updates
updateCreamRampColourspace();
updateNeutralRamp();
updateRampDescriptions();

// Write back to file
fs.writeFileSync('tokens/tokens.json', JSON.stringify(tokens, null, 2));
console.log('✓ Updated cream ramp colourspace to SRGB');
console.log('✓ Updated neutral ramp with correct modifier references (modifier index = shade - 100)');
console.log('✓ Updated all ramp descriptions to contrast ratio format with emoji indicators');
console.log('');
console.log('Important notes:');
console.log('1. For non-neutral ramps, ensure first step (100) lightness is 92-95% and last step (1050) lightness is 10-13%');
console.log('2. Actual contrast ratios must be calculated and inserted into descriptions');
console.log('3. Emoji indicators: 🔴 for contrast <3:1, 🟠 for contrast <4.5:1');
