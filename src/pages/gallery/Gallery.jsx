// Gallery.jsx
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Masonry from "react-masonry-css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from '@/config/BaseUrl';

const fetchGalleryData = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/getGallery`);
  return data;
};

const GallerySection = ({ className, items, imageUrl, onViewAll, ...props }) => {
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
              imageUrl={imageUrl}
              onViewAll={() => onViewAll(item)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({ question, answer, index, galleryData, imageUrl }) => {
  const navigate = useNavigate();

  const breakpointColumnsObj = {
    default: 5,
    1280: 3,
    1024: 2,
    640: 1,
  };

  const handleViewFullGallery = () => {
    if (galleryData && galleryData.length > 0) {
   
      const year = galleryData[0]?.gallery_event_year;
  
    
      const yearImages = galleryData.filter(
        (img) => img.gallery_event_year === year
      );
  
     
      navigate(`/galleryAll/${year}`, {
        state: {
          year,
          images: yearImages,
          galleryItem: { question, answer }
        }
      });
    }
  };
  
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group rounded-lg bg-gradient-to-br from-background via-muted/50 to-background overflow-hidden"
    >
      <div className="relative px-5 py-6 border rounded-xl border-border/20 overflow-hidden group bg-gradient-to-br from-background/80 to-muted/20">
        <div className="relative z-10 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-foreground leading-tight mb-1">
              {question}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {answer}
            </p>
          </div>
          {galleryData && galleryData.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewFullGallery}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              View All
            </motion.button>
          )}
        </div>
      </div>

      {/* Images */}
      <div className="px-2 pb-6 pt-4">
        {galleryData && galleryData.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {galleryData.map((imgObj, imgIndex) => (
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: imgIndex * 0.05 }}
                viewport={{ once: true }}
                className="mb-4 rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/galleryAll/${imgObj.gallery_event_year}`)}
              >
                <LazyLoadImage
                  src={`${imageUrl}${imgObj.gallery_folder}/${imgObj.gallery_image}`}
                  alt={`Gallery ${imgObj.gallery_event_year} - ${imgIndex + 1}`}
                  effect="blur"
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
  const navigate = useNavigate();
  const { data: galleryData, isLoading, isError } = useQuery({
    queryKey: ['galleryData'],
    queryFn: fetchGalleryData,
    staleTime: 60 * 1000 * 5
  });




 

  const Gallery_Data = [
    {
      question: "Autumn Winter 2025 - Princess Shrine",
      answer: "Gallery images from our Autumn Winter 2025 event at Princess Shrine",
      galleryData: galleryData?.gallery_autum_winter_2025_princess_shrine
    },
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
        <div className="text-center mb-16">
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
              <div key={i} className="rounded-lg overflow-hidden">
                <div className="px-6 py-6">
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
            items={Gallery_Data}
            imageUrl={galleryData?.image_url}
          
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
