import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-4xl font-bold text-blue-600">À propos de moi</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl">
        Je suis un développeur web spécialisé en React et Three.js. Passionné par les expériences interactives, je travaille sur des projets pour repousser les limites du web.
      </p>
    </div>
  );
};

export default AboutPage;
