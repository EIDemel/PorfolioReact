import React, { useRef, useEffect } from "react";

const EraserCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialisation du canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dessin de la couleur semi-transparente sur toute la surface
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)"; // Couleur bleue semi-transparente
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;

    const startDrawing = (e: MouseEvent) => {
      isDrawing = true;
      erase(e);
    };

    const stopDrawing = () => {
      isDrawing = false;
      ctx.beginPath();
    };

    const erase = (e: MouseEvent) => {
      if (!isDrawing) return;

      ctx.globalCompositeOperation = "destination-out"; // Effet gomme
      ctx.arc(e.clientX, e.clientY, 20, 0, Math.PI * 2); // Taille de la gomme
      ctx.fill();
    };

    // Écouteurs d'événements
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", erase);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // Nettoyage des écouteurs à la suppression du composant
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", erase);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
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
