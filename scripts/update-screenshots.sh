#!/usr/bin/env bash
# Pull latest screenshot baselines from ar-workspace into public/screenshots/.
# See docs/screenshots.md for full documentation.
set -euo pipefail

AR_WORKSPACE_DIR="${AR_WORKSPACE_DIR:-/home/parpil/source/ar-workspace}"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/screenshots"

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

copy_baseline "linux/initial_state.png"   "initial_state.png"
copy_baseline "linux/three_terminals.png" "three_terminals.png"
copy_baseline "linux/multiple_views.png"  "multiple_views.png"

echo "Done. Commit public/screenshots/ and redeploy to Vercel."
