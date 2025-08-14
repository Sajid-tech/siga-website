import React from 'react'

import TeamMeeting from '../home/TeamMeeting'

import FeaturedAbout from './FeaturedAbout'


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
              <div className="h-full bg-gray-200 rounded-md overflow-hidden">
                <img 
                  src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/common/about-2.png" 
                  alt="Farmer harvesting tomatoes" 
                  className="w-full h-full object-cover"
                />
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
     <FeaturedAbout/>
         <TeamMeeting/>
     </div>

      </div>
    </div>
  )
}


export default React.memo(AboutUs);