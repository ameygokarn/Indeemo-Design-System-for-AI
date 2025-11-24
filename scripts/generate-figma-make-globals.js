#!/usr/bin/env node
/**
 * Generate figma-make-globals.css from tokens.json
 * This script creates a CSS file with all tokens as CSS variables
 * Ready to be copied into Figma Make's global styles
 * 
 * Usage: node scripts/generate-figma-make-globals.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKENS_PATH = path.join(__dirname, '../tokens/tokens.json');
const OUTPUT_PATH = path.join(__dirname, '../figma-make-globals.css');

try {
  const tokensData = fs.readFileSync(TOKENS_PATH, 'utf8');
  const tokens = JSON.parse(tokensData);

  console.log('🔄 Generating figma-make-globals.css...\n');

  // Generate CSS variables for all tokens
  let css = '/* ============================================\n';
  css += ' * Figma Make Global CSS Variables\n';
  css += ' * Auto-generated from tokens.json\n';
  css += ' * Last updated: ' + new Date().toISOString() + '\n';
  css += ' * ============================================ */\n\n';

  css += ':root {\n';

  // Helper to process nested objects and extract tokens
  const processTokens = (obj, prefix = '') => {
    const vars = [];

    const traverse = (current, pathParts = []) => {
      if (current === null || typeof current !== 'object' || Array.isArray(current)) return;

      for (let key in current) {
        const fullPath = pathParts.length > 0 ? `${pathParts.join('-')}-${key}` : key;

        if (typeof current[key] === 'object' && current[key].value !== undefined) {
          // It's a token with a value
          const varName = `--${prefix}${fullPath}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
          vars.push({
            name: varName,
            value: current[key].value,
            category: prefix
          });
        } else if (typeof current[key] === 'object' && current[key].value === undefined) {
          // It's a nested object, traverse deeper
          traverse(current[key], [...pathParts, key]);
        }
      }
    };

    traverse(obj);
    return vars;
  };

  // Process brand colors (direct colors)
  const brandVars = processTokens(tokens.brand.color.brand, 'color-');

  // Process ramps with special formatting
  const rampVars = [];
  for (let rampName in tokens.brand.color.ramp) {
    const ramp = tokens.brand.color.ramp[rampName];
    for (let shade in ramp) {
      if (ramp[shade] && ramp[shade].value) {
        rampVars.push({
          name: `--color-ramp-${rampName}-${shade}`.toLowerCase(),
          value: ramp[shade].value,
          category: 'ramp'
        });
      }
    }
  }

  // Helper function to resolve token references recursively
  const resolveTokenValue = (value, depth = 0, visitedRefs = new Set()) => {
    if (depth > 10) return value; // Prevent infinite loops
    
    // Check if value is a token reference like {color.brand.pink} or {elevation.level-0}
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      const refPath = value.slice(1, -1);
      
      // Check for circular references
      if (visitedRefs.has(refPath)) {
        return value;
      }
      visitedRefs.add(refPath);
      
      const parts = refPath.split('.');
      
      // Try to resolve using brand.color path
      if (parts[0] === 'color') {
        let resolved = tokens.brand.color;
        for (let i = 1; i < parts.length; i++) {
          if (resolved && typeof resolved === 'object') {
            resolved = resolved[parts[i]];
          } else {
            break;
          }
        }
        if (resolved && typeof resolved === 'object' && resolved.value) {
          return resolveTokenValue(resolved.value, depth + 1, visitedRefs);
        }
        if (typeof resolved === 'string' && resolved.startsWith('#')) {
          return resolved;
        }
      }
      
      // Try to resolve using styles path (for elevation, etc.)
      if (parts[0] === 'elevation' || parts[0] === 'feedback' || parts[0] === 'interactive') {
        let resolved = tokens.styles;
        for (let part of parts) {
          if (resolved && typeof resolved === 'object') {
            resolved = resolved[part];
          } else {
            break;
          }
        }
        if (resolved && typeof resolved === 'object' && resolved.value) {
          return resolveTokenValue(resolved.value, depth + 1, visitedRefs);
        }
        if (typeof resolved === 'string' && (resolved.startsWith('#') || resolved.startsWith('hsl'))) {
          return resolved;
        }
      }
      
      // Try to resolve using semantic path (for icon and surface references)
      if (parts[0] === 'interactive' || parts[0] === 'feedback' || parts[0] === 'elevation') {
        let resolved = tokens.semantic;
        for (let part of parts) {
          if (resolved && typeof resolved === 'object') {
            resolved = resolved[part];
          } else {
            break;
          }
        }
        if (resolved && typeof resolved === 'object' && resolved.value) {
          return resolveTokenValue(resolved.value, depth + 1, visitedRefs);
        }
      }
      
      return value; // Reference not found, return as-is
    }
    
    return value;
  };

  // Process semantic tokens
  const semanticVars = [];
  const processSemantic = (obj, categoryPath = []) => {
    const vars = [];

    const traverse = (current, pathParts = []) => {
      if (current === null || typeof current !== 'object' || Array.isArray(current)) return;

      for (let key in current) {
        const fullPath = pathParts.length > 0 ? `${pathParts.join('-')}-${key}` : key;

        if (typeof current[key] === 'object' && current[key].value !== undefined) {
          // It's a token with a value - resolve references
          const varName = `--semantic-${[...categoryPath, fullPath].join('-')}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
          const resolvedValue = resolveTokenValue(current[key].value);
          vars.push({
            name: varName,
            value: resolvedValue,
            category: 'semantic'
          });
        } else if (typeof current[key] === 'object' && current[key].value === undefined) {
          // It's a nested object, traverse deeper
          traverse(current[key], [...pathParts, key]);
        }
      }
    };

    traverse(obj, []);
    return vars;
  };

  for (let category in tokens.semantic) {
    const categoryVars = processSemantic(tokens.semantic[category], [category]);
    semanticVars.push(...categoryVars);
  }

  // Combine all variables
  const allVars = [...brandVars, ...rampVars, ...semanticVars];

  // Group by category for readability
  const groupedVars = {
    'Brand Colors': brandVars.sort((a, b) => a.name.localeCompare(b.name)),
    'Color Ramps': rampVars.sort((a, b) => a.name.localeCompare(b.name)),
    'Semantic Tokens': semanticVars.sort((a, b) => a.name.localeCompare(b.name))
  };

  // Write grouped output
  for (let [groupName, vars] of Object.entries(groupedVars)) {
    if (vars.length > 0) {
      css += `  /* ${groupName} */\n`;
      vars.forEach(v => {
        css += `  ${v.name}: ${v.value};\n`;
      });
      css += '\n';
    }
  }

  css += '}\n';

  // Write file
  fs.writeFileSync(OUTPUT_PATH, css);

  console.log('✅ Generated figma-make-globals.css');
  console.log(`📊 Total variables: ${allVars.length}`);
  console.log(`  • Brand colors: ${brandVars.length}`);
  console.log(`  • Ramp shades: ${rampVars.length}`);
  console.log(`  • Semantic tokens: ${semanticVars.length}`);
  console.log(`\n📄 Output: ${OUTPUT_PATH}`);
  console.log('\n💡 Copy the entire :root { ... } block into Figma Make\'s global styles');

} catch (error) {
  console.error('❌ Error generating CSS:', error.message);
  process.exit(1);
}
