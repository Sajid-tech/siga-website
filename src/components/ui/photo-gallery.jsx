import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import FlipLink from "./text-effect-flipper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, FreeMode } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { TextEffect } from "./text-effect";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "@/config/BaseUrl";
import { useQuery } from "@tanstack/react-query";


const fetchEventGallery = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/getEventGallery`);
  return data;
};

const PhotoGallery = ({ animationDelay = 0.5 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const swiperRef = useRef(null);
  const navigate = useNavigate()
   const { data: galleryData, isLoading, isError } = useQuery({
    queryKey: ['eventGallery'],
    queryFn: fetchEventGallery,
    staleTime: 60 * 1000 * 5
  });

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);
    return () => clearTimeout(visibilityTimer);
  }, [animationDelay]);


  useEffect(() => {
    if (swiperRef.current?.el) {
      const swiperEl = swiperRef.current.el;
      const handleWheel = (e) => {
        e.preventDefault(); 
        swiperRef.current.mousewheel.on(e);
      };
      swiperEl.addEventListener("wheel", handleWheel, { passive: true });
      return () => {
        swiperEl.removeEventListener("wheel", handleWheel);
      };
    }
  }, [swiperInstance]);

   const photos = galleryData?.event_gallery?.map((src, index) => ({
    id: index + 1,
    zIndex: 20 + (index % 4) * 5, 
    direction: index % 2 === 0 ? "left" : "right", 
    src: src
  })) || [];

  // const photos = [
  //   { id: 1, zIndex: 20, direction: "left", src: "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg" },
  //   { id: 2, zIndex: 25, direction: "left", src: "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg" },
  //   { id: 3, zIndex: 30, direction: "right", src: "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg" },
  //   { id: 4, zIndex: 35, direction: "right", src: "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg" },
  //   { id: 5, zIndex: 20, direction: "left", src: "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg" },
  //   { id: 6, zIndex: 25, direction: "left", src: "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg" },
  //   { id: 7, zIndex: 30, direction: "right", src: "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg" },
  //   { id: 8, zIndex: 35, direction: "right", src: "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg" },
  // ];

  const handleMouseEnter = () => swiperInstance?.autoplay.stop();
  const handleMouseLeave = () => swiperInstance?.autoplay.start();

  return (
    <div className="w-full py-12">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 top-[150px] md:top-[100px] lg:top-[200px] z-10 h-[300px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)] pointer-events-none"></div>

          <p className="lg:text-md my-2 text-center text-xs font-light uppercase tracking-widest text-slate-600 dark:text-slate-400">
            A Journey Through Visual Stories
          </p>
          <h3 className="z-20 mx-auto max-w-2xl justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text py-3 text-center text-4xl text-transparent dark:bg-gradient-to-r dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 dark:bg-clip-text md:text-7xl">
          Glimpse of the 30ᵗʰ{" "}
            <span className="text-red-500">
              <FlipLink>SIGA FAIR</FlipLink>
            </span>
          </h3>

          {/* Swiper Gallery */}
          <div
            className="relative mb-2 h-[350px] w-full items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="relative mx-auto flex w-full justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
           {isLoading ? (
                          <div className="flex gap-6 w-max">
                            {[...Array(8)].map((_, index) => (
                              <div
                                key={index}
                                className="flex-shrink-0 w-[220px] h-[220px] rounded-3xl bg-gray-200 animate-pulse"
                              ></div>
                            ))}
                          </div>
                        ) : isError ? (
                          <div className="text-center text-gray-500 py-10">
                            Failed to load gallery images
                          </div>
                        ) : (
                          <Swiper
                            ref={swiperRef}
                            id="photo-gallery-swiper"
                            modules={[Autoplay, Mousewheel, FreeMode]}
                            spaceBetween={20}
                            slidesPerView={"auto"}
                            centeredSlides={true}
                            freeMode={{
                              enabled: true,
                              momentum: true,
                              momentumRatio: 0.7,
                              momentumVelocityRatio: 0.8,
                            }}
                            mousewheel={{
                              sensitivity: 0.8,
                              releaseOnEdges: true,
                              eventsTarget: 'container',
                            }}
                            autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                            }}
                            speed={800}
                            onSwiper={setSwiperInstance}
                            className="!py-10 w-full"
                          >
                            {photos.map((photo) => (
                              <SwiperSlide key={photo.id} className="!w-auto pointer-events-auto">
                                <Photo
                                  width={220}
                                  height='100%'
                                  src={photo.src}
                                  alt="Gallery photo"
                                  direction={photo.direction}
                                  zIndex={photo.zIndex}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        )}
            </motion.div>
          </div>

          <div className="flex w-full justify-center">
           
            <Button
              
              size="lg"
              className="rounded-xl mb-4 hover:cursor-pointer px-5 text-base relative overflow-hidden group"
            >
              <Link to={'/gallery'}>
          
                <span  className="relative z-10">
                  <TextEffect preset="scale" per="word">
                    View All Stories
                  </TextEffect>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-400/30 via-red-500/40 to-red-400/30 opacity-100 transition-opacity duration-300 -skew-x-12" />
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
  zIndex = 20,
  ...props
}) => {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const randomRotation = direction === "left" ? -2 : 2;
    setRotation(randomRotation);
  }, [direction]);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      animate={{ rotate: isHovered ? 0 : rotation }}
      transition={{ duration: 0.3 }}
      style={{
        width,
        height,
        zIndex: isHovered ? 40 : zIndex,
        pointerEvents: "auto",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-pointer transition-all duration-300 pointer-events-auto"
      )}
      draggable={false}
      tabIndex={0}
      {...props}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-lg">
        <LazyLoadImage
          src={src}
          alt={alt}
          className={cn("rounded-3xl object-cover w-full h-full pointer-events-none")}
          effect="blur"
        />
      </div>
    </motion.div>
  );
};

export default PhotoGallery;
