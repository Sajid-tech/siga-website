import React from 'react'
import Category from './Category'
import NewArrival from './NewArrival'
import Featured from './Featured'
import Info from './Info'
import Trending from './Trending'
import { HeroSection } from '@/components/blocks/hero-section-1'

import HomeAbout from './HomeAbout'
import Testimonial from './Testimonial'
import TeamMeeting from './TeamMeeting'


const Home = () => {
  return (
    <>
   
     
          {/* <HeroSection /> */}
          <HeroSection />
              <Featured/>
         <Category/>
    
    <HomeAbout/>
    <NewArrival/>
    <Testimonial/>
<TeamMeeting/>
        {/* <Info />
        <Trending /> */}
    
    
    </>
      
    
  )
}

export default Home