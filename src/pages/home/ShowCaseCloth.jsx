import { CardCarousel } from "../../components/ui/card-carousel";
import React from "react";

const ShowCaseCloth = () => {
  const images = React.useMemo(() => [
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/100.jpg", alt: "Image 1" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/101.jpg", alt: "Image 2" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/102.jpg", alt: "Image 3" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/103.jpg", alt: "Image 4" },
  ], []);

  return (
    <div className="relative w-full py-8">
      {/* Background elements - no z-index needed here */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/90 to-indigo-50/20"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-indigo-300/25 blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-red-300/25 blur-[100px]"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)',
            backgroundSize: '60px 60px',
            animation: 'moveBackground 20s infinite alternate',
          }}
        ></div>
      </div>
      
      {/* Content container with higher z-index */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="mb-8 text-center gap-4">
          <div className="relative z-30"> 
            <h2 className="text-3xl font-medium text-gray-900">
              Matching style and class with <span className="text-blue-900">luxury and comfort.</span>
            </h2>
            <p className="text-gray-600 mt-2">
              Clothes Are The Spirit Of Fashion
            </p>
          </div>
        </div>
      
        <CardCarousel
          images={images}
          autoplayDelay={3000}
          showPagination={true}
          showNavigation={true}
          className="relative z-0"
        />
      </div>
    </div>
  );
};

export default ShowCaseCloth;