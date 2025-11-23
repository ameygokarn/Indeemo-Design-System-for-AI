#!/usr/bin/env bash
# Simple script to export a Figma frame as PNG and save to `assets/`.
# Usage:
# 1) Create a Personal Access Token in Figma: https://www.figma.com/developers/api#access-tokens
# 2) Set env vars and run:
#    export FIGMA_TOKEN="your_token_here"
#    export FILE_KEY="xKCxXToxIpf4ELOSMaUDYT"
#    ./scripts/export-figma-frame.sh 1:4 assets/cover-1-4.png

set -euo pipefail

if [ -z "${FIGMA_TOKEN:-}" ]; then
  echo "ERROR: FIGMA_TOKEN not set. Create a PAT and export as FIGMA_TOKEN."
  exit 1
fi

if [ -z "${FILE_KEY:-}" ]; then
  echo "ERROR: FILE_KEY not set. Set FILE_KEY to your Figma file key (e.g. xKCxXT... )."
  exit 1
fi

NODE_ID=${1:-}
OUT_PATH=${2:-}

if [ -z "$NODE_ID" ] || [ -z "$OUT_PATH" ]; then
  echo "Usage: FILE_KEY env set; ./scripts/export-figma-frame.sh <node-id> <out-path>"
  echo "Example: ./scripts/export-figma-frame.sh 1:4 assets/cover-1-4.png"
  exit 1
fi

mkdir -p "$(dirname "$OUT_PATH")"

echo "Requesting image URL from Figma for node $NODE_ID..."
RESP=$(curl -s -H "X-Figma-Token: $FIGMA_TOKEN" "https://api.figma.com/v1/images/${FILE_KEY}?ids=${NODE_ID}&format=png&scale=2")

IMG_URL=$(echo "$RESP" | python3 -c "import sys, json; obj=json.load(sys.stdin); imgs=obj.get('images',{}); print(imgs.get('$NODE_ID',''))")

if [ -z "$IMG_URL" ]; then
  echo "Failed to get image URL from Figma. Response was:" >&2
  echo "$RESP" >&2
  exit 1
fi

echo "Downloading image to $OUT_PATH..."
curl -s -L "$IMG_URL" -o "$OUT_PATH"

echo "Saved $OUT_PATH"
