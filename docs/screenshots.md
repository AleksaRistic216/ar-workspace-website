# Screenshots

Screenshots used on this site come from the `screenshot-baselines` orphan branch in the
[ar-workspace](https://github.com/AleksaRistic216/ar-workspace) source repo (not this repo).
That branch is maintained by the screenshot-test CI workflow and always reflects the current
baseline of what the app looks like on each platform.

## Current screenshots

| File in `public/screenshots/` | Source path on `screenshot-baselines` | Used in |
|---|---|---|
| `initial_state.png` | `linux/initial_state.png` | `Hero.tsx` |

## How to update

Run the following from the root of **this** repo. It pulls the latest baseline(s) from the
ar-workspace repo without checking out that branch into your working tree.

```bash
# Pull one file
git -C /home/parpil/source/ar-workspace fetch origin screenshot-baselines
git -C /home/parpil/source/ar-workspace show origin/screenshot-baselines:linux/initial_state.png \
  > public/screenshots/initial_state.png
```

Or use the helper script:

```bash
bash scripts/update-screenshots.sh
```

After copying, commit the updated PNG(s) to this repo and redeploy to Vercel.

## Adding a new screenshot

1. Add the test case to the ar-workspace screenshot-test suite so CI captures a baseline.
2. Once CI commits the baseline to `screenshot-baselines`, copy it here:
   ```bash
   git -C /home/parpil/source/ar-workspace show origin/screenshot-baselines:<os>/<name>.png \
     > public/screenshots/<name>.png
   ```
3. Reference it in the relevant component via `<Image src="/screenshots/<name>.png" ... />`.
4. Add a row to the table above.

## Branch layout on ar-workspace

```
screenshot-baselines (orphan)
└── linux/
    └── initial_state.png   ← Linux CI baseline (Mesa/llvmpipe)
```

Windows baselines live under `windows/` once they are committed by CI.
