import test from 'node:test';
import assert from 'node:assert/strict';
import { applyRoundCorners, cornerOffset } from '../src/round-corners.mjs';

const width = 320, height = 216;
const makeImage = () => Buffer.alloc(width * height * 3, 255);

test('left and right corners use identical mirrored coverage', () => {
  const result = applyRoundCorners(makeImage(), width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width / 2; x++) {
      const a = (y * width + x) * 3;
      const b = (y * width + width - 1 - x) * 3;
      assert.deepEqual(result.subarray(a, a + 3), result.subarray(b, b + 3));
    }
  }
});

test('bottom exteriors are pure black and edge coverage is antialiased', () => {
  const result = applyRoundCorners(makeImage(), width, height);
  const last = (height - 1) * width * 3;
  assert.deepEqual([...result.subarray(last, last + 3)], [0, 0, 0]);
  assert.deepEqual([...result.subarray(-3)], [0, 0, 0]);
  assert(result.some(value => value > 0 && value < 255));
});

test('upper image and center pixels are preserved; source is never mutated', () => {
  const source = makeImage();
  for (let i = 0; i < source.length; i++) source[i] = i % 256;
  const snapshot = Buffer.from(source);
  const result = applyRoundCorners(source, width, height);
  assert.deepEqual(source, snapshot);
  assert.deepEqual(result.subarray(0, 200 * width * 3), source.subarray(0, 200 * width * 3));
  for (let y = 0; y < height; y++) {
    const begin = (y * width + 16) * 3;
    const end = (y * width + width - 16) * 3;
    assert.deepEqual(result.subarray(begin, end), source.subarray(begin, end));
  }
});

test('analytic contour is monotonic and convex without an endpoint kink', () => {
  const values = [];
  for (let i = 0; i <= 1000; i++) values.push(cornerOffset(80 - i * 0.08, 80, 80));
  for (let i = 1; i < values.length; i++) assert(values[i] >= values[i - 1]);
  for (let i = 1; i < values.length - 1; i++) {
    assert(values[i + 1] - 2 * values[i] + values[i - 1] >= -1e-9);
  }
  assert.equal(cornerOffset(80, 80, 80), 0);
  assert.equal(cornerOffset(0, 80, 80), 80);
});
