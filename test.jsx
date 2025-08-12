

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-[85rem] mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-primary font-medium">
        South India Garment Association (SIGA)
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold text-foreground">
        Driving Growth in the Garment Industry
        </h3>
        <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6">
        For over a decade, SIGA has been a uniting platform for manufacturers,
  distributors, agents, and retailers across South India. From representing
  industry interests to organizing annual garment fairs, we work to uplift the
  garment trade, connect businesses, and foster growth throughout the region.
        </p>
        <button
          className={cn(
            "bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md",
            "transition-all hover:bg-primary/90 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
  Explore SIGA Fair
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  { id: 1, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 2, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 3, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 4, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 5, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 6, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 7, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 8, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 9, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 10, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 11, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 12, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 13, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 14, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 15, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },
  { id: 16, src: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG" },

];

const generateSquares = () => {
  return shuffle([...squareData]).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 0.8, type: "spring" }}
      className="w-full h-full rounded-md overflow-hidden bg-muted"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const [squares, setSquares] = useState(generateSquares());

  const handleShuffle = () => {
    setSquares(generateSquares());
  };

  return (
    <div
      className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1"
      onMouseEnter={handleShuffle} 
    >
      {squares}
    </div>
  );
};


import React, { useEffect, useRef } from 'react';

const VerticalCelebrationText = () => {
  const text = "CELEBRATING 30 YEARS OF SIGA";
  const containerRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lettersRef.current.forEach((letter, index) => {
            if (letter) {
              setTimeout(() => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0)';
              }, index * 50);
            }
          });
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed min-h-screen left-0 top-1/2 transform -translate-y-1/2 z-50 bg-black px-1 py-8"
    >
      <div className="flex flex-col items-center space-y-1">
        {text.split('').map((char, index) => (
          <span 
            key={index}
            ref={el => lettersRef.current[index] = el}
            className={`
              text-sm font-medium tracking-wide transition-all duration-500
              ${char === ' ' ? 'text-transparent h-2' : 'text-yellow-400  hover:text-yellow-300'}
            `}
            style={{
              opacity: 0,
              transform: 'translateY(10px)',
              willChange: 'transform, opacity'
            }}
          >
            {char === ' ' ? '' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default VerticalCelebrationText;


import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { url: 'https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG' },
  { url: 'https://southindiagarmentsassociation.com/assets/images/banner/about.jpg' },

];

const FLIP_SPEED = 750;
const flipTiming = { duration: FLIP_SPEED, iterations: 1 };

// flip down
const flipAnimationTop = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' }
];
const flipAnimationBottom = [
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(0)' }
];

// flip up
const flipAnimationTopReverse = [
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(0)' }
];
const flipAnimationBottomReverse = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' }
];

export default function FlipGallery() {
  const containerRef = useRef(null);
  const uniteRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    uniteRef.current = containerRef.current.querySelectorAll('.unite');
    defineFirstImg();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(1); 
    }, 5000); 
  
    return () => clearInterval(interval); 
  }, [currentIndex]);
  const defineFirstImg = () => {
    uniteRef.current.forEach(setActiveImage);
  };

  const setActiveImage = (el) => {
    el.style.backgroundImage = `url('${images[currentIndex].url}')`;
  };

  const updateGallery = (nextIndex, isReverse = false) => {
    const gallery = containerRef.current;
    if (!gallery) return;

    const topAnim = isReverse ? flipAnimationTopReverse : flipAnimationTop;
    const bottomAnim = isReverse
      ? flipAnimationBottomReverse
      : flipAnimationBottom;

    gallery.querySelector('.overlay-top').animate(topAnim, flipTiming);
    gallery.querySelector('.overlay-bottom').animate(bottomAnim, flipTiming);

    uniteRef.current.forEach((el, idx) => {
      const delay =
        (isReverse && (idx !== 1 && idx !== 2)) ||
        (!isReverse && (idx === 1 || idx === 2))
          ? FLIP_SPEED - 200
          : 0;

      setTimeout(() => setActiveImage(el), delay);
    });
  };

  const updateIndex = (increment) => {
    const inc = Number(increment);
    const newIndex = (currentIndex + inc + images.length) % images.length;
    const isReverse = inc < 0;
    setCurrentIndex(newIndex);
    updateGallery(newIndex, isReverse);
  };

  return (
    <div className="flex items-center  justify-center font-sans">
      <div
        className="relative bg-black/10 border border-white/25 p-2"
        style={{ '--gallery-bg-color': 'rgba(255 255 255 / 0.075)' }}
      >
        {/* flip gallery */}
        <div
          id="flip-gallery"
          ref={containerRef}
          className="relative w-[240px] h-[400px] md:w-[300px] md:h-[500px] text-center"
          style={{ perspective: '700px' }}
        >
          <div className="top unite bg-cover bg-no-repeat"></div>
          <div className="bottom unite bg-cover bg-no-repeat"></div>
          <div className="overlay-top unite bg-cover bg-no-repeat"></div>
          <div className="overlay-bottom unite bg-cover bg-no-repeat"></div>
        </div>

        {/* navigation */}
        <div className="absolute top-full right-0 -mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => updateIndex(-1)}
            title="Previous"
            className="text-black opacity-75 hover:opacity-100 hover:scale-125 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => updateIndex(1)}
            title="Next"
            className="text-back opacity-75 hover:opacity-100 hover:scale-125 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        #flip-gallery::after {
          content: '';
          position: absolute;
          background-color: red;
          width: 100%;
          height: 1px;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }

        #flip-gallery > * {
          position: absolute;
          width: 100%;
          height: 50%;
          overflow: hidden;
          background-size: 240px 400px;
        }

        @media (min-width: 600px) {
          #flip-gallery > * {
            background-size: 300px 500px;
          }
        }

        .top,
        .overlay-top {
          top: 0;
          transform-origin: bottom;
          background-position: top;
        }

        .bottom,
        .overlay-bottom {
          bottom: 0;
          transform-origin: top;
          background-position: bottom;
        }
      `}</style>
    </div>
  );
}
