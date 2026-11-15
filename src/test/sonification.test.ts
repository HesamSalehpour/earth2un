import { describe, expect, it } from 'vitest';
import { mapPixel } from '@/lib/sonification';

describe('image sonification', () => {
  it('maps more blue relative to red to a higher ocean pitch', () => {
    expect(mapPixel(0, 0, 255, 'ocean').frequency).toBeGreaterThan(mapPixel(0, 0, 0, 'ocean').frequency);
  });
  it('maps green relative to blue to higher land intensity', () => {
    expect(mapPixel(0, 255, 0, 'land').intensity).toBe(1);
    expect(mapPixel(0, 0, 255, 'land').intensity).toBe(0);
  });
  it('maps white to maximum ice brightness', () => {
    expect(mapPixel(255, 255, 255, 'ice').intensity).toBe(1);
  });
});