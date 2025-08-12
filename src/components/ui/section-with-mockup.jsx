
import React from "react";
import { motion } from "framer-motion";
const EventHighlights = () => {
  const highlights = [
    { title: "30+ Years", description: "Of industry leadership" },
    { title: "500+ Brands", description: "Exhibiting their collections" },
    { title: "20+ State", description: "State participation" },
    { title: "B2B Sessions", description: "Dedicated networking" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
      {highlights.map((item, index) => (
        <motion.div
          key={index}
          className="p-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-light tracking-tight">{item.title}</h3>
          <p className="text-gray-500 mt-1 text-sm">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
const SectionWithMockup = ({
    title,
    description,
    primaryImageSrc,
    secondaryImageSrc,
    reverseLayout = false,
}) => {

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
        <section className="relative bg-zinc-50 py-10 md:py-12 overflow-hidden">
            <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
                <motion.div
                    className={`grid grid-cols-1 gap-16 md:gap-8 w-full items-center ${layoutClasses}`}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Text Content */}
                    <motion.div
                        className={`flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0 ${textOrderClass}`}
                        variants={itemVariants}
                    >
                        <div className="space-y-2 md:space-y-1">
                            <h2 className="text-black text-3xl md:text-[40px] font-semibold leading-tight md:leading-[53px]">
                                {title}
                            </h2>
                        </div>

                        <p className="text-[#868f97] text-sm md:text-[15px] leading-6">
                            {description}
                        </p>
                        <div className="flex gap-4 mt-12">
               
                <motion.button
                          whileHover={{ backgroundColor: "#333" }}
                          transition={{ duration: 0.3 }}
                            size="lg"
                            className="rounded-xl  px-5 text-base relative overflow-hidden group"
                          >
                         
                              <span className="relative z-10">
                             
                              REGISTER NOW
                             
                              </span>
                              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-yellow-500/40 to-yellow-400/30 opacity-100 transition-opacity duration-300 -skew-x-12" />
                         
                          </motion.button>
                <motion.button 
                  className="px-8 py-3 border border-black text-black text-sm tracking-wider rounded-none"
                  whileHover={{ backgroundColor: "#f5f5f5" }}
                  transition={{ duration: 0.3 }}
                >
                  VIEW SCHEDULE
                </motion.button>
              </div>

              <div className="mt-16">
                <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Event Details</p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-lg mt-1">March 15-17, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg mt-1">Bangalore International Expo</p>
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
                            className={`absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-[#090909] rounded-[32px] z-0`}
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
                                    backgroundImage: `url(${secondaryImageSrc})`,
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
                                            backgroundImage: `url(${primaryImageSrc})`,
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>


                <EventHighlights />
            </div>

            {/* Decorative bottom gradient */}
            <div
                className="absolute w-full h-px bottom-0 left-0 z-0"
                style={{
                    background:
                        "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
                }}
            />
        </section>
    );
};

export default SectionWithMockup;
