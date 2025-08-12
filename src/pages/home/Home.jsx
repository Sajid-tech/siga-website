import React from "react";
import Category from "./Category";
import NewArrival from "./NewArrival";
import Info from "./Info";
import Trending from "./Trending";
import { HeroSection } from "@/components/blocks/hero-section-1";

import HomeAbout from "./HomeAbout";
import Testimonial from "./Testimonial";
import TeamMeeting from "./TeamMeeting";
import HeroGallery from "@/components/blocks/HeroGallery";

import Event from "./Event";

const Home = () => {
  return (
    <>
      <HeroSection />
      <HeroGallery />
      <Category />
      <Event />

      <HomeAbout />
      <NewArrival />
      <Testimonial />
      <TeamMeeting />
      {/* <Info />
        <Trending /> */}
    </>
  );
};

export default Home;
