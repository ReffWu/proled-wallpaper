import { readFileSync } from 'node:fs';

const model = JSON.parse(readFileSync(new URL('../config/corner-model.json', import.meta.url), 'utf8'));

export function cornerOffset(depth, radiusX, radiusY) {
  if (depth >= radiusY) return 0;
  if (depth <= 0) return radiusX;
  const u = 1 - depth / radiusY;
  return radiusX * (1 - Math.pow(Math.max(0, 1 - Math.pow(u, model.exponent)), 1 / model.exponent));
}

export function applyRoundCorners(rgb, width, height) {
  if (rgb.length !== width * height * 3) throw new RangeError('Expected packed RGB pixels');
  const out = Buffer.from(rgb);
  const radiusX = model.reference.radius_x * width / model.reference.width;
  const radiusY = model.reference.radius_y * height / model.reference.height;
  const samples = model.antialias_samples;
  for (let y = Math.max(0, Math.floor(height - radiusY)); y < height; y++) {
    const bounds = [];
    for (let k = 0; k < samples; k++) {
      bounds.push(cornerOffset(height - y - (k + 0.5) / samples, radiusX, radiusY));
    }
    const end = Math.min(width, Math.ceil(Math.max(...bounds)));
    for (let x = 0; x < end; x++) {
      let coverage = 0;
      for (const bound of bounds) coverage += Math.max(0, Math.min(1, x + 1 - bound));
      coverage /= samples;
      if (coverage === 1) continue;
      // Identical coverage on mirrored pixels keeps both corner shapes equal.
      for (const mirroredX of [x, width - 1 - x]) {
        const index = (y * width + mirroredX) * 3;
        for (let c = 0; c < 3; c++) out[index + c] = Math.round(rgb[index + c] * coverage);
      }
    }
  }
  return out;
}
