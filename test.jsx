

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
