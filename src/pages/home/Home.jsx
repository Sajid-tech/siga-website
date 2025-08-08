import React from 'react'
import HeroSection from './HeroSection'
import Category from './Category'
import DealOfTheDay from './DealOfTheDay'
import NewArrival from './NewArrival'
import Featured from './Featured'
import Info from './Info'
import Trending from './Trending'


const Home = () => {
  return (
    <>
   
    <div className="relative w-full">
      {/* Hero section - sticky */}
      <div className="sticky top-0 h-screen z-0">
        <HeroSection />
      </div>

      {/* Content that scrolls over Hero */}
      <div className="relative z-10 bg-white">
         <Category/>
    <DealOfTheDay/>
    <NewArrival/>
    {/* <Featured/>
        <Info />
        <Trending /> */}
      </div>
    </div>
    
    <>
      
    </>
    </>
  )
}

export default Home