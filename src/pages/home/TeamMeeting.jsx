import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FlipLink from "@/components/ui/text-effect-flipper";
import { useQuery } from '@tanstack/react-query';
import BASE_URL from '@/config/BaseUrl';

const fetchCommitteeByYear = async (year) => {
  const response = await fetch(`${BASE_URL}/api/getCommitteeByYear/${year}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const TeamMeeting = () => {
  const [carouselApi, setCarouselApi] = useState();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['committeeData', '2024-26'],
    queryFn: () => fetchCommitteeByYear('2024-26'),
  });

  const items = data?.office_berres?.map((member, index) => ({
    id: (index + 1).toString(),
    title: member.name,
    role: member.designation,
    image: `${data.image_url}${member.image}`,
  })) || [];

  const handleSelect = () => {
    if (!carouselApi) return;
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
    setCurrentSlide(carouselApi.selectedScrollSnap());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  return (
    <div className="w-full pt-10 relative bg-white/90 overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
            Our <span className="text-red-500">
              <FlipLink>Leadership</FlipLink>
            </span>
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
              slidesToScroll: 1,
              breakpoints: {
                "(min-width: 1536px)": {
                  slidesToScroll: 1,
                },
                "(min-width: 1280px)": {
                  slidesToScroll: 1,
                },
                "(min-width: 1024px)": {
                  slidesToScroll: 1,
                },
                "(min-width: 768px)": {
                  slidesToScroll: 1,
                },
                "(max-width: 767px)": {
                  slidesToScroll: 1,
                  dragFree: true,
                },
              },
            }}
            className="w-full"
            onSelect={handleSelect}
          >
            <CarouselContent className="ml-0 -mr-2">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pr-2 basis-[85%] sm:basis-1/2 md:basis-1/2 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
                >
                  <div className="group relative h-[400px] w-full overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] shadow-lg hover:shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="relative z-10">
                        <h3 className="text-lg lg:text-xl font-bold tracking-tight leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex items-center">
                          <span className="text-red-400 font-medium text-sm lg:text-base">
                            {item.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Buttons - Only show if there are more items to scroll */}
          <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 -mx-8 z-20 pointer-events-none">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 size-12 text-white border border-white/20 transition-all duration-300 pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="size-6" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 size-12 text-white border border-white/20 transition-all duration-300 pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowRight className="size-6" />
            </Button>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <Button
              size="sm"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 border border-gray-200 disabled:opacity-50"
            >
              <ArrowLeft className="size-4 mr-1" />
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 border border-gray-200 disabled:opacity-50"
            >
              Next
              <ArrowRight className="size-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-red-500 scale-125"
                  : "bg-gray-400 hover:bg-gray-500"
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
