import json

with open('./tokens/tokens.json', 'r') as f:
    tokens = json.load(f)

# Get the current surface structure
surface = tokens['semantic']['surface']

# Extract the primitives (fill, accent, inverse)
primitives = {
    'fill': surface['fill'],
    'accent': surface['accent'],
    'inverse': surface['inverse']
}

# Extract levels (undercanvas, canvas, level-1 through level-4)
levels = {
    'undercanvas': surface['undercanvas'],
    'canvas': surface['canvas'],
    'level-1': surface['level-1'],
    'level-2': surface['level-2'],
    'level-3': surface['level-3'],
    'level-4': surface['level-4']
}

# Restructure: keep only fill in each level, remove the duplicated accents
restructured_surface = {}

# Add primitives first
restructured_surface['fill'] = primitives['fill']
restructured_surface['accent'] = primitives['accent']

# Add levels with only their fill
for level_name, level_data in levels.items():
    restructured_surface[level_name] = {
        'fill': level_data['fill']
    }

# Add inverse
restructured_surface['inverse'] = primitives['inverse']

# Update the tokens
tokens['semantic']['surface'] = restructured_surface

# Write back
with open('./tokens/tokens.json', 'w') as f:
    json.dump(tokens, f, indent=2)
    f.write('\n')

print("✓ Restructured surface tokens")
print("\nNew structure:")
for key in restructured_surface.keys():
    if key in ['fill', 'accent', 'inverse']:
        print(f"  {key}: (primitives)")
    else:
        sub_keys = list(restructured_surface[key].keys())
        print(f"  {key}: {sub_keys}")

# Count reduction
old_count = sum(
    len(v) if isinstance(v, dict) and 'value' not in v else 1
    for v in surface.values()
)
new_count = sum(
    len(v) if isinstance(v, dict) and 'value' not in v else 1
    for v in restructured_surface.values()
)

print(f"\nToken count reduction: {old_count} → {new_count} groupings")
