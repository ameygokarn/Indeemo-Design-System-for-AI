const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));

// Ramps to adjust: pink, purple, dark-blue, red, orange, yellow, green
// Neutral and cream are left as is.
const rampsToAdjust = ['pink', 'purple', 'dark-blue', 'red', 'orange', 'yellow', 'green'];

function adjustRamp(rampName) {
  const ramp = tokens.brand.color.ramp[rampName];
  if (!ramp) return;

  // We want step 100 to be 95% lightness -> use lighten modifier 950 (0.95)
  // Then step 150: lighten by 900 (0.9)
  // step 200: lighten by 850 (0.85)
  // step 250: lighten by 800 (0.8)
  // step 300: lighten by 750 (0.75)
  // step 350: lighten by 700 (0.7)
  // step 400: lighten by 650 (0.65)
  // step 450: lighten by 600 (0.6)
  // step 500: lighten by 550 (0.55)
  // step 550: base (no modifier)
  // step 600: darken by 50 (0.05)
  // step 650: darken by 100 (0.1)
  // step 700: darken by 150 (0.15)
  // step 750: darken by 200 (0.2)
  // step 800: darken by 250 (0.25)
  // step 850: darken by 300 (0.3)
  // step 900: darken by 350 (0.35)
  // step 950: darken by 400 (0.4)
  // step 1000: darken by 450 (0.45)
  // step 1050: darken by 500 (0.5)

  // Define the new modifier values for each shade
  const newModifiers = {
    '100': { type: 'lighten', value: '{modifier.950}' },
    '150': { type: 'lighten', value: '{modifier.900}' },
    '200': { type: 'lighten', value: '{modifier.850}' },
    '250': { type: 'lighten', value: '{modifier.800}' },
    '300': { type: 'lighten', value: '{modifier.750}' },
    '350': { type: 'lighten', value: '{modifier.700}' },
    '400': { type: 'lighten', value: '{modifier.650}' },
    '450': { type: 'lighten', value: '{modifier.600}' },
    '500': { type: 'lighten', value: '{modifier.550}' },
    '550': null, // base, no modifier
    '600': { type: 'darken', value: '{modifier.50}' },
    '650': { type: 'darken', value: '{modifier.100}' },
    '700': { type: 'darken', value: '{modifier.150}' },
    '750': { type: 'darken', value: '{modifier.200}' },
    '800': { type: 'darken', value: '{modifier.250}' },
    '850': { type: 'darken', value: '{modifier.300}' },
    '900': { type: 'darken', value: '{modifier.350}' },
    '950': { type: 'darken', value: '{modifier.400}' },
    '1000': { type: 'darken', value: '{modifier.450}' },
    '1050': { type: 'darken', value: '{modifier.500}' }
  };

  // Apply to each shade
  for (const shade in newModifiers) {
    if (!ramp[shade]) continue;
    const modifier = newModifiers[shade];
    if (modifier === null) {
      // Remove modifier extensions for base step (550)
      delete ramp[shade].$extensions;
    } else {
      // Set the modifier
      ramp[shade].$extensions = {
        'studio.tokens': {
          modify: {
            type: modifier.type,
            value: modifier.value,
            space: 'hsl'
          }
        }
      };
    }
  }
}

// Adjust each ramp
rampsToAdjust.forEach(rampName => {
  adjustRamp(rampName);
});

// Write back to file
fs.writeFileSync('tokens/tokens.json', JSON.stringify(tokens, null, 2));

console.log('Adjusted ramps for:', rampsToAdjust.join(', '));
console.log('Step 100 now uses lighten modifier 950 (95%) for each ramp.');
console.log('Step 550 is base (no modifier).');
console.log('Step 1050 uses darken modifier 500 (50%).');
