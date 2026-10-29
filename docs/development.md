# Processing tools

The finished wallpapers are available from the [download page](https://reffwu.github.io/proled-wallpaper/#download). Running code is only needed to apply the same corner treatment to another source image.

Requires Node.js 20+ and FFmpeg / ffprobe. There are no npm dependencies.

```bash
git clone https://github.com/ReffWu/proled-wallpaper.git
cd proled-wallpaper
npm test
node scripts/apply-corners.mjs input.png output-rounded.png
```

The tool preserves the input dimensions and writes a lossless RGB PNG. It does not overwrite an existing file. It applies the lower-corner treatment only; resize to your target display dimensions first if necessary.

- [Curve parameters](../config/corner-model.json)
- [Method and validation](method.md)
- [Download manifest and SHA-256](../downloads.json)
- [Release checksums](https://github.com/ReffWu/proled-wallpaper/releases/latest/download/SHA256SUMS.txt)

After downloading the five PNGs into one directory:

```bash
node scripts/verify-assets.mjs /path/to/downloaded-wallpapers
```
