import express from 'express';

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

    console.log(`Creating collection: ${variables.collection}`);
    
    // Get existing collections first
    const existingResponse = await fetch(
      `${FIGMA_API_BASE}/files/${fileKey}/variables/local`,
      {
        headers: {
          'X-Figma-Token': token
        }
      }
    );

    let collectionId;
    
    if (existingResponse.ok) {
      const existing = await existingResponse.json();
      const existingCollection = existing.meta?.variableCollections?.[variables.collection];
      
      if (existingCollection) {
        collectionId = existingCollection.id;
        console.log(`Using existing collection: ${collectionId}`);
      }
    }

    // Create collection if it doesn't exist
    if (!collectionId) {
      const collectionResponse = await fetch(
        `${FIGMA_API_BASE}/files/${fileKey}/variables/collections`,
        {
          method: 'POST',
          headers: {
            'X-Figma-Token': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'CREATE',
            name: variables.collection,
            initialModeNames: variables.modes
          })
        }
      );

      if (!collectionResponse.ok) {
        const error = await collectionResponse.text();
        throw new Error(`Failed to create collection: ${error}`);
      }

      const collection = await collectionResponse.json();
      collectionId = collection.id;
      console.log(`Created new collection: ${collectionId}`);
    }

    // Get mode IDs from the collection
    const collectionDetailResponse = await fetch(
      `${FIGMA_API_BASE}/files/${fileKey}/variables/local`,
      {
        headers: {
          'X-Figma-Token': token
        }
      }
    );

    if (!collectionDetailResponse.ok) {
      throw new Error('Failed to fetch collection details');
    }

    const collectionDetail = await collectionDetailResponse.json();
    const collection = Object.values(collectionDetail.meta.variableCollections).find(
      c => c.id === collectionId
    );

    if (!collection) {
      throw new Error('Collection not found after creation');
    }

    const modeNameToId = {};
    collection.modes.forEach(mode => {
      modeNameToId[mode.name] = mode.modeId;
    });

    // Create variables
    const results = [];
    for (const variable of variables.variables) {
      console.log(`Creating variable: ${variable.name}`);
      
      const valuesByMode = {};
      for (const [modeName, value] of Object.entries(variable.values)) {
        const modeId = modeNameToId[modeName];
        if (modeId) {
          valuesByMode[modeId] = convertValue(value, variable.type);
        }
      }

      const variableResponse = await fetch(
        `${FIGMA_API_BASE}/files/${fileKey}/variables`,
        {
          method: 'POST',
          headers: {
            'X-Figma-Token': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'CREATE',
            name: variable.name,
            variableCollectionId: collectionId,
            resolvedType: variable.type,
            valuesByMode
          })
        }
      );

      if (!variableResponse.ok) {
        const error = await variableResponse.text();
        console.error(`Failed to create ${variable.name}: ${error}`);
        results.push({ name: variable.name, error });
      } else {
        const created = await variableResponse.json();
        console.log(`Created variable: ${variable.name} (${created.id})`);
        results.push({ name: variable.name, id: created.id, status: 'created' });
      }
    }

    res.json({ 
      success: true, 
      collection: collectionId,
      variables: results 
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

function convertValue(value, type) {
  // Convert hex color to Figma RGBA format
  if (type === 'COLOR' && typeof value === 'string' && value.startsWith('#')) {
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
  console.log(`Health check: http://localhost:${PORT}/health`);
});
