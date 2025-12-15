const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));

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

function updateNeutralRamp() {
  const neutralRamp = tokens.brand.color.ramp.neutral;
  
  // Step 100: pure white, no modifier
  neutralRamp['100'].value = '{color.brand.white}';
  delete neutralRamp['100'].$extensions;
  
  // Step 1050: pure black, no modifier
  neutralRamp['1050'].value = '{color.brand.black}';
  delete neutralRamp['1050'].$extensions;
  
  // Steps 150 to 1000: darken by (shade - 100) / 2
  const shades = ['150', '200', '250', '300', '350', '400', '450', '500', 
                  '550', '600', '650', '700', '750', '800', '850', '900', '950', '1000'];
  
  shades.forEach(shade => {
    const shadeNum = parseInt(shade);
    if (shadeNum < 550) {
      // For steps below 550, we are lightening? Actually, we are darkening from white.
      // But the user's example says 150 has modifier 50, 200 has modifier 100, etc.
      // We are going to use darken for all steps except 100 and 1050.
      // The modifier value is (shade - 100) / 2.
      const modifierValue = (shadeNum - 100) / 2;
      neutralRamp[shade].value = '{color.brand.white}';
      neutralRamp[shade].$extensions = {
        'studio.tokens': {
          modify: {
            type: 'darken',
            value: `{modifier.${modifierValue}}`,
            space: 'hsl'
          }
        }
      };
    } else if (shadeNum === 550) {
      // Base step: no modifier
      neutralRamp[shade].value = '{color.brand.white}';
      delete neutralRamp[shade].$extensions;
    } else {
      // For steps above 550, we are darkening by (shade - 100) / 2
      const modifierValue = (shadeNum - 100) / 2;
      neutralRamp[shade].value = '{color.brand.white}';
      neutralRamp[shade].$extensions = {
        'studio.tokens': {
          modify: {
            type: 'darken',
            value: `{modifier.${modifierValue}}`,
            space: 'hsl'
          }
        }
      };
    }
  });
}

function updateRampDescriptions() {
  const ramps = tokens.brand.color.ramp;
  
  for (const rampName in ramps) {
    const ramp = ramps[rampName];
    
    for (const shade in ramp) {
      const shadeObj = ramp[shade];
      // Set a placeholder description that the user can fill in with actual contrast ratios.
      // We don't have the actual colors, so we cannot calculate the contrast.
      shadeObj.description = "Contrast: [ratio] vs white, [ratio] vs black";
    }
  }
  
  // For neutral, set the known contrast ratios for white and black.
  ramps.neutral['100'].description = "Contrast: 1:1 vs white, 21:1 vs black";
  ramps.neutral['1050'].description = "Contrast: 21:1 vs white, 1:1 vs black";
}

// Apply updates
updateCreamRampColourspace();
updateNeutralRamp();
updateRampDescriptions();

// Write back to file
fs.writeFileSync('tokens/tokens.json', JSON.stringify(tokens, null, 2));
console.log('✓ Updated cream ramp colourspace to SRGB');
console.log('✓ Updated neutral ramp with half-step modifiers');
console.log('✓ Updated all ramp descriptions to contrast ratio template');
console.log('');
console.log('Note: Contrast ratios are placeholders. You must calculate actual contrast ratios and update the descriptions.');
console.log('For non-neutral ramps, ensure the first step (100) has lightness 92-95% and last step (1050) has lightness 10-13%.');
