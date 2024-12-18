import React, { useRef, useEffect } from "react";

const EraserCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);
  const cleared = useRef(false); // Pour éviter une exécution multiple
  let eraseCounter = 0; // Compteur pour limiter la vérification des pixels

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialisation du canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "rgba(0, 0, 255, 0.5)"; // Couleur semi-transparente
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const erase = (e: MouseEvent | TouchEvent) => {
      if (cleared.current) return; // Stop si déjà effacé

      const rect = canvas.getBoundingClientRect();
      const x =
        "clientX" in e ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
      const y =
        "clientY" in e ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 180; // Taille de la gomme
      ctx.lineCap = "round";

      if (!lastPosition.current) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      lastPosition.current = { x, y };

      // Vérifie le pourcentage d'effacement une fois toutes les 10 itérations
      if (eraseCounter % 10 === 0) {
        checkErasePercentage(ctx);
      }
      eraseCounter++;
    };

    const resetPosition = () => {
      lastPosition.current = null;
    };

    const checkErasePercentage = (ctx: CanvasRenderingContext2D) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      let transparentPixels = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentPixels++;
      }

      const totalPixels = canvas.width * canvas.height;
      const transparencyPercentage = (transparentPixels / totalPixels) * 100;

      if (transparencyPercentage > 85) {
        cleared.current = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface tout
      }
    };

    // Ajout des écouteurs
    canvas.addEventListener("mousemove", erase);
    canvas.addEventListener("mousedown", resetPosition);
    canvas.addEventListener("mouseup", resetPosition);
    canvas.addEventListener("mouseout", resetPosition);
    canvas.addEventListener("touchmove", erase, { passive: false });
    canvas.addEventListener("touchstart", resetPosition);
    canvas.addEventListener("touchend", resetPosition);

    // Nettoyage des écouteurs
    return () => {
      canvas.removeEventListener("mousemove", erase);
      canvas.removeEventListener("mousedown", resetPosition);
      canvas.removeEventListener("mouseup", resetPosition);
      canvas.removeEventListener("mouseout", resetPosition);
      canvas.removeEventListener("touchmove", erase);
      canvas.removeEventListener("touchstart", resetPosition);
      canvas.removeEventListener("touchend", resetPosition);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 z-20 pointer-events-auto"
    />
  );
};

export default EraserCanvas;
