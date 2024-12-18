import React, { useRef, useEffect } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);

  // Gestion de l'effet 3D
  const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
  
    // Réduire l'intensité de la rotation
    const x = ((clientX - left) / width - 0.5) * 10; // Rotation Y réduite
    const y = -((clientY - top) / height - 0.5) * 10; // Rotation X réduite
  
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    }
  };
  

  const resetRotation = () => {
    if (containerRef.current) containerRef.current.style.transform = "";
  };

  // Vérification d'effacement complet
  const checkIfFullyErased = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const totalPixels = width * height;
    const transparentRatio = transparentCount / totalPixels;

    if (transparentRatio > 0.8) {
      ctx.clearRect(0, 0, width, height);
    }
  };

  // Effacement
  useEffect(() => {
    const topCanvas = topCanvasRef.current;
    const bottomCanvas = bottomCanvasRef.current;
    if (!topCanvas || !bottomCanvas) return;

    const topCtx = topCanvas.getContext("2d");
    const bottomCtx = bottomCanvas.getContext("2d");
    if (!topCtx || !bottomCtx) return;

    const topImg = new Image();
    const bottomImg = new Image();

    bottomImg.src = bottomImage;
    topImg.src = topImage;

    bottomImg.onload = () => bottomCtx.drawImage(bottomImg, 0, 0, width, height);
    topImg.onload = () => topCtx.drawImage(topImg, 0, 0, width, height);

    const startErasing = (e: MouseEvent) => {
      isDrawing.current = true;
      lastPosition.current = getMousePos(e, topCanvas);
    };

    const stopErasing = () => {
      isDrawing.current = false;
      lastPosition.current = null;

      checkIfFullyErased(topCtx);
    };

    const erase = (e: MouseEvent) => {
      if (!isDrawing.current || !lastPosition.current) return;

      const pos = getMousePos(e, topCanvas);

      topCtx.globalCompositeOperation = "destination-out";
      topCtx.lineWidth = 80;
      topCtx.lineCap = "round";
      topCtx.beginPath();
      topCtx.moveTo(lastPosition.current.x, lastPosition.current.y);
      topCtx.lineTo(pos.x, pos.y);
      topCtx.stroke();

      lastPosition.current = pos;
    };

    const getMousePos = (e: MouseEvent, canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    topCanvas.addEventListener("mousedown", startErasing);
    topCanvas.addEventListener("mousemove", erase);
    window.addEventListener("mouseup", stopErasing);

    return () => {
      topCanvas.removeEventListener("mousedown", startErasing);
      topCanvas.removeEventListener("mousemove", erase);
      window.removeEventListener("mouseup", stopErasing);
    };
  }, [topImage, bottomImage, width, height]);

  return (
    <div
      className="relative mx-auto"
      style={{
        width,
        height,
        perspective: "1000px",
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove3D}
      onMouseLeave={resetRotation}
    >
      <div
        ref={containerRef}
        style={{
          transition: "transform 0.2s ease-out",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        <canvas
          ref={bottomCanvasRef}
          width={width}
          height={height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <canvas
          ref={topCanvasRef}
          width={width}
          height={height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};

export default ErasableImage;
