import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/hero-highlight";
import SectionWithMockup from "./SectionWithMockup";
import { EventFeatures } from "./EventFeatures";

const exampleData1 = {
  title: (
    <>
      Welcome to
      <br />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      > 
        <Highlight className="text-black dark:text-white">
          SIGA Garment Fair 2025!
        </Highlight>
      </motion.p>
    </>
  ),
  description: (
    <>
      Join South India's premier garment industry event hosted by
      <br />
      South India Garment Association (SIGA). For over a decade,
      <br />
      we've united manufacturers, distributors, agents, and retailers
      <br />
      across the region. Discover new business opportunities,
      <br />
      network with industry leaders, and explore the latest trends.
    </>
  ),
  primaryImageSrc:
    "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg",
  secondaryImageSrc:
    "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg",
};

const FireworkParticle = ({ color, angle, delay, centerX, centerY }) => {
  const speed = 2 + Math.random() * 3;
  const endX = centerX + Math.cos(angle) * speed * 50;
  const endY = centerY + Math.sin(angle) * speed * 50;
  
  return (
    <motion.circle
      cx={centerX}
      cy={centerY}
      r={2}
      fill={color}
      initial={{ 
        opacity: 1,
        cx: centerX,
        cy: centerY
      }}
      animate={{
        opacity: 0,
        cx: endX,
        cy: endY
      }}
      transition={{
        duration: 2,
        delay: delay * 0.02,
        ease: "easeOut"
      }}
    />
  );
};

const Firework = ({ x, y, id }) => {
  const colorPalette = ["#FFD700", "#C0C0C0", "#FF6B6B", "#FFFFFF"];
  const particleCount = 30;
  
  return (
    <g key={id}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / particleCount;
        return (
          <FireworkParticle
            key={i}
            color={colorPalette[Math.floor(Math.random() * colorPalette.length)]}
            angle={angle}
            delay={i}
            centerX={x}
            centerY={y}
          />
        );
      })}
    </g>
  );
};

const EventSection = () => {
  // const [fireworks, setFireworks] = useState([]);
  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // const containerRef = useRef(null);

  // useEffect(() => {
  //   const updateDimensions = () => {
  //     setDimensions({
  //       width: window.innerWidth,
  //       height: window.innerHeight
  //     });
  //   };

  //   updateDimensions();
  //   window.addEventListener('resize', updateDimensions);
  //   return () => window.removeEventListener('resize', updateDimensions);
  // }, []);

  // useEffect(() => {
  //   const fireworkInterval = setInterval(() => {
  //     if (dimensions.width > 0) {
  //       const newFirework = {
  //         id: Date.now(),
  //         x: Math.random() * dimensions.width,
  //         y: Math.random() * (dimensions.height * 0.5)
  //       };
        
  //       setFireworks(prev => [
  //         ...prev.slice(-4), 
  //         newFirework
  //       ]);
  //     }
  //   }, 2500);

  //   return () => clearInterval(fireworkInterval);
  // }, [dimensions]);

  // const rayCount = 24;
  // const centerX = dimensions.width / 2;
  // const centerY = dimensions.height / 2;

  return (
    // ref={containerRef}
    <div className="relative w-full py-24 bg-white overflow-hidden" >
  
      {/* <svg 
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ width: '100vw', height: '100vh' }}
      >
        <defs>
          <filter id="blur40">
            <feGaussianBlur stdDeviation="40" />
          </filter>
          
          <linearGradient id="gradientSoft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0.12)" />
            <stop offset="50%" stopColor="rgba(192, 192, 192, 0.06)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          
          <linearGradient id="gradientSharp" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0.35)" />
            <stop offset="50%" stopColor="rgba(255, 107, 107, 0.25)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
        
    
        {Array.from({ length: rayCount }).map((_, i) => {
          const rayAngle = (360 / rayCount) * i;
          return (
            <g key={i} transform={`translate(${centerX}, ${centerY}) rotate(${rayAngle})`}>
              <path
                d={`M0,0 L${dimensions.width},200 L${dimensions.width},-200 Z`}
                fill="url(#gradientSoft)"
                filter="url(#blur40)"
              />
              <path
                d={`M0,0 L${dimensions.width},80 L${dimensions.width},-80 Z`}
                fill="url(#gradientSharp)"
              />
            </g>
          );
        })}
        
        {fireworks.map(fw => (
          <Firework key={fw.id} x={fw.x} y={fw.y} id={fw.id} />
        ))}
      </svg> */}

      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWithMockup
          title={exampleData1.title}
          description={exampleData1.description}
          primaryImageSrc={exampleData1.primaryImageSrc}
          secondaryImageSrc={exampleData1.secondaryImageSrc}
        />
        <EventFeatures />
      </div>
    </div>
  );
};

export default EventSection;