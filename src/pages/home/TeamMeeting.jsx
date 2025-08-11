import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const items = [
  {
    id: "1",
    title: "ANURAG SINGHLA",
    role: "President",
    image: "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
  },
  {
    id: "2",
    title: "ANURAG SINGHLA",
    role: "President",
    image: "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
  },
  {
    id: "3",
    title: "ANURAG SINGHLA",
    role: "President",
    image: "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
  },
  {
    id: "4",
    title: "ANURAG SINGHLA",
    role: "President",
    image: "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
  },
  {
    id: "5",
    title: "ANURAG SINGHLA",
    role: "President",
    image: "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
  },
  {
    id: "6",
    title: "ANURAG SINGHLA",
    role: "President",
    image: "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
  },

];

const TeamMeeting = () => {
  const [carouselApi, setCarouselApi] = useState();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <div className="w-full py-20 relative bg-white/90 overflow-hidden">

     <div 
  className="absolute inset-0 opacity-10"
  style={{
    backgroundImage: "url('https://southindiagarmentsassociation.com/assets/images/logo.png')",
    backgroundRepeat: 'repeat', 
    backgroundSize: '200px', 
  }}
/>
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-black">Leadership</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl">
            The driving force behind our organization's success
          </p>
        </div>

        <div className="relative">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
          >
            <CarouselContent className="ml-0 -mr-4">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="group relative h-[400px] w-full overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                        <div className="mt-1 flex items-center">
                          <span className="h-1 w-8 bg-red-400 mr-2"></span>
                          <span className="text-red-400 font-medium">{item.role}</span>
                        </div>
                      </div>
                    </div>
                    {/* Red overlay on hover */}
                    <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 -mx-8 z-20">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full bg-black/30 backdrop-blur hover:bg-black/50 size-12 text-white"
            >
              <ArrowLeft className="size-6" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full bg-black/30 backdrop-blur hover:bg-black/50 size-12 text-white"
            >
              <ArrowRight className="size-6" />
            </Button>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 w-6 rounded-full transition-all ${
                currentSlide === index ? "bg-red-400" : "bg-gray-600"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMeeting;