#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { applyRoundCorners } from '../src/round-corners.mjs';

const args = process.argv.slice(2);
if (args.length !== 2 || args.includes('--help')) {
  console.log('Usage: node scripts/apply-corners.mjs input.png output.png');
  console.log('Requires Node.js 20+ and FFmpeg/ffprobe. Preserves dimensions; never overwrites a file.');
  process.exit(args.includes('--help') ? 0 : 1);
}
const [input, output] = args.map(value => resolve(value));
if (!existsSync(input)) throw new Error('Input file does not exist');
if (existsSync(output)) throw new Error('Output already exists; choose a new filename');

function run(command, argv, inputBuffer) {
  const result = spawnSync(command, argv, { input: inputBuffer, maxBuffer: 256 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr.toString().trim());
  return result.stdout;
}
const metadata = JSON.parse(run('ffprobe', [
  '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'json', input,
]).toString());
const { width, height } = metadata.streams[0];
const rgb = run('ffmpeg', [
  '-hide_banner', '-loglevel', 'error', '-i', input, '-map', '0:v:0', '-frames:v', '1',
  '-pix_fmt', 'rgb24', '-f', 'rawvideo', 'pipe:1',
]);
const result = applyRoundCorners(rgb, width, height);
run('ffmpeg', [
  '-hide_banner', '-loglevel', 'error', '-n', '-f', 'rawvideo', '-pixel_format', 'rgb24',
  '-video_size', `${width}x${height}`, '-i', 'pipe:0', '-frames:v', '1',
  '-pix_fmt', 'rgb24', '-compression_level', '9', '-pred', 'mixed', output,
], result);
console.log(`Saved ${width} × ${height}: ${output}`);
