import fs from 'fs';

const tokens = JSON.parse(fs.readFileSync('./tokens/tokens.json', 'utf-8'));

// Move surface into semantic
tokens.semantic.surface = tokens.surface;

// Remove the surface set
delete tokens.surface;

// Reorder so it's styles, brand, semantic (which now includes surface)
const ordered = {
  'styles': tokens.styles,
  'brand': tokens.brand,
  'semantic': tokens.semantic
};

fs.writeFileSync('./tokens/tokens.json', JSON.stringify(ordered, null, 2));
console.log('✓ Moved surface tokens into semantic set');
console.log('✓ Removed standalone surface set');
console.log('✓ Final structure: styles, brand, semantic (containing surface, typography, interactive)');
