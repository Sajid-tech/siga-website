import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/effect-cards"
import { EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

export const CardSwipe = ({
  images,
  autoplayDelay = 1500,
  slideShadows = false,
}) => {
  const css = `
    .card-swipe .swiper {
      width: 100%;
      max-width: 400px;
      height: 500px;
      padding-bottom: 50px;
      margin: 0 auto;
    }
    
    .card-swipe .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
    }
    
    .card-swipe .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    @media (max-width: 768px) {
      .card-swipe .swiper {
        height: 400px;
        max-width: 300px;
      }
    }
    
    @media (max-width: 480px) {
      .card-swipe .swiper {
        height: 300px;
        max-width: 250px;
      }
    }
  `
  
  return (
    <section className="card-swipe w-ace-y-4">
      <style>{css}</style>
      <div className="flex w-full items-center justify-center">
        <div className="w-full">
          <Swiper
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
            }}
            effect="cards"
            grabCursor={true}
            loop={true}
            slidesPerView="auto"
            rewind={true}
            cardsEffect={{
              slideShadows: slideShadows,
            }}
            modules={[EffectCards, Autoplay, Pagination, Navigation]}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="size-full rounded-3xl">
                  <img
                    src={image.src}
                    className="size-full rounded-xl object-cover"
                    alt={image.alt}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
