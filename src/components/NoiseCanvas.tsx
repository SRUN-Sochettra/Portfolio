import { useEffect, useRef } from 'react';

export default function NoiseCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = true;

    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let w = 0;
    let h = 0;

    const resize = () => {
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      w = Math.max(1, Math.floor(window.innerWidth));
      h = Math.max(1, Math.floor(window.innerHeight));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      if (w <= 0 || h <= 0) {
        raf = requestAnimationFrame(draw);
        return;
      }

      // Avoid reallocating huge buffers on every frame (especially during resize).
      // Draw noise on a small tile and let the canvas scale it.
      const tile = 240;
      const tw = Math.min(tile, w);
      const th = Math.min(tile, h);
      const image = ctx.createImageData(tw, th);
      const data = image.data;
      // Sparse noise for performance: write every 4th pixel.
      for (let i = 0; i < data.length; i += 16) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 18; // alpha
      }
      ctx.putImageData(image, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      // Repeat tile to fill.
      for (let y = 0; y < h; y += th) {
        for (let x = 0; x < w; x += tw) {
          ctx.putImageData(image, x, y);
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.55] mix-blend-soft-light"
    />
  );
}
