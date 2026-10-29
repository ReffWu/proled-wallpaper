# Processing tools

The finished wallpapers are available from the [download page](https://reffwu.github.io/proled-wallpaper/#download). Running code is only needed to apply the same corner treatment to another source image.

Requires Node.js 20+ and FFmpeg / ffprobe. There are no npm dependencies.

```bash
git clone https://github.com/ReffWu/proled-wallpaper.git
cd proled-wallpaper
npm test
node scripts/apply-corners.mjs input.png output-rounded.png
# Apply the same curve to all four corners:
node scripts/apply-corners.mjs input.png output-four-corners.png --all
```

The tool preserves the input dimensions and writes a lossless RGB PNG. It does not overwrite an existing file. By default it treats the lower corners; `--all` also treats the upper corners. Resize to your target display dimensions first if necessary.

- [Curve parameters](../config/corner-model.json)
- [Method and validation](method.md)
- [Download manifest and SHA-256](../downloads.json)
- [Release checksums](https://github.com/ReffWu/proled-wallpaper/releases/latest/download/SHA256SUMS.txt)

After downloading the five PNGs into one directory:

```bash
node scripts/verify-assets.mjs /path/to/downloaded-wallpapers
```
