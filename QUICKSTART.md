# Quick Start: Figma Variables via API

## 🚀 Ready to use!

Your Figma Variables Bridge is set up and ready. Here's how to use it:

---

## 1️⃣ Start the Bridge

```bash
npm start
```

Expected output:
```
Figma Variables Bridge listening on http://localhost:3055
Health check: http://localhost:3055/health
```

Keep this terminal running.

---

## 2️⃣ Set Your Figma Credentials

In a new terminal:

```bash
export FIGMA_TOKEN="your_figma_personal_access_token"
export FIGMA_FILE_KEY="xKCxXToxIpf4ELOSMaUDYT"
```

**Get your token:** https://www.figma.com/settings → Personal access tokens

---

## 3️⃣ Ask Me to Sync Variables

Now you can simply ask:

> **"Read `tokens/colors.json` and sync it to Figma"**

Or:

> **"Sync all token files to Figma file xKCxXToxIpf4ELOSMaUDYT"**

I'll:
1. Read the JSON file(s)
2. Call the bridge API
3. Create/update variables in Figma
4. Report the results

---

## 📁 Available Token Files

- `tokens/colors.json` - Brand colors (light/dark modes)
- `tokens/spacing.json` - Spacing scale (4px to 48px)
- `tokens/typography.json` - Font sizes and families

---

## ✍️ Creating New Token Files

Create a new JSON file in `tokens/`:

```json
{
  "collection": "Collection Name",
  "modes": ["Mode1", "Mode2"],
  "variables": [
    {
      "name": "Variable/Name",
      "type": "COLOR|FLOAT|STRING|BOOLEAN",
      "values": {
        "Mode1": "#FF0000",
        "Mode2": "#00FF00"
      }
    }
  ]
}
```

Then ask me to sync it!

---

## 🧪 Manual Test (without assistant)

Test the API directly using curl:

```bash
curl -X POST http://localhost:3055/sync-variables \
  -H "Content-Type: application/json" \
  -d '{
    "fileKey": "xKCxXToxIpf4ELOSMaUDYT",
    "token": "'"$FIGMA_TOKEN"'",
    "variables": {
      "collection": "Test Collection",
      "modes": ["Base"],
      "variables": [
        {
          "name": "Test/Color",
          "type": "COLOR",
          "values": {
            "Base": "#FF0000"
          }
        }
      ]
    }
  }'
```

Expected response:
```json
{
  "success": true,
  "collection": "VariableCollectionId:123:456",
  "variables": [
    {
      "name": "Test/Color",
      "id": "VariableID:789:012",
      "status": "created"
    }
  ]
}
```

---

## 📖 Full Documentation

See `docs/figma-api-workflow.md` for:
- Complete API reference
- Variable types and formats
- Troubleshooting guide
- Advanced workflows (aliases, bulk sync, CI/CD)

---

## 🎯 Example Workflows

### Sync one file
> "Sync `tokens/colors.json` to Figma"

### Sync all tokens
> "Read all files in `tokens/` and sync them to Figma"

### Create new tokens
> "Create a new token file `tokens/borders.json` with border radius values: sm=4, md=8, lg=16, xl=24"

### Update existing tokens
> "Update Primary/Default color in `tokens/colors.json` to #0055EE for Light mode"

---

## ✅ Verify in Figma

1. Open Figma Desktop
2. Open your Token Library file
3. Right panel → **Local variables**
4. You should see your collections and variables!

---

## 🛠️ Troubleshooting

**Bridge not starting?**
- Check port 3055 is free: `lsof -i :3055`
- Kill conflicting process: `kill -9 <PID>`

**"Invalid token" error?**
- Verify `FIGMA_TOKEN` is set: `echo $FIGMA_TOKEN`
- Generate new token if expired

**Variables not appearing?**
- Check bridge terminal for errors
- Verify you have edit access to the file
- Try the manual curl test above

---

Ready to sync? Just ask! 🚀
