import React from "react";
import EraserCanvas from "../components/EraserCanvas";

const BackgroundPage: React.FC = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Couche Z=0 : Fond de couleur */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 z-0"></div>

      {/* Couche Z=1 : Texte */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-4xl font-bold">
        Mon Arrière-Plan Multi-Couches
      </div>

      {/* Couche Z=2 : Canvas interactif */}
      <EraserCanvas />
    </div>
  );
};

export default BackgroundPage;
