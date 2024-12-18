import React from "react";
import { motion } from "framer-motion";

const LoadingScreen: React.FC = () => {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-black"
    >
      <motion.h1 className="text-4xl font-bold text-gray-100"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      >Trop cool ça charge</motion.h1>
    </div>
  );
};

export default LoadingScreen;