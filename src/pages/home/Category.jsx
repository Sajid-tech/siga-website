import React from "react";
import { Heart, Users, Mail, Trophy, ArrowRight } from "lucide-react";

const Category = () => {
  return (
    <div className="py-12 px-4 relative overflow-hidden  ">
      {/* Refined SVG Pattern Background */}
      <div className="absolute inset-0 z-10 opacity-10">
        <svg 
          className="absolute left-0 top-1/4"
          width="240" 
          height="240" 
          viewBox="0 0 240 240" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="40" y="40" width="160" height="160" rx="20" stroke="#4B558D" strokeWidth="2" strokeDasharray="8 4"/>
          <circle cx="120" cy="120" r="40" fill="#E84E53" fillOpacity="0.3"/>
        </svg>
        <svg 
          className="absolute right-0 bottom-1/4"
          width="240" 
          height="240" 
          viewBox="0 0 240 240" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M120 0V240M0 120H240" stroke="#4B558D" strokeWidth="2" strokeDasharray="6 3"/>
          <rect x="80" y="80" width="80" height="80" rx="10" stroke="#E84E53" strokeWidth="2"/>
        </svg>
        {/* Additional patterns for better coverage */}
        <svg 
          className="absolute left-1/4 bottom-0"
          width="180" 
          height="180" 
          viewBox="0 0 180 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M90 0L180 90L90 180L0 90L90 0Z" stroke="#4B558D" strokeWidth="1.5" strokeDasharray="5 2" fill="none"/>
        </svg>
        <svg 
          className="absolute right-1/4 top-0"
          width="200" 
          height="200" 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" stroke="#E84E53" strokeWidth="1.5" strokeDasharray="4 4" fill="none"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            WHY CHOOSE SIGA?
          </h2>
          <div className="flex justify-center gap-1 mb-3">
            <div className="w-12 h-[1px] bg-red-500"></div>
            <div className="w-12 h-[1px] bg-red-500 translate-y-1.5 -translate-x-8"></div>
          </div>
          <p className="text-gray-600 text-md max-w-2xl mx-auto">
            Empowering MSMEs with comprehensive solutions for growth and success
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-200  overflow-hidden">
        
            <div 
     
              className="bg-white hover:bg-gray-50 p-6 text-center group relative transition-all duration-200  border-r border-gray-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-red-50 transition-colors">
              <Heart size={32} className="text-gray-700 group-hover:text-red-500 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-500 transition-colors">
              Job Opportunities
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-snug">
              Offer/Apply for jobs through SIGA's portal. Find great talent fast.
              </p>
              <button className="text-sm px-4 py-1.5 bg-transparent border border-gray-200 text-gray-600 rounded-full group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all flex items-center mx-auto gap-1">
                View
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>




            <div 
           
              className="bg-white bg-gray-50 p-6 text-center group relative transition-all duration-200  "
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-red-50 transition-colors">
              <Users size={32} className="text-gray-700 group-hover:text-red-500 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-500 transition-colors">
              Latest News
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-snug">
              Stay updated with MSME news, events, GST & policy updates
              </p>
              <button className="text-sm px-4 py-1.5 bg-transparent border border-gray-200 text-gray-600 rounded-full group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all flex items-center mx-auto gap-1">
                View
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div 
             
              className="bg-white hover:bg-gray-50 p-6 text-center group relative transition-all duration-200  border-t border-r border-gray-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-red-50 transition-colors">
              <Mail size={32} className="text-gray-700 group-hover:text-red-500 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-500 transition-colors">
              Payment Mediation
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-snug">
              Resolve payment issues with our dedicated support system
              </p>
              <button className="text-sm px-4 py-1.5 bg-transparent border border-gray-200 text-gray-600 rounded-full group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all flex items-center mx-auto gap-1">
                View
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div 
            
              className="bg-white hover:bg-gray-50 p-6 text-center group relative transition-all duration-200  border-t border-gray-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-red-50 transition-colors">
              <Trophy size={32} className="text-gray-700 group-hover:text-red-500 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-500 transition-colors">
              Business Opportunities
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-snug">
              Propose or request business opportunities for expansion
              </p>
              <button className="text-sm px-4 py-1.5 bg-transparent border border-gray-200 text-gray-600 rounded-full group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all flex items-center mx-auto gap-1">
                View
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
        
        </div>
      </div>
    </div>
  );
};

export default Category;