import React from 'react';
import ErasableImage from '../components/ErasableImage';
import topImage from '../assets/Card_Pro.png';       // Image supérieure
import bottomImage from '../assets/Card_Perso.png'; // Image inférieure

const HomePage: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="relative mx-auto">
          <ErasableImage
            topImage={topImage}
            bottomImage={bottomImage}
            width={430}
            height={598}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;