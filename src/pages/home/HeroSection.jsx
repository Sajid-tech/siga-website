import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
 
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://southindiagarmentsassociation.com/assets/images/banner/home_banner.jpg"
          alt="Events banner"
          className="w-full h-full object-cover object-center brightness-75"
          loading="eager"
        />
    
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </div>

     
      <div className="relative z-10 px-6 pt-20 text-center max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-indigo-100">
            THE MOST AWAITED
          </span>
          <br />
          <span className="text-white drop-shadow-lg">EVENTS OF 2025</span>
        </h1>


        <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-white/90 leading-relaxed font-medium">
          In the history of modern astronomy, there is probably no one greater
          leap forward than the building and launch of the space telescope
          known as the Hubble.
        </p>


        <button className="bg-white text-indigo-700 hover:bg-indigo-50 px-5 py-2 rounded-md font-semibold text-lg  transition-all duration-300 hover:shadow-2xl hover:scale-105">
          Contact Us
        </button>
      </div>

      {/* Simplified scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;