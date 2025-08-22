import React from 'react';
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Masonry from "react-masonry-css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BASE_URL from '@/config/BaseUrl';


const fetchGalleryData = async () => {
  const { data } = await axios.get(  `${BASE_URL}/api/getGallery`);
  return data;
};


const GallerySection = ({ className, items, ...props }) => {
  return (
    <section
      className={`py-16 w-full bg-gradient-to-b from-transparent via-muted/50 to-transparent ${className || ''}`}
      {...props}
    >
      <div className="container">
        <div className="w-full mx-auto space-y-12">
          {items.map((item, index) => (
            <GalleryItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
              galleryData={item.galleryData}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


const GalleryItem = ({ question, answer, index, galleryData }) => {
  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    1024: 2,
    640: 1,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group rounded-lg bg-gradient-to-br from-background via-muted/50 to-background  overflow-hidden"
    >

<div className="relative px-5 py-6 border rounded-xl border-border/20 overflow-hidden group bg-gradient-to-br from-background/80 to-muted/20">

  <div className="absolute inset-0 overflow-hidden  transition-opacity duration-300 pointer-events-none">
    <img 
      src="https://a-us.storyblok.com/f/1020544/500x500/fc53950a6e/blue-curl.gif" 
      className="absolute -right-5 -top-2 w-24 h-24 mix-blend-overlay" 
      alt=""
    />
    <img 
      src="https://a-us.storyblok.com/f/1019472/500x500/9353110b3c/yellow-star.gif" 
      className="absolute -left-5 -bottom-5 w-20 h-20 mix-blend-lighten" 
      alt=""
    />
    <img 
      src="https://a-us.storyblok.com/f/1020544/500x500/39ac930bc7/green-curl.gif" 
      className="absolute right-10 bottom-2 w-16 h-16 mix-blend-color-dodge opacity-70" 
      alt=""
    />
  </div>
  
  {/* Compact content layout */}
  <div className="relative z-10 flex items-start gap-3">
   
    
    <div>
      <h3 className="text-xl font-semibold text-foreground leading-tight mb-1">
        {question}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {answer}
      </p>
    </div>
  </div>
</div>
    
      {/* <div className="px-6 py-6 border rounded-lg border-border/20">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {question}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div> */}

      
      <div className="px-2 pb-6 pt-4 ">
        {galleryData && galleryData.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {galleryData.map((imageUrl, imgIndex) => (
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: imgIndex * 0.05 }}
                viewport={{ once: true }}
                className="mb-4 rounded-lg overflow-hidden group cursor-pointer"
              >
                <LazyLoadImage
                  src={imageUrl}
                  alt={`Gallery image ${imgIndex + 1}`}
                  effect="blur"
                  width="100%"
                  height="auto"
                  className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                  
                />
              </motion.div>
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No images available for this gallery</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const { data: galleryData, isLoading, isError } = useQuery({
    queryKey: ['galleryData'],
    queryFn: fetchGalleryData,
    staleTime: 60 * 1000 * 5
  });

  const Gallery_Data = [
    {
      question: "Autumn Winter 2024 - Princess Shrine",
      answer: "Gallery images from our Autumn Winter 2024 event at Princess Shrine",
      galleryData: galleryData?.gallery_autum_winter_2024_princess_shrine
    },
    {
      question: "Autumn Winter 2023 - Princess Shrine",
      answer: "Gallery images from our Autumn Winter 2023 event at Princess Shrine",
      galleryData: galleryData?.gallery_autum_winter_2023_princess_shrine
    },
    {
      question: "Autumn Winter 2022 - Princess Shrine",
      answer: "Gallery images from our Autumn Winter 2022 event at Princess Shrine",
      galleryData: galleryData?.gallery_autum_winter_2022_princess_shrine
    },
    {
      question: "Autumn Winter 2021 - Radisson Blu Atria",
      answer: "Gallery images from our Autumn Winter 2021 event at Radisson Blu Atria",
      galleryData: galleryData?.gallery_autum_winter_2021_radisson_blu_atria
    },
    {
      question: "Autumn Winter 2019 - Princess Shrine",
      answer: "Gallery images from our Autumn Winter 2019 event at Princess Shrine",
      galleryData: galleryData?.gallery_autum_winter_2019_princess_shrine
    },
    {
      question: "Autumn Winter 2018 - Fairfield Marriott",
      answer: "Gallery images from our Autumn Winter 2018 event at Fairfield Marriott",
      galleryData: galleryData?.gallery_autum_winter_2018_fairfield_marriott
    },
    {
      question: "Autumn Winter 2017 - Princess Shrine",
      answer: "Gallery images from our Autumn Winter 2017 event at Princess Shrine",
      galleryData: galleryData?.gallery_autum_winter_2017_princess_shrine
    },
  ];

  return (
    <div className="relative w-full pt-28 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div 
          className="text-center mb-16"
       
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SIGA <Highlight>Gallery</Highlight>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A visual journey through our events and exhibitions
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg  overflow-hidden">
                <div className="px-6 py-6 ">
                  <Skeleton height={24} width="60%" className="mb-2" />
                  <Skeleton height={16} width="80%" />
                </div>
                <div className="px-6 pb-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, j) => (
                      <Skeleton key={j} height={200} className="rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10">
            <p className="text-red-500">Failed to load gallery data. Please try again later.</p>
          </div>
        ) : (
          <GallerySection
            title="Event Galleries"
            description="Browse through our past events"
            items={Gallery_Data}
          />
        )}
      </div>
    </div>
  );
};

const Highlight = ({ children, className }) => {
  return (
    <span className={`relative inline-block font-semibold ${className}`}>
      <span className="relative z-10">{children}</span>
  
      <span className="absolute inset-0 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 rounded-lg px-2 py-1 -z-0 blur-sm"></span>
    </span>
  );
};


export default Gallery;