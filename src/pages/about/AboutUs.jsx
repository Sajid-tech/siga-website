import React from 'react'

import TeamMeeting from '../home/TeamMeeting'

import FeaturedAbout from './FeaturedAbout'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'


const AboutUs = () => {
  return (
    <div className="  w-full pt-38 ">
  


      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Images */}
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* First column - Full height image */}
            <div className="h-full bg-gray-200 rounded-md overflow-hidden">
              <img 
                src="https://southindiagarmentsassociation.com/assets/images/banner/about.jpg" 
                alt="Market interior with customers" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Second column - Two images stacked */}
            <div className="grid grid-cols-1 gap-4 h-full">
              {/* Top right image */}
              {/* <div className="h-full bg-gray-200 rounded-md overflow-hidden">
                <img 
                  src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/common/about-2.png" 
                  alt="Farmer harvesting tomatoes" 
                  className="w-full h-full object-cover"
                />
              </div> */}
               <div className=" inset-0 rounded-md flex items-center bg-[#0b2655] justify-center p-4">
                                      {/* <img 
                                        src="/30-years-g.png" 
                                        alt="Coming Soon" 
                                        className="max-w-full max-h-full object-contain"
                                      /> */}
                                
                                  <div className="relative w-40  h-40  ">
                                    
                                    <img
                                     src='/optimized-images/loaderouter.webp'
                                      alt="outerlayer"
                                      className="absolute top-0 left-0 w-full h-full animate-[spin_20s_linear_infinite]"
                                    />
                                   
                                    <img
                                      src='/optimized-images/loader-new.webp'
                                      alt="insidelayer"
                                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
                                    />
                                  </div>
                                    </div>
              
              {/* Bottom right image */}
              <div className="h-full bg-gray-200 rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Greenhouse interior" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Who We <span className="text-blue-500">Are?</span>
              </h2>
            



              {/* <p className="text-md font-medium text-gray-600 mb-4 sm:mb-6 uppercase tracking-wide leading-relaxed">
                WE'RE HERE TO SERVE ONLY THE BEST PRODUCTS FOR YOU. ENRICHING YOUR HOMES WITH THE BEST ESSENTIALS.
              </p> */}
            </div>

            <div className="space-y-3 sm:space-y-4 text-gray-500 leading-relaxed">
              <p className="text-sm text-gray-500 leading-relaxed">
                 South India Garment Association (SIGA) was formed more than a decade ago. The vision behind its formation was to create a platform for manufacturers, distributors, agents as well as retail traders. With its inception in Bangalore, the gateway to the southern, SIGA grabbed the opportunity to establish the emerging market as the focal point of growth of not only the market in Bangalore but also the state and eventually the region. SIGA is continuously working for the uplift of the garment trade and industry in the region. It represents manufacturers and traders not only from Karnataka but also from other parts of the country.
              </p>
              
              <p className="text-sm text-gray-500 leading-relaxed">
               
SIGA has been acting as a catalyst, interacting with the government in matters of development of the garment trade and industry and various policies. It has been representing for sales tax, entry taxes, excise duty and other related issues like rules of packaged commodity act etc. In non-quota regime SIGA is identifying small manufacturers to upgrade their infrastructure with the help of industry department.
              </p>
              
              <p className="text-sm text-gray-500 leading-relaxed">
                SIGA also started organizing garment fair as an annual event to support the manufacturers to the market as well as enabling retailers to update them selves with the latest under one roof. This trade fair provides an optimum solution for manufacturers for their ultimate requirement – be it agent, franchisee, distributor or retailer.
              </p>
            </div>
          </div>
        </div>

     <div className='mt-5 '>
     <div
                      className="relative p-3  sm:p-4 mt-2 sm:mt-4 lg:mt-6 rounded-lg sm:rounded-xl border border-white/20 backdrop-blur-lg text-center text-white mb-8 sm:mb-12 lg:mb-16 overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 193, 7, 1) 0%, rgba(245, 158, 11, 1) 100%)",
                        boxShadow:
                          "0 4px 16px rgba(251, 191, 36, 0.2), 0 8px 32px rgba(251, 191, 36, 0.1)",
                      }}
                    >
                      
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-500/15"></div>
                        <div className="absolute top-1/4 left-1/4 w-8 sm:w-16 h-8 sm:h-16 rounded-full bg-yellow-400/10 blur-lg sm:blur-xl"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-12 sm:w-24 h-12 sm:h-24 rounded-full bg-amber-500/15 blur-lg sm:blur-xl"></div>
                      </div>

                    
                      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left justify-between">
  {/* Decorative GIFs */}
  <img
    src="https://a-us.storyblok.com/f/1020544/500x500/fc53950a6e/blue-curl.gif"
    alt="blue curl"
    className="absolute -top-4 -left-4 w-10 sm:w-14 lg:w-16 opacity-80 pointer-events-none"
  />
  <img
    src="https://a-us.storyblok.com/f/1019472/500x500/9353110b3c/yellow-star.gif"
    alt="yellow star"
    className="absolute -bottom-6 right-6 w-12 sm:w-16 lg:w-20 opacity-90 pointer-events-none"
  />
  <img
    src="https://a-us.storyblok.com/f/1020544/500x500/39ac930bc7/green-curl.gif"
    alt="green curl"
    className="absolute top-1/2 -right-6 w-10 sm:w-14 lg:w-16 opacity-80 pointer-events-none"
  />

  {/* Text Content */}
  <div className="flex flex-col items-center sm:items-start relative z-10">
    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-yellow-900 drop-shadow-md">
      Join SIGA Membership
    </h3>

    <p className="text-yellow-950 text-sm sm:text-base mt-2 sm:mt-3 font-light max-w-lg">
    Company or person working as a manufacturer, distributor, retailer or agent in the apparel sector is eligible to join.
    </p>
  </div>

  {/* Button */}
  <div className="mt-1 sm:mt-0 relative z-10">
  <Link to={'/become-member'} >
 
               <Button
                        size="lg"
                        className="rounded-xl  hover:scale-105  text-yellow-800  px-5 text-base relative overflow-hidden hover:cursor-pointer group"
                      >
                        <span className="relative z-10">
                          <TextEffect preset="scale" per="word">
                   
                            Click Here
                          </TextEffect>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/80 to-white opacity-100 transition-opacity duration-300 -skew-x-12" />
                      </Button>
            </Link>
  </div>
</div>


                    </div>

     {/* <FeaturedAbout/> */}
         <TeamMeeting/>
     </div>

      </div>
    </div>
  )
}


export default React.memo(AboutUs);