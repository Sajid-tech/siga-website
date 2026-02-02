/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from "react";

import  HeroSection  from "./HeroSection";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BASE_URL from "@/config/BaseUrl";




const WhyChoose = React.lazy(() => import("@/pages/home/WhyChoose"));
const ShowCaseCloth = React.lazy(() => import("@/pages/home/ShowCaseCloth"));
const HomeAbout = React.lazy(() => import("@/pages/home/HomeAbout"));
const Testimonial = React.lazy(() => import("@/pages/home/Testimonial"));
const TeamMeeting = React.lazy(() => import("@/pages/home/TeamMeeting"));
// const Event = React.lazy(() => import("@/pages/home/Event"));
const PhotoGallery = React.lazy(() => import("@/components/ui/photo-gallery"));
const ShuffleHero = React.lazy(() => import("@/components/ui/shuffle-grid"));


const updateVisitorCount = async () => {
  
  const response = await axios.put(
     `${BASE_URL}/api/update-visitors/1`,
    {}, 
    
  );
  return response.data;
};

const BANNER_URL =
  "https://southindiagarmentsassociation.com/crmapi/public/assets/images/banner/31.jpg";

const Home = () => {
  const queryClient = useQueryClient();
   const [showBanner, setShowBanner] = useState(true);
  const mutation = useMutation({
    mutationFn: updateVisitorCount,
    onSuccess: () => {
// console.log('visitor count',data)
      queryClient.invalidateQueries(["visitorCount"]);
    },
    onError: (error) => {
      console.error("Failed to update visitor count:", error);
    },
  });

  
  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <>

       {showBanner && (
        <section className="w-full h-auto pt-24 sm:pt-24 md:pt-28 lg:pt-32">
          <img
            src={BANNER_URL}
            alt="Banner"
            className="w-full h-full object-cover"
            onError={() => setShowBanner(false)}
          />
        </section>
      )}
      <HeroSection />


      {/* <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
  <PhotoGallery />
      {/* </Suspense> */}

     
      {/* <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
       <ShuffleHero />
      {/* </Suspense>
      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
       <WhyChoose />
      {/* </Suspense>

      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
        {/* <Event /> */}
      {/* </Suspense>

      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
         <HomeAbout />
      {/* </Suspense>

      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
         <ShowCaseCloth />
      {/* </Suspense>

      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
  <Testimonial />
      {/* </Suspense>

      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
        <TeamMeeting />
      {/* </Suspense> */}

   
    
 
   
     
     
    </>
  );
};

export default React.memo(Home);
