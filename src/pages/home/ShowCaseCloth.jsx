import { CardCarousel } from "../../components/ui/card-carousel";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BASE_URL from "@/config/BaseUrl";

const fetchBrands = async () => {
  const response = await fetch(  `${BASE_URL}/api/getBrand`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const ShowCaseCloth = () => {
 const { data: brandsData, isLoading, isError } = useQuery({
     queryKey: ['brands'],
     queryFn: fetchBrands,
   });
 
   
   const images = React.useMemo(() => {
     if (!brandsData?.data) return [];
     
     return brandsData.data.map((brand) => ({
       src: `${brandsData.image_url}${brand.brand_image}`,
       alt: brand.brand_image.replace('.jpg', '') || 'Brand Image'
     }));
   }, [brandsData]);
 
 
   if (isLoading) {
     return (
       <div className="relative w-full bg-gradient-to-br from-red-50 via-transparent to-indigo-300/25 py-8">
         <div className="absolute inset-0 overflow-hidden">
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
 
         <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
           <div className="mb-8 text-center gap-4">
             <div className="relative z-30"> 
               <Skeleton height={40} width={400} className="mx-auto" />
               <Skeleton height={20} width={200} className="mx-auto mt-2" />
             </div>
           </div>
           
         
           <div className="flex justify-center gap-4">
             {[...Array(4)].map((_, index) => (
               <div key={index} className="w-64 h-80">
                 <Skeleton height={320} width={256} />
                 <Skeleton height={20} width={150} className="mt-2" />
               </div>
             ))}
           </div>
         </div>
       </div>
     );
   }
 

   if (isError) {
     return (
       <div className="relative w-full bg-gradient-to-br from-red-50 via-transparent to-indigo-300/25 py-8">
         <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
           <div className="text-red-500">Error loading brands. Please try again later.</div>
         </div>
       </div>
     );
   }

  return (
    <div className="relative w-full bg-gradient-to-br from-red-50 via-transparent to-indigo-300/25 py-8">
 
      <div className="absolute inset-0 overflow-hidden">
     
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
        {/* <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)',
            backgroundSize: '60px 60px',
            animation: 'moveBackground 20s infinite alternate',
          }}
        ></div> */}
      </div>
      

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
          className="showcase-cloth-carousel relative z-0"
        />
      </div>
      <style>{`
        .showcase-cloth-carousel .swiper {
          width: 100%;
          padding-bottom: 50px;
        }
        
        .showcase-cloth-carousel .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 300px;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        .showcase-cloth-carousel .swiper-slide img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          transform: translateZ(0);
          will-change: transform;
        }
        
        .showcase-cloth-carousel .swiper-3d .swiper-slide-shadow-left,
        .showcase-cloth-carousel .swiper-3d .swiper-slide-shadow-right {
          background-image: none;
        }
        
        .showcase-cloth-carousel .swiper-pagination {
          display: none !important;
        }
        
        /* Animation for the background */
        @keyframes moveBackground {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .showcase-cloth-carousel .swiper {
            transition: none;
          }
          .showcase-cloth-carousel .swiper-slide {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ShowCaseCloth;