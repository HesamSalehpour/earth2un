import { useEffect, useRef } from 'react';

export function EarthStage({ imageUrl, position, mode, onSample }: { imageUrl: string; position: number; mode: string; onSample: (r: number, g: number, b: number) => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pixels = useRef<ImageData | null>(null);
  const sampleRef = useRef(onSample);
  sampleRef.current = onSample;

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const source = document.createElement('canvas');
      source.width = 1024; source.height = 512;
      const ctx = source.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(image, 0, 0, 1024, 512);
      pixels.current = ctx.getImageData(0, 0, 1024, 512);
      draw();
    };
    image.src = imageUrl;
    function draw() {
      const ctx = canvas.current?.getContext('2d');
      const input = pixels.current;
      if (!ctx || !input) return;
      const size = 600, radius = 280;
      const output = ctx.createImageData(size, size);
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const nx = (x - size / 2) / radius, ny = (y - size / 2) / radius;
        if (nx * nx + ny * ny > 1) continue;
        const nz = Math.sqrt(1 - nx * nx - ny * ny);
        const longitude = Math.atan2(nx, nz) / (2 * Math.PI) + .5 + position / 100;
        const sx = Math.floor(((longitude % 1) + 1) % 1 * 1024);
        const sy = Math.min(511, Math.floor((Math.asin(ny) / Math.PI + .5) * 512));
        const a = (sy * 1024 + sx) * 4, b = (y * size + x) * 4;
        const light = .25 + .75 * Math.max(0, -.35 * nx - .35 * ny + .86 * nz);
        output.data[b] = input.data[a] * light;
        output.data[b + 1] = input.data[a + 1] * light;
        output.data[b + 2] = input.data[a + 2] * light;
        output.data[b + 3] = 255;
      }
      ctx.putImageData(output, 0, 0);
      const point = (256 * 1024 + Math.floor(((.5 + position / 100) % 1) * 1024)) * 4;
      sampleRef.current(input.data[point], input.data[point + 1], input.data[point + 2]);
    }
    draw();
    return () => { image.onload = null; };
  }, [imageUrl, position]);

  return <div className={`earth-stage earth-${mode}`}><div className="orbit orbit-one" /><div className="orbit orbit-two" /><canvas ref={canvas} width={600} height={600} aria-label="Earth frame, rotating with the playback position" role="img" /><div className="scan-line"><span /></div><div className="earth-coordinate">{Math.round(position * 3.6 - 180)}° LONGITUDE <span>0° EQUATOR</span></div></div>;
}