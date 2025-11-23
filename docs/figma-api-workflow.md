# Figma REST API Workflow: JSON Variables to Figma

This guide explains how to define Figma variables as JSON and export them to Figma using the REST API via an MCP bridge.

## Overview

**Goal:** Write design tokens (colors, spacing, typography, etc.) as JSON in this repository, then use an assistant command to sync them to Figma as Variables.

**Flow:**
```
JSON file (local) → Assistant request → MCP Bridge → Figma REST API → Variables in Figma file
```

---

## Prerequisites

1. **Figma Personal Access Token (PAT)**
   - Go to: https://www.figma.com/settings → **Personal access tokens**
   - Click **Generate new token**
   - Copy the token and save it securely (you'll only see it once)
   - Store it as an environment variable:
     ```bash
     export FIGMA_TOKEN="figd_your_token_here"
     ```

2. **Figma File Key**
   - Open your Figma file in browser
   - URL format: `https://www.figma.com/design/FILE_KEY/...`
   - Example: `xKCxXToxIpf4ELOSMaUDYT` from the Token Library
   - Store it:
     ```bash
     export FIGMA_FILE_KEY="xKCxXToxIpf4ELOSMaUDYT"
     ```

3. **Node.js installed** (v18+)
   ```bash
   node --version
   ```

---

## Step 1: Define Variables as JSON

Create a JSON file defining your design tokens. Variables in Figma are organized in **Collections** and have **modes** (e.g., light/dark themes).

### Example: `tokens/colors.json`

```json
{
  "collection": "Brand Colors",
  "modes": ["Light", "Dark"],
  "variables": [
    {
      "name": "Primary/Default",
      "type": "COLOR",
      "values": {
        "Light": "#0066FF",
        "Dark": "#3399FF"
      }
    },
    {
      "name": "Primary/Hover",
      "type": "COLOR",
      "values": {
        "Light": "#0052CC",
        "Dark": "#2A8AE6"
      }
    },
    {
      "name": "Background/Primary",
      "type": "COLOR",
      "values": {
        "Light": "#FFFFFF",
        "Dark": "#1A1A1A"
      }
    }
  ]
}
```

### Supported Variable Types

- `COLOR` - hex colors (e.g., `#FF0000`)
- `FLOAT` - numbers (e.g., spacing, opacity: `16`, `0.8`)
- `STRING` - text values (e.g., font names: `"Inter"`)
- `BOOLEAN` - true/false

### Example: `tokens/spacing.json`

```json
{
  "collection": "Spacing",
  "modes": ["Base"],
  "variables": [
    {
      "name": "Space/XS",
      "type": "FLOAT",
      "values": {
        "Base": 4
      }
    },
    {
      "name": "Space/SM",
      "type": "FLOAT",
      "values": {
        "Base": 8
      }
    },
    {
      "name": "Space/MD",
      "type": "FLOAT",
      "values": {
        "Base": 16
      }
    },
    {
      "name": "Space/LG",
      "type": "FLOAT",
      "values": {
        "Base": 24
      }
    }
  ]
}
```

---

## Step 2: Set Up MCP Bridge

The MCP bridge acts as a server that receives requests from the assistant and calls the Figma REST API.

### Install dependencies

```bash
npm init -y
npm install express @modelcontextprotocol/sdk
```

### Create `src/figma_variables_bridge.js`

This bridge exposes an MCP endpoint that:
1. Accepts JSON variable definitions
2. Creates/updates variable collections in Figma
3. Creates/updates variables with values per mode

```javascript
import express from 'express';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const FIGMA_API_BASE = 'https://api.figma.com/v1';

const app = express();
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'figma-variables-bridge' });
});

// MCP endpoint: sync variables from JSON to Figma
app.post('/sync-variables', async (req, res) => {
  try {
    const { fileKey, token, variables } = req.body;
    
    if (!fileKey || !token || !variables) {
      return res.status(400).json({ 
        error: 'Missing required fields: fileKey, token, variables' 
      });
    }

    // Create or get variable collection
    const collectionResponse = await fetch(
      `${FIGMA_API_BASE}/files/${fileKey}/variables/collections`,
      {
        method: 'POST',
        headers: {
          'X-Figma-Token': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: variables.collection,
          modes: variables.modes.map(name => ({ name }))
        })
      }
    );

    if (!collectionResponse.ok) {
      const error = await collectionResponse.text();
      throw new Error(`Failed to create collection: ${error}`);
    }

    const collection = await collectionResponse.json();
    const collectionId = collection.id;

    // Create variables
    const results = [];
    for (const variable of variables.variables) {
      const variableResponse = await fetch(
        `${FIGMA_API_BASE}/files/${fileKey}/variables`,
        {
          method: 'POST',
          headers: {
            'X-Figma-Token': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: variable.name,
            variableCollectionId: collectionId,
            resolvedType: variable.type,
            valuesByMode: convertValuesToModeIds(variable.values, collection.modes)
          })
        }
      );

      if (!variableResponse.ok) {
        const error = await variableResponse.text();
        results.push({ name: variable.name, error });
      } else {
        const created = await variableResponse.json();
        results.push({ name: variable.name, id: created.id, status: 'created' });
      }
    }

    res.json({ 
      success: true, 
      collection: collectionId,
      variables: results 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function convertValuesToModeIds(valuesByModeName, modes) {
  const result = {};
  for (const [modeName, value] of Object.entries(valuesByModeName)) {
    const mode = modes.find(m => m.name === modeName);
    if (mode) {
      result[mode.modeId] = convertValue(value);
    }
  }
  return result;
}

function convertValue(value) {
  // Convert hex color to Figma RGBA format
  if (typeof value === 'string' && value.startsWith('#')) {
    const hex = value.slice(1);
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    return { r, g, b, a: 1 };
  }
  return value;
}

const PORT = process.env.PORT || 3055;
app.listen(PORT, () => {
  console.log(`Figma Variables Bridge listening on http://localhost:${PORT}`);
});
```

---

## Step 3: Run the Bridge

```bash
node src/figma_variables_bridge.js
```

Expected output:
```
Figma Variables Bridge listening on http://localhost:3055
```

---

## Step 4: Ask the Assistant to Sync Variables

Now you can ask the assistant to read your JSON file and sync it to Figma.

### Example request:

> "Read `tokens/colors.json` and sync those variables to Figma file `xKCxXToxIpf4ELOSMaUDYT` using my FIGMA_TOKEN."

### What the assistant will do:

1. Read the JSON file
2. Call the MCP bridge at `http://localhost:3055/sync-variables`
3. Pass the file key, token, and variable definitions
4. Return the results (created variable IDs and any errors)

---

## Step 5: Verify in Figma

1. Open Figma Desktop
2. Go to the Token Library file
3. Open **Local variables** panel (right sidebar)
4. You should see the new collection and variables

---

## API Reference

### Figma REST API Endpoints

**Get file variables:**
```bash
GET https://api.figma.com/v1/files/{file_key}/variables/local
```

**Create variable collection:**
```bash
POST https://api.figma.com/v1/files/{file_key}/variables/collections
{
  "name": "Collection Name",
  "modes": [{ "name": "Light" }, { "name": "Dark" }]
}
```

**Create variable:**
```bash
POST https://api.figma.com/v1/files/{file_key}/variables
{
  "name": "Color/Primary",
  "variableCollectionId": "VariableCollectionId:123:456",
  "resolvedType": "COLOR",
  "valuesByMode": {
    "mode_id_1": { "r": 0, "g": 0.4, "b": 1, "a": 1 },
    "mode_id_2": { "r": 0.2, "g": 0.6, "b": 1, "a": 1 }
  }
}
```

**Update variable:**
```bash
PATCH https://api.figma.com/v1/files/{file_key}/variables/{variable_id}
{
  "name": "New Name",
  "valuesByMode": { ... }
}
```

---

## Workflow Summary

1. **Define tokens** → Create `tokens/*.json` files with your design variables
2. **Run bridge** → Start the MCP server: `node src/figma_variables_bridge.js`
3. **Ask assistant** → "Sync `tokens/colors.json` to Figma"
4. **Verify** → Open Figma and check Local variables panel

---

## Troubleshooting

### "Invalid token"
- Check that `FIGMA_TOKEN` is set correctly
- Generate a new token if expired

### "File not found"
- Verify `FIGMA_FILE_KEY` is correct
- Ensure you have edit access to the file

### "Collection already exists"
- Modify the bridge to check for existing collections first
- Or use PATCH to update instead of POST to create

### Bridge not responding
- Check that port 3055 is not in use: `lsof -i :3055`
- Look for error messages in the terminal running the bridge

---

## Next Steps

1. **Bulk import**: Create a script to sync all JSON files in `tokens/` directory
2. **Variable aliases**: Support referencing other variables (e.g., `Button/Primary` → `Color/Primary`)
3. **Export from Figma**: Add reverse sync to export Figma variables back to JSON
4. **CI/CD**: Automate token sync on git push using GitHub Actions

---

## Resources

- Figma REST API docs: https://www.figma.com/developers/api
- Figma Variables API: https://www.figma.com/developers/api#variables
- MCP documentation: https://modelcontextprotocol.io/
