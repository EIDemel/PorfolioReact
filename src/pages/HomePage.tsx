import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin  } from "react-icons/fa";
import { IoIosMail, IoIosMailOpen } from "react-icons/io";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Assure un minimum de 2 secondes
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center bg-black text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-6xl font-bold text-gray-100 mb-4">
        LEO DEMEILLIERS
      </h1>
      <div className="flex gap-4">
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-200 transition-colors duration-300"
        >
          <FaLinkedin className="w-16 h-16" />
        </a>
        <a
          href="mailto:example@mail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-200 transition-colors duration-300"
        >
          <FaGithub   className="w-16 h-16" />
        </a>
        <a
          href="mailto:example@mail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-200 transition-colors duration-300"
        >
          <IoIosMailOpen  className="w-16 h-16" />
        </a>
      </div>
    </motion.div>
  );
};

export default HomePage;
