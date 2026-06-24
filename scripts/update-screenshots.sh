#!/usr/bin/env bash
# Pull latest screenshot baselines from ar-workspace into public/screenshots/.
# Which files to pull is controlled by screenshots.config.json at the repo root.
# See docs/screenshots.md for full documentation.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AR_WORKSPACE_DIR="${AR_WORKSPACE_DIR:-/home/parpil/source/ar-workspace}"
DEST="$ROOT/public/screenshots"
CONFIG="$ROOT/screenshots.config.json"

if [ ! -d "$AR_WORKSPACE_DIR/.git" ]; then
  echo "error: ar-workspace repo not found at $AR_WORKSPACE_DIR" >&2
  echo "       Set AR_WORKSPACE_DIR to override." >&2
  exit 1
fi

echo "Fetching origin/screenshot-baselines..."
git -C "$AR_WORKSPACE_DIR" fetch origin screenshot-baselines

mkdir -p "$DEST"

copy_baseline() {
  local src="$1"   # path on the branch, e.g. linux/initial_state.png
  local dst="$2"   # destination filename under public/screenshots/
  echo "  $src -> public/screenshots/$dst"
  git -C "$AR_WORKSPACE_DIR" show "origin/screenshot-baselines:$src" > "$DEST/$dst"
}

# Read entries from screenshots.config.json
node -e "
  const cfg = JSON.parse(require('fs').readFileSync('$CONFIG', 'utf8'));
  cfg.forEach(s => process.stdout.write(s.branch + '\t' + s.dest + '\n'));
" | while IFS=$'\t' read -r src dest; do
  copy_baseline "$src" "$dest"
done

echo "Done. Commit public/screenshots/ and redeploy to Vercel."
