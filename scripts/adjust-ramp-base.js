const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));

// Ramps to adjust: pink, purple, dark-blue, red, orange, yellow, green
const rampsToAdjust = ['pink', 'purple', 'dark-blue', 'red', 'orange', 'yellow', 'green'];

function adjustRampBase(rampName) {
  const ramp = tokens.brand.color.ramp[rampName];
  if (!ramp) return;

  // Step 500 becomes base (no modifier)
  // Remove modifier from step 500
  if (ramp['500'] && ramp['500'].$extensions) {
    delete ramp['500'].$extensions;
  }

  // Steps 100 to 450: keep lighten modifiers (they are already set)
  // Steps 550 to 1050: adjust darken modifiers
  const darkenModifiers = {
    '550': { type: 'darken', value: '{modifier.50}' },
    '600': { type: 'darken', value: '{modifier.100}' },
    '650': { type: 'darken', value: '{modifier.150}' },
    '700': { type: 'darken', value: '{modifier.200}' },
    '750': { type: 'darken', value: '{modifier.250}' },
    '800': { type: 'darken', value: '{modifier.300}' },
    '850': { type: 'darken', value: '{modifier.350}' },
    '900': { type: 'darken', value: '{modifier.400}' },
    '950': { type: 'darken', value: '{modifier.450}' },
    '1000': { type: 'darken', value: '{modifier.500}' },
    '1050': { type: 'darken', value: '{modifier.500}' } // same as 1000
  };

  for (const shade in darkenModifiers) {
    if (!ramp[shade]) continue;
    const modifier = darkenModifiers[shade];
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

// Adjust each ramp
rampsToAdjust.forEach(rampName => {
  adjustRampBase(rampName);
});

// Write back to file
fs.writeFileSync('tokens/tokens.json', JSON.stringify(tokens, null, 2));

console.log('Adjusted base to step 500 for ramps:', rampsToAdjust.join(', '));
console.log('Step 500 is now base (no modifier).');
console.log('Steps 550-1050 now use darken modifiers (5% to 50%).');
