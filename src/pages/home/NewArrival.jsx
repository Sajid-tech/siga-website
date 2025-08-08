import { CardCarousel } from "../../components/ui/card-carousel";
import React, { useState, useEffect } from "react";


const NewArrival = () => {
  const images = [
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/100.jpg", alt: "Image 1" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/101.jpg", alt: "Image 2" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/102.jpg", alt: "Image 3" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/103.jpg", alt: "Image 4" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/104.jpg", alt: "Image 5" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/105.jpg", alt: "Image 6" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/106.jpg", alt: "Image 7" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/107.jpg", alt: "Image 8" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/108.jpg", alt: "Image 9" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/109.jpg", alt: "Image 10" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/110.jpg", alt: "Image 11" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/111.jpg", alt: "Image 12" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/50.jpg", alt: "Image 13" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/51.jpg", alt: "Image 14" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/52.jpg", alt: "Image 15" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/53.jpg", alt: "Image 16" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/54.jpg", alt: "Image 17" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/55.jpg", alt: "Image 18" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/56.jpg", alt: "Image 19" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/57.jpg", alt: "Image 20" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/58.jpg", alt: "Image 21" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/59.jpg", alt: "Image 22" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/60.jpg", alt: "Image 23" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/61.jpg", alt: "Image 24" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/62.jpg", alt: "Image 25" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/63.jpg", alt: "Image 26" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/64.jpg", alt: "Image 27" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/65.jpg", alt: "Image 28" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/66.jpg", alt: "Image 29" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/67.jpg", alt: "Image 30" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/68.jpg", alt: "Image 31" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/69.jpg", alt: "Image 32" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/70.jpg", alt: "Image 33" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/71.jpg", alt: "Image 34" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/72.jpg", alt: "Image 35" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/73.jpg", alt: "Image 36" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/74.jpg", alt: "Image 37" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/75.jpg", alt: "Image 38" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/76.jpg", alt: "Image 39" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/77.jpg", alt: "Image 40" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/78.jpg", alt: "Image 41" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/79.jpg", alt: "Image 42" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/80.jpg", alt: "Image 43" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/81.jpg", alt: "Image 44" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/82.jpg", alt: "Image 45" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/83.jpg", alt: "Image 46" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/84.jpg", alt: "Image 47" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/85.jpg", alt: "Image 48" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/86.jpg", alt: "Image 49" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/87.jpg", alt: "Image 50" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/88.jpg", alt: "Image 51" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/89.jpg", alt: "Image 52" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/90.jpg", alt: "Image 53" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/91.jpg", alt: "Image 54" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/92.jpg", alt: "Image 55" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/93.jpg", alt: "Image 56" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/94.jpg", alt: "Image 57" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/95.jpg", alt: "Image 58" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/96.jpg", alt: "Image 59" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/97.jpg", alt: "Image 60" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/98.jpg", alt: "Image 61" },
    { src: "https://southindiagarmentsassociation.com/assets/images/brand/99.jpg", alt: "Image 62" }
  ];
  

  return (
    <div className=" relative w-full py-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
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
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8  text-center  gap-4">
          <div className=""> 
            <h2 className="text-3xl  font-medium text-gray-900">
            Matching style and class with  <span className="text-blue-900">luxury and comfort.</span>
            </h2>
            <p className="text-gray-600 font mt-2">
            Clothes Are The Spirit Of Fashion
            </p>
          </div>
         
        </div>
      
        <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
      
      </div>
      
     
    </div>
  );
};

export default NewArrival;