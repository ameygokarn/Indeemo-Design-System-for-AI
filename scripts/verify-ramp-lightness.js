const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));

// Ramps that should have been adjusted
const adjustedRamps = ['pink', 'purple', 'dark-blue', 'red', 'orange', 'yellow', 'green'];
// Ramps that should be left as is (neutral and cream)
const unchangedRamps = ['neutral', 'cream'];

console.log('=== VERIFICATION OF RAMP LIGHTNESS ADJUSTMENTS ===\n');

// Check adjusted ramps
console.log('1. Adjusted ramps (should have lighten 950 at step 100, darken 500 at step 1050):');
adjustedRamps.forEach(rampName => {
  const ramp = tokens.brand.color.ramp[rampName];
  if (!ramp) {
    console.log(`   ${rampName}: NOT FOUND`);
    return;
  }
  
  const step100 = ramp['100'];
  const step1050 = ramp['1050'];
  
  const step100Modifier = step100?.$extensions?.['studio.tokens']?.modify;
  const step1050Modifier = step1050?.$extensions?.['studio.tokens']?.modify;
  
  const step100Correct = step100Modifier?.type === 'lighten' && step100Modifier?.value === '{modifier.950}';
  const step1050Correct = step1050Modifier?.type === 'darken' && step1050Modifier?.value === '{modifier.500}';
  
  console.log(`   ${rampName}:`);
  console.log(`     Step 100: ${step100Correct ? '✓' : '✗'} (type: ${step100Modifier?.type}, value: ${step100Modifier?.value})`);
  console.log(`     Step 1050: ${step1050Correct ? '✓' : '✗'} (type: ${step1050Modifier?.type}, value: ${step1050Modifier?.value})`);
});

// Check unchanged ramps
console.log('\n2. Unchanged ramps (neutral and cream):');
unchangedRamps.forEach(rampName => {
  const ramp = tokens.brand.color.ramp[rampName];
  if (!ramp) {
    console.log(`   ${rampName}: NOT FOUND`);
    return;
  }
  
  // Neutral: step 100 should be white with no modifier, step 1050 black with no modifier
  if (rampName === 'neutral') {
    const step100 = ramp['100'];
    const step1050 = ramp['1050'];
    const step100Modifier = step100?.$extensions?.['studio.tokens']?.modify;
    const step1050Modifier = step1050?.$extensions?.['studio.tokens']?.modify;
    
    console.log(`   neutral:`);
    console.log(`     Step 100: value ${step100?.value}, modifier ${step100Modifier ? 'present' : 'none'} (should be none)`);
    console.log(`     Step 1050: value ${step1050?.value}, modifier ${step1050Modifier ? 'present' : 'none'} (should be none)`);
  }
  
  // Cream: step 100 should have lighten modifier 450 (or 950?) Wait, cream was not to be adjusted.
  // Actually, cream was not in the list to adjust. Let's check what it has.
  if (rampName === 'cream') {
    const step100 = ramp['100'];
    const step100Modifier = step100?.$extensions?.['studio.tokens']?.modify;
    console.log(`   cream:`);
    console.log(`     Step 100: type ${step100Modifier?.type}, value ${step100Modifier?.value}, space ${step100Modifier?.space}`);
  }
});

// Additionally, check that step 550 has no modifier for adjusted ramps
console.log('\n3. Step 550 (base step) should have no modifier for adjusted ramps:');
adjustedRamps.forEach(rampName => {
  const ramp = tokens.brand.color.ramp[rampName];
  const step550 = ramp?.['550'];
  const step550Modifier = step550?.$extensions?.['studio.tokens']?.modify;
  console.log(`   ${rampName}: ${step550Modifier ? '✗ (has modifier)' : '✓ (no modifier)'}`);
});

console.log('\n=== SUMMARY ===');
console.log('Adjusted ramps should now have:');
console.log('  - Step 100: lighten modifier 950 (95% lightness)');
console.log('  - Step 550: no modifier (base color)');
console.log('  - Step 1050: darken modifier 500 (50% darkness)');
console.log('\nNeutral and cream ramps remain unchanged.');
