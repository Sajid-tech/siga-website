import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/hero-highlight";
import PhotoGallery from "@/components/ui/photo-gallery";

const exampleData1 = {
  title: (
    <>
      Thank You for Making
      <br />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      > 
        <Highlight className="text-black dark:text-white">
          SIGA Garment Fair 2025 a Grand Success!
        </Highlight>
      </motion.p>
    </>
  ),
  description: (
    <>
      We extend our heartfelt gratitude to all retailers, visitors,
   
      exhibitors, and industry partners who joined us for the
   
      30th edition of SIGA Garment Fair 2025. Your overwhelming
   
      response and participation made this event a tremendous
     
      success, strengthening the South India garment industry ecosystem.
    </>
  ),
};

const EventSection = () => {
  return (
    <div className="relative w-full mt-24 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[85rem] mx-auto ">
        <section className="relative bg-gradient-to-r from-green-50 via-transparent to-blue-50 py-10 md:py-12 overflow-hidden">
          <div className="  w-full px-2 md:px-6 relative z-10 mx-auto">
            
        
            <motion.div
              className="flex flex-col items-center text-center gap-4 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2 md:space-y-1">
                <h2 className="text-black text-3xl md:text-[40px] font-semibold leading-tight md:leading-[53px]">
                  {exampleData1.title}
                </h2>
              </div>

              <p className="text-gray-800 text-sm md:text-[15px] leading-6 mt-6">
                {exampleData1.description}
              </p>
            </motion.div>


            <motion.div
              className=" text-center mt-5 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4">
                A Heartfelt Thank You to Our Community
              </h3>
              <p className="text-gray-600 text-sm md:text-lg   max-w-4xl mx-auto mb-6">
                The 30th SIGA Garment Fair 2025 has concluded with remarkable success, and we couldn't have done it without each and every one of you. To our exhibitors who showcased their finest collections, retailers who discovered new opportunities, visitors who brought energy to the venue, and partners who supported our vision - thank you for making this milestone event truly memorable.
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-8">
  <span className="px-2 py-2 bg-white rounded-md text-xs md:text-sm font-medium text-gray-700 shadow-sm">
    #SIGA2025Success
  </span>
  <span className="px-2 py-2 bg-white rounded-md text-xs md:text-sm font-medium text-gray-700 shadow-sm">
    #ThankYou
  </span>
  <span className="px-2 py-2 bg-white rounded-md text-xs md:text-sm font-medium text-gray-700 shadow-sm">
    #30thEdition
  </span>
</div>

            </motion.div>
            
          </div>
          <PhotoGallery/>
          {/* Decorative bottom gradient */}
          <div
            className="absolute w-full h-px bottom-0 left-0 z-0"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(34,197,94,0.24) 0%, rgba(34,197,94,0) 100%)",
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default EventSection;