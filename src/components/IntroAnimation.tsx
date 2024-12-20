import React, { useState } from "react";
import { motion } from "framer-motion";
import ErasableImage from "./ErasableImage";
import topImage from '../assets/Card_Pro.png';       // Image supérieure
import bottomImage from '../assets/Card_Perso.png'; // Image inférieure

const IntroAnimation: React.FC = () => {
    const [showCard, setShowCard] = useState(false);
  
    return (
      <div className="intro-container">
        {/* Texte "Des rêves" à gauche */}
        <motion.div
          className="intro-text intro-text-left"
          initial={{ opacity: 1, x: 150 }}
          animate={{ opacity: 1, x: -175 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <p>BIEN</p>
          <p>QU'UN</p>
        </motion.div>
  
        {/* Texte "À la réalité" à droite */}
        <motion.div
          className="intro-text intro-text-right"
          initial={{ opacity: 1, x: - 200 }}
          animate={{ opacity: 1, x: 150 }}
          transition={{ duration: 1, delay: 2 }}
          onAnimationComplete={() => setShowCard(true)}
        >
            <p> PLUS</p>
            <p> DEV</p>
        </motion.div>   
  
        {/* Carte au centre */}
        {showCard && (
          <motion.div
            className="card-container"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <ErasableImage
              topImage={topImage}
              bottomImage={bottomImage}
              width={530*0.8}
              height={698*0.8}
            />
          </motion.div>
        )}
      </div>
    );
  };
  
  export default IntroAnimation;