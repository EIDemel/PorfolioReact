import React, { useRef, useEffect } from 'react';

interface ErasableImageProps {
  topImage: string;
  bottomImage: string;
  width: number;
  height: number;
}

const ErasableImage: React.FC<ErasableImageProps> = ({
  topImage,
  bottomImage,
  width,
  height,
}) => {
  const bottomCanvasRef = useRef<HTMLCanvasElement>(null);
  const topCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const bottomCanvas = bottomCanvasRef.current;
    const topCanvas = topCanvasRef.current;

    if (!bottomCanvas || !topCanvas) return;

    const bottomCtx = bottomCanvas.getContext('2d');
    const topCtx = topCanvas.getContext('2d');

    if (!bottomCtx || !topCtx) return;

    const bottomImg = new Image();
    const topImg = new Image();

    // Charger les images
    bottomImg.src = bottomImage;
    topImg.src = topImage;

    bottomImg.onload = () => {
      bottomCtx.drawImage(bottomImg, 0, 0, width, height);
    };

    topImg.onload = () => {
      topCtx.drawImage(topImg, 0, 0, width, height);
    };

    const startErasing = (e: MouseEvent) => {
      isDrawing.current = true;
      const rect = topCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      lastPosition.current = { x, y };
    };

    const stopErasing = () => {
      isDrawing.current = false;
      lastPosition.current = null;
    };

    const erase = (e: MouseEvent) => {
      if (!isDrawing.current || !lastPosition.current) return;

      const rect = topCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Effacement en chemin continu
      topCtx.globalCompositeOperation = 'destination-out';
      topCtx.lineWidth = 80; // Épaisseur de l'effacement
      topCtx.lineCap = 'round'; // Bordures arrondies
      topCtx.beginPath();
      topCtx.moveTo(lastPosition.current.x, lastPosition.current.y);
      topCtx.lineTo(x, y);
      topCtx.stroke();

      lastPosition.current = { x, y };
    };

    // Ajouter les événements
    topCanvas.addEventListener('mousedown', startErasing);
    topCanvas.addEventListener('mousemove', erase);
    window.addEventListener('mouseup', stopErasing);

    return () => {
      topCanvas.removeEventListener('mousedown', startErasing);
      topCanvas.removeEventListener('mousemove', erase);
      window.removeEventListener('mouseup', stopErasing);
    };
  }, [topImage, bottomImage, width, height]);

  return (
    <div style={{ position: 'relative', width, height }}>
      {/* Canvas pour l'image du bas */}
      <canvas
        ref={bottomCanvasRef}
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />

      {/* Canvas pour l'image du haut */}
      <canvas
        ref={topCanvasRef}
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
      />
    </div>
  );
};

export default ErasableImage;
