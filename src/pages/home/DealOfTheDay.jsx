import React, { useState, useEffect } from 'react';

const DealOfTheDay = () => {
  

  return (
    <div className="relative w-full py-12 ">
    <div className=" max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">



    <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/90 to-indigo-50/20"></div>
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-rose-300/25 blur-[100px]"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-300/25 blur-[100px]"></div>
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


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
    
        <div className=" h-auto">
     
          <div className="h-full bg-gray-200 rounded-md overflow-hidden">
            <img 
              src="https://southindiagarmentsassociation.com/assets/images/banner/about.jpg" 
              alt="Market interior with customers" 
              className="w-auto h-full object-cover"
            />
          </div>
          
       
        </div>

        {/* Right side - Content */}
        <div className="space-y-6 cols-span-1 lg:col-span-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            Welcome to  <span className="text-blue-500">SIGA</span>
            </h2>
            
           
          </div>

          <div className="space-y-3  sm:space-y-4 text-gray-500 leading-relaxed">
            <p className="text-md text-gray-600 ">
            SIGA has been acting as a catalyst, interacting with the government in matters of development of the garment trade and industry and various policies. It has been representing for sales tax, entry taxes, excise duty and other related issues like rules of packaged commodity act etc. In non-quota regime SIGA is identifying small manufacturers to upgrade their infrastructure with the help of industry department.
            </p>
            
            <p className="text-md text-gray-600 ">
            SIGA also started organizing garment fair as an annual event to support the manufacturers to the market as well as enabling retailers to update them selves with the latest under one roof. This trade fair provides an optimum solution for manufacturers for their ultimate requirement – be it agent, franchisee, distributor or retailer.
            </p>
            
            <p className="text-md text-gray-600">
            South India Garment Association (SIGA) was formed more than a decade ago. The vision behind its formation was to create a platform for manufacturers, distributors, agents as well as retail traders. With its inception in Bangalore, the gateway to the southern, SIGA grabbed the opportunity to establish the emerging market as the focal point of growth of not only the market in Bangalore but also the state and eventually the region.
            </p>
            
          
          </div>
        </div>
      </div>

    

     

    </div>
  </div>
  )
}

export default DealOfTheDay;