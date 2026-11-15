export type SoundMode = 'ocean' | 'land' | 'ice';

export function mapPixel(red: number, green: number, blue: number, mode: SoundMode) {
  const brightness = (red + green + blue) / 765;
  const value = mode === 'ocean' ? Math.max(0, blue - red) / 255 : mode === 'land' ? Math.max(0, green - blue) / 255 : brightness;
  const notes = [0, 2, 4, 7, 9, 12, 14, 16];
  const step = Math.min(7, Math.floor(value * 8));
  return { frequency: 130.81 * 2 ** ((notes[step] + (mode === 'ice' ? 12 : 0)) / 12), intensity: value, brightness };
}