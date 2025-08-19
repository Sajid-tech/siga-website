import React, { Suspense } from "react";

import  HeroSection  from "./HeroSection";




const WhyChoose = React.lazy(() => import("@/pages/home/WhyChoose"));
const ShowCaseCloth = React.lazy(() => import("@/pages/home/ShowCaseCloth"));
const HomeAbout = React.lazy(() => import("@/pages/home/HomeAbout"));
const Testimonial = React.lazy(() => import("@/pages/home/Testimonial"));
const TeamMeeting = React.lazy(() => import("@/pages/home/TeamMeeting"));
// const Event = React.lazy(() => import("@/pages/home/Event"));
const PhotoGallery = React.lazy(() => import("@/components/ui/photo-gallery"));
const ShuffleHero = React.lazy(() => import("@/components/ui/shuffle-grid"));


const Home = () => {
  return (
    <>
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
