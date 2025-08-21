import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/hero-highlight";
import SectionWithMockup from "./SectionWithMockup";
import { EventFeatures } from "./EventFeatures";
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
      <br />
      exhibitors, and industry partners who joined us for the
      <br />
      30th edition of SIGA Garment Fair 2025. Your overwhelming
      <br />
      response and participation made this event a tremendous
      <br />
      success, strengthening the South India garment industry ecosystem.
    </>
  ),
};

const EventSection = () => {
  
 const reverseLayout = false
  const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const layoutClasses = reverseLayout
    ? "md:grid-cols-2 md:grid-flow-col-dense"
    : "md:grid-cols-2";

const textOrderClass = reverseLayout ? "md:col-start-2" : "";
const imageOrderClass = reverseLayout ? "md:col-start-1" : "";
  return (
   
    <div className="relative w-full py-24 bg-white overflow-hidden" >
  
      

      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
       <section className="relative bg-gradient-to-r from-green-50 via-transparent to-blue-50 py-10 md:py-12 overflow-hidden">
                  <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
                      <div
                          className={`grid grid-cols-1 gap-16 md:gap-8 w-full items-center ${layoutClasses}`}
                          // variants={containerVariants}
                          // initial="hidden"
                          // whileInView="visible"
                          // viewport={{ once: true, amount: 0.2 }}
                      >
                          {/* Text Content */}
                          <motion.div
                              className={`flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0 ${textOrderClass}`}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay:  0.1, duration: 0.5 }}
                              viewport={{ once: true }}
                          >
                              <div className="space-y-2 md:space-y-1">
                                  <h2 className="text-black text-3xl md:text-[40px] font-semibold leading-tight md:leading-[53px]">
                                      {exampleData1.title}
                                  </h2>
                              </div>
      
                              <p className="text-gray-800 text-sm md:text-[15px] leading-6">
                                  {exampleData1.description}
                              </p>
                              <div className="flex gap-4 mt-12">
                     
                      <motion.button
                                whileHover={{ backgroundColor: "#16a34a" }}
                                transition={{ duration: 0.3 }}
                                  size="lg"
                                  className="rounded-xl px-5 text-base relative overflow-hidden group bg-green-600 text-white"
                                >
                               
                                    <span className="relative z-10">
                                   
                                    VIEW EVENT GALLERY
                                   
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-green-500/40 to-green-400/30 opacity-100 transition-opacity duration-300 -skew-x-12" />
                               
                                </motion.button>
                      <motion.button 
                        className="px-8 py-3 border border-green-600 text-green-600 text-sm tracking-wider rounded-none"
                        whileHover={{ backgroundColor: "#f0fdf4" }}
                        transition={{ duration: 0.3 }}
                      >
                        DOWNLOAD REPORT
                      </motion.button>
                    </div>
      
                    <div className="mt-16">
                      <p className="text-xs tracking-widest text-gray-700 uppercase mb-4">Event Summary</p>
                      <div className="flex gap-8">
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="text-lg mt-1">March 15-17, 2025</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Venue</p>
                          <p className="text-lg mt-1">Bangalore International Expo</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="text-lg mt-1 text-green-600 font-semibold">Successfully Completed</p>
                        </div>
                      </div>
                    </div>
                              {/* Optional: Add a button or link here */}
                              {/* <div>
                                  <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md">Learn More</button>
                              </div> */}
                          </motion.div>
      
                          {/* App mockup/Image Content */}
                          <motion.div
                              className={`relative mt-10 md:mt-0 mx-auto ${imageOrderClass} w-full max-w-[300px] md:max-w-[471px]`}
                              variants={itemVariants}
                          >
                              {/* Decorative Background Element */}
                              <motion.div
                                  className={`absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-gradient-to-br from-green-600 to-blue-600 rounded-[32px] z-0`}
                                  style={{
                                      top: reverseLayout ? 'auto' : '10%',
                                      bottom: reverseLayout ? '10%' : 'auto',
                                      left: reverseLayout ? 'auto' : '-20%',
                                      right: reverseLayout ? '-20%' : 'auto',
                                      transform: reverseLayout ? 'translate(0, 0)' : 'translateY(10%)',
                                      filter: 'blur(2px)'
                                  }}
                                  initial={{ y: reverseLayout ? 0 : 0 }}
                                  whileInView={{ y: reverseLayout ? -20 : -30 }}
                                  transition={{ duration: 1.2, ease: "easeOut" }}
                                  viewport={{ once: true, amount: 0.5 }}
                              >
                                  <div
                                      className="relative w-full h-full bg-cover bg-center rounded-[32px]"
                                      style={{
                                          backgroundImage: `url(${exampleData1.secondaryImageSrc})`,
                                      }}
                                  />
                              </motion.div>
      
                              {/* Main Mockup Card */}
                              <motion.div
                                  className="relative w-full h-[405px] md:h-[637px] bg-[#ffffff0a] rounded-[32px] backdrop-blur-[15px] backdrop-brightness-[100%] border-0 z-10 overflow-hidden"
                                  initial={{ y: reverseLayout ? 0 : 0 }}
                                  whileInView={{ y: reverseLayout ? 20 : 30 }}
                                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                                  viewport={{ once: true, amount: 0.5 }}
                              >
                                  <div className="p-0 h-full">
                                      <div
                                          className="h-full relative"
                                          style={{
                                              backgroundSize: "100% 100%",
                                          }}
                                      >
                                          {/* Primary Image */}
                                          <div
                                              className="w-full h-full bg-cover bg-center"
                                              style={{
                                                  backgroundImage: `url(${exampleData1.primaryImageSrc})`,
                                              }}
                                          />
                                          {/* Success Overlay */}
                                          <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent flex items-end justify-center pb-8">
                                            <div className="text-center text-white">
                                              <div className="text-6xl mb-2">🎉</div>
                                              <p className="text-lg font-semibold">Event Completed Successfully</p>
                                            </div>
                                          </div>
                                      </div>
                                  </div>
                              </motion.div>
                          </motion.div>
                      </div>
      
      
                    
      
                      {/* Thank You Message Section */}
                      <motion.div
                        className="mt-20 text-center bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 md:p-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                          A Heartfelt Thank You to Our Community
                        </h3>
                        <p className="text-gray-600 text-lg max-w-4xl mx-auto mb-6">
                          The 30th SIGA Garment Fair 2025 has concluded with remarkable success, and we couldn't have done it without each and every one of you. To our exhibitors who showcased their finest collections, retailers who discovered new opportunities, visitors who brought energy to the venue, and partners who supported our vision - thank you for making this milestone event truly memorable.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                            #SIGA2025Success
                          </span>
                          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                            #ThankYou
                          </span>
                          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                            #30thEdition
                          </span>
                        </div>
                      </motion.div>
                  </div>
      
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


// -------------------------------------------
import React from "react";
import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/hero-highlight";

const EventSection = () => {
  return (
    <div className="relative w-full py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-white to-purple-50/30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="container w-full px-4 md:px-6 relative z-10 mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 mb-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Event Successfully Completed
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Thank You for Making
                <br />
                <Highlight className="text-black dark:text-white bg-yellow-200 dark:bg-yellow-600">
                  SIGA 2025 a Grand Success!
                </Highlight>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                We extend our heartfelt gratitude to all participants, exhibitors, and visitors 
                who joined us for the 30th edition of SIGA Garment Fair. Your presence and 
                active participation made this event an extraordinary success.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900">A Celebration of Garment Industry Excellence</h2>
                <p className="text-gray-600 leading-relaxed">
                  The 30th SIGA Garment Fair brought together the best of South India's garment industry, 
                  creating unparalleled networking opportunities and business connections that will drive 
                  the industry forward throughout the year.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We are already looking forward to next year's event and hope to see you again for 
                  another successful edition of South India's premier garment industry gathering.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-black text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow"
                  >
                    Save the Date for SIGA 2026
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Share Your Feedback
                  </motion.button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-video bg-gradient-to-br from-yellow-100 to-purple-100 rounded-2xl shadow-lg flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Event Successfully Completed</h3>
                    <p className="text-gray-600">March 15-17, 2025</p>
                    <p className="text-gray-600">Bangalore International Expo Center</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            
          </div>
        </section>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default EventSection;