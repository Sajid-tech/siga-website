import React from 'react'
import Category from './Category'
import NewArrival from './NewArrival'
import Featured from './Featured'
import Info from './Info'
import Trending from './Trending'
import { HeroSection } from '@/components/blocks/hero-section-1'

import HomeAbout from './HomeAbout'
import Testimonial from './Testimonial'


const Home = () => {
  return (
    <>
   
     
          {/* <HeroSection /> */}
          <HeroSection />
         <Category/>
    
    <HomeAbout/>
    <NewArrival/>
    <Testimonial/>
    {/* <Featured/>
        <Info />
        <Trending /> */}
    
    
    </>
      
    
  )
}

export default Home