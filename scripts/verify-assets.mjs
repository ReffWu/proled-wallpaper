#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(readFileSync(new URL('../downloads.json', import.meta.url), 'utf8'));
const directory = resolve(process.argv[2] ?? 'dist/v2.0.0');
for (const asset of manifest.assets) {
  const data = readFileSync(resolve(directory, asset.file));
  const digest = createHash('sha256').update(data).digest('hex');
  if (digest !== asset.sha256) throw new Error(`SHA-256 mismatch: ${asset.file}`);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!data.subarray(0, 8).equals(signature)) throw new Error(`Not a PNG: ${asset.file}`);
  if (data.readUInt32BE(16) !== asset.width || data.readUInt32BE(20) !== asset.height) {
    throw new Error(`Dimensions differ: ${asset.file}`);
  }
  console.log(`Verified ${asset.width} × ${asset.height}: ${asset.file}`);
}
