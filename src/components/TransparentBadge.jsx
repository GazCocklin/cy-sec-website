import React, { useEffect, useRef, useState } from 'react';

/**
 * Loads an image onto a hidden canvas, makes black/near-black pixels
 * transparent, then renders the result. Works with any PNG/WEBP that
 * has a solid black background.
 */
export default function TransparentBadge({ src, alt, className, threshold = 40 }) {
  const canvasRef = useRef(null);
  const [dataUrl, setDataUrl] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          // Make pixels transparent if they are near-black
          if (r <= threshold && g <= threshold && b <= threshold) {
            d[i + 3] = 0; // fully transparent
          }
        }
        ctx.putImageData(imageData, 0, 0);
        setDataUrl(canvas.toDataURL('image/png'));
      } catch {
        // CORS or tainted canvas — just show the original
        setFailed(true);
      }
    };
    img.onerror = () => setFailed(true);
    img.src = src;
  }, [src, threshold]);

  if (failed || !dataUrl) {
    // Fall back to the original image while processing (or on failure)
    return <img src={src} alt={alt} className={className} />;
  }

  return <img src={dataUrl} alt={alt} className={className} />;
}
