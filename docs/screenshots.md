# Screenshots

Screenshots used on this site come from the `screenshot-baselines` orphan branch in the
[ar-workspace](https://github.com/AleksaRistic216/ar-workspace) source repo (not this repo).
That branch is maintained by the screenshot-test CI workflow and always reflects the current
baseline of what the app looks like on each platform.

## Config file

**`screenshots.config.json`** at the repo root is the single source of truth for which
screenshots are pulled and displayed. Both `scripts/update-screenshots.sh` and `Hero.tsx`
read from it — edit it to add or remove entries.

```jsonc
[
  {
    "branch": "linux/multiple_views.png",   // path on screenshot-baselines
    "dest":   "multiple_views.png",         // filename under public/screenshots/
    "alt":    "..."                         // <Image> alt text
  }
]
```

The array order determines the hero stack order: index 0 is the front image, index 1 is
the middle, index 2 is the back.

## Current entries

| `dest` | `branch` | Stack position |
|---|---|---|
| `multiple_views.png` | `linux/multiple_views.png` | front |
| `three_terminals.png` | `linux/three_terminals.png` | middle |
| `initial_state.png` | `linux/initial_state.png` | back |

## How to update

After editing `screenshots.config.json`, run the helper script to pull the files:

```bash
bash scripts/update-screenshots.sh
```

Then commit `screenshots.config.json` and any changed/added PNGs in `public/screenshots/`
and redeploy to Vercel.

## Branch layout on ar-workspace

```
screenshot-baselines (orphan)
└── linux/
│   ├── initial_state.png
│   ├── large_ui_scale.png
│   ├── multiple_views.png
│   ├── single_terminal.png
│   ├── small_ui_scale.png
│   ├── three_terminals.png
│   └── two_terminals.png
└── windows/
    └── (same set, added by CI)
```
