import React, { useEffect, useState } from 'react';

const FeaturedAbout = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = 8; 

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-8 ">
      <div className="max-w-[85rem] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Pictures of Siga Fair</h1>
          {/* <button className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
            Know More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button> */}
        </div>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8 max-w-4xl">
          SIGA unites garment industry professionals across South India, with our annual fair fostering trade, innovation, and collaboration under one roof.
        </p>


        <div className="relative">

          <div className="grid grid-cols-12 gap-4 mb-4">
            {/* Top Row */}
            <div className="col-span-2">
              <div className="aspect-[2/1.5] bg-gray-300 rounded-lg overflow-hidden">
                <img 
                  src="https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" 
                  alt="Rally gathering" 
                  className={`w-full h-full object-cover filter transition-all duration-500 ${activeIndex === 0 ? 'grayscale-0' : 'grayscale'}`}
                />
              </div>
            </div>
            <div className="col-span-5">
              <div className="aspect-[3/1.5] bg-gray-300 rounded-lg overflow-hidden">
                <img 
                  src="https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" 
                  alt="Political gathering with leaders" 
                  className={`w-full h-full object-cover filter transition-all duration-500 ${activeIndex === 1 ? 'grayscale-0' : 'grayscale'}`}
                />
              </div>
            </div>
            <div className="col-span-5">
              <div className="aspect-[5/3] bg-gray-300 rounded-lg overflow-hidden">
                <img 
                  src="https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" 
                  alt="Community meeting" 
                  className={`w-full h-full object-cover filter transition-all duration-500 ${activeIndex === 2 ? 'grayscale-0' : 'grayscale'}`}
                />
              </div>
            </div>
          </div>

    
          <div className="grid grid-cols-12 gap-4 mb-4 relative">
            <div className="col-span-4">
              <div className="aspect-[3/2] rounded-lg overflow-hidden">
         
              </div>
            </div>
            <div className="col-span-4">
              <div className="aspect-[3/2] bg-gray-300 rounded-lg overflow-hidden">
                <img 
                  src="https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" 
                  alt="Flag ceremony" 
                  className={`w-full h-full object-cover filter transition-all duration-500 ${activeIndex === 3 ? 'grayscale-0' : 'grayscale'}`}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="aspect-[3/2] bg-gray-300 rounded-lg overflow-hidden">
                <img 
                  src="https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" 
                  alt="Large crowd gathering" 
                  className={`w-full h-full object-cover filter transition-all duration-500 ${activeIndex === 4 ? 'grayscale-0' : 'grayscale'}`}
                />
              </div>
            </div>

          
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <svg className='h-[8rem] w-[6rem] md:w-[16rem] md:h-[20rem] lg:h-[30rem] lg:w-[25rem] mt-0 md:mt-20' viewBox="0 0 542 632" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 0H510C527.673 0 542 14.3268 542 32V298.261C542 315.934 527.673 330.261 510 330.261H228.864C211.191 330.261 196.623 344.683 198.472 362.259C211.096 482.222 298.249 538.277 466.957 544.371C484.619 545.008 499.014 559.258 499.014 576.931V600C499.014 617.673 484.397 632.016 466.725 631.892C13.3912 628.726 0.34845 553.042 0.00854492 32.3339C-0.00299072 14.6608 14.3269 0 32 0Z" fill="url(#paint0_linear_756_17898)"></path>
                <defs>
                  <linearGradient id="paint0_linear_756_17898" x1="542.008" y1="631.996" x2="-82.609" y2="96.326" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB800"></stop>
                    <stop offset="1" stopColor="#FFF500"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <div className="aspect-[5/3] rounded-lg overflow-hidden">
              
              </div>
            </div>
            <div className="col-span-2">
              <div className="aspect-square bg-gray-300 rounded-lg overflow-hidden">
                <img 
                  src="https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" 
                  alt="Hindi text banner" 
                  className={`w-full h-full object-cover filter transition-all duration-500 ${activeIndex === 5 ? 'grayscale-0' : 'grayscale'}`}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="aspect-[3/2] bg-gray-300 rounded-lg overflow-hidden">
                <img 
                  src="https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" 
                  alt="Crowd scene" 
                  className={`w-full h-full object-cover filter transition-all duration-500 ${activeIndex === 6 ? 'grayscale-0' : 'grayscale'}`}
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className="aspect-square bg-gray-300 rounded-lg overflow-hidden">
                <img 
                  src="https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" 
                  alt="Group photo" 
                  className={`w-full h-full object-cover filter transition-all duration-500 ${activeIndex === 7 ? 'grayscale-0' : 'grayscale'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAbout;