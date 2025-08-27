import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

export const CardCarousel = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
  className = "", 
}) => {
  return (
    <section className={`w-ace-y-4 ${className}`}>
      <div className="mx-auto p-2">
        <div className="relative mx-auto flex w-full flex-col">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
               
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                speed={800}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: false,
                }}
                pagination={showPagination ? { clickable: true } : false}
                navigation={
                  showNavigation
                    ? {
                        nextEl: `.${className} .swiper-button-next`,
                        prevEl: `.${className} .swiper-button-prev`,
                      }
                    : false
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                watchSlidesProgress={true}
                resistanceRatio={0.85}
                threshold={15}
                updateOnWindowResize={true}
                breakpoints={{
                  0: { spaceBetween: 10 },   
                  640: { spaceBetween: 50 }, 
                }}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full  rounded-lg">
                      <img
                        src={image.src}
                        width={500}
                        height={500}
                        className="size-full border border-indigo-900 shadow-xl backdrop-blur-2xl shadow-indigo-200 rounded-lg"
                        alt={image.alt}
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}