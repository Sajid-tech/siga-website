import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BASE_URL from "@/config/BaseUrl";
import { ArrowLeft, ArrowRight } from "lucide-react";

const fetchGalleryByYear = async (year) => {
  const { data } = await axios.get(`${BASE_URL}/api/getGalleryByYear/${year}`);
  return data;
};

const GalleryAllByYear = () => {
  const { id: initialYear } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // All years for navigation (static or dynamic)
  const years = [
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2019",
    "2018",
    "2017",
  ];

  // Find current index in years array
  const currentIndex = years.indexOf(initialYear);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  // Check if previous/next years exist
  const hasPrevious = currentIndex < years.length - 1;
  const hasNext = currentIndex > 0;

  const galleryItem = location.state?.galleryItem || {};

  const {
    data: galleryData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["galleryByYear", selectedYear],
    queryFn: () => fetchGalleryByYear(selectedYear),
    staleTime: 60 * 1000 * 5,
    keepPreviousData: true,
  });

  const breakpointColumnsObj = {
    default: 5,
    1280: 3,
    1024: 2,
    640: 1,
  };

  const navigateToYear = (direction) => {
    const currentIndex = years.indexOf(selectedYear);
    let newIndex;

    if (direction === "next" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === "prev" && currentIndex < years.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      return; // Cannot navigate further
    }

    const newYear = years[newIndex];
    setSelectedYear(newYear);
    navigate(`/galleryAll/${newYear}`);
  };

  return (
    <div className="relative w-full pt-28 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SIGA <Highlight>Gallery {selectedYear}</Highlight>
          </h1>

          {galleryItem.question && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground leading-tight mb-1">
                {galleryItem.question}
              </h3>
              <p className="text-sm text-muted-foreground">
                {galleryItem.answer}
              </p>
            </div>
          )}

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A visual journey through our {selectedYear} events and exhibitions
          </p>


          <div className="flex justify-between items-center gap-6 mb-6">
   
            <motion.button
              whileHover={{ scale: hasNext ? 1.05 : 1 }}
              whileTap={{ scale: hasNext ? 0.95 : 1 }}
              onClick={() => navigateToYear("next")}
              disabled={!hasNext}
              className={`relative overflow-hidden rounded-xl px-5 py-2 text-base flex items-center gap-2 group transition-transform ${
                hasNext
                  ? "text-blue-800 hover:scale-105"
                  : "text-gray-500 bg-gray-200 cursor-not-allowed"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <ArrowLeft size={18} />
                {hasNext ? years[years.indexOf(selectedYear) - 1] : "No Newer"}
              </span>
              {hasNext && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-200/80 via-blue-300/80 to-blue-200 opacity-100 transition-opacity duration-300 -skew-x-12" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: hasPrevious ? 1.05 : 1 }}
              whileTap={{ scale: hasPrevious ? 0.95 : 1 }}
              onClick={() => navigateToYear("prev")}
              disabled={!hasPrevious}
              className={`relative overflow-hidden rounded-xl px-5 py-2 text-base flex items-center gap-2 group transition-transform ${
                hasPrevious
                  ? "text-blue-800 hover:scale-105"
                  : "text-gray-500 bg-gray-200 cursor-not-allowed"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {hasPrevious
                  ? years[years.indexOf(selectedYear) + 1]
                  : "No Older"}
                <ArrowRight size={18} />
              </span>
              {hasPrevious && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-200/80 via-blue-300/80 to-blue-200 opacity-100 transition-opacity duration-300 -skew-x-12" />
              )}
            </motion.button>
          </div>
        </div>

      
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} height={200} className="rounded-lg" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10">
            <p className="text-red-500">
              Failed to load gallery for {selectedYear}. Please try again later.
            </p>
          </div>
        ) : galleryData?.data && galleryData.data.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {galleryData.data.map((imgObj, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="mb-4 rounded-lg overflow-hidden group cursor-pointer"
              >
                <LazyLoadImage
                  src={`${galleryData.image_url}${imgObj.gallery_folder}/${imgObj.gallery_image}`}
                  alt={`Gallery ${selectedYear} - ${index + 1}`}
                  effect="blur"
                  className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                />
              </motion.div>
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No images available for {selectedYear} gallery
            </p>
          </div>
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

export default GalleryAllByYear;
