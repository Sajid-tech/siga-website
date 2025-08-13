import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";





import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { TextEffect } from "@/components/ui/text-effect";

import BecomeMember from "@/components/becomeMember/BecomeMember";
import ImageMaskOne from "@/components/imageMask/ImageMaskOne";
import ImageMaskTwo from "@/components/imageMask/ImageMaskTwo";


const images = [
  {
    src: "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg",
    alt: "Image 1",
  },
  {
    src: "https://southindiagarmentsassociation.com/assets/images/brand/101.jpg",
    alt: "Image 2",
  },
  {
    src: "https://southindiagarmentsassociation.com/assets/images/brand/102.jpg",
    alt: "Image 3",
  },
];

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section className="relative">
          <div className="relative pt-24 md:pt-36">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />

            <BackgroundBeamsWithCollision>
              <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Content - takes 65% on large screens */}
                  <div className="lg:w-[60%] w-full">
                    <div className="text-center lg:text-left">
                 
                        <Link
                          href="#link"
                          className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto lg:mx-0 flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                        >
                          <span className="text-foreground text-sm">
                            Welcome to the 30th Siga Fair
                          </span>
                          <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                          <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                              <span className="flex size-6">
                                <ArrowRight className="m-auto size-3" />
                              </span>
                              <span className="flex size-6">
                                <ArrowRight className="m-auto size-3" />
                              </span>
                            </div>
                          </div>
                        </Link>

                        {/* <div
  as="h1"
  className="mt-8 max-w-4xl mx-auto lg:mx-0 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]"
  preset="slide"
  per="word"
  delay={0.5}
>
CELEBRATING 
30 YEARS 
OF SIGA’s LEGACY
</div> */}

<div className="mt-8 max-w-5xl mx-auto lg:mx-0 lg:mt-16 flex flex-col lg:flex-row items-center gap-6">
 

  {/* Right side - Three rows */}
  <div className="flex flex-col justify-center text-center lg:text-left order-1 lg:order-2">
    {/* Celebrating */}
    <TextEffect
      className=" text-6xl md:text-7xl  xl:text-[5.25rem] text-balance "
      preset="slide"
      per="word"
      delay={0.4}
    >
      Celebrating
    </TextEffect>

    {/* 30 Years */}
    <div className="flex items-center justify-center lg:justify-start mt-2">
      <TextEffect
        className="text-6xl md:text-8xl font-semibold leading-none bg-gradient-to-b from-red-400 to-indigo-500 bg-clip-text text-transparent"
        preset="slide"
        per="char"
        delay={0.6}
      >
        30
      </TextEffect>
     
      <TextEffect
        className="text-6xl md:text-7xl  xl:text-[5.25rem] ml-2"
        preset="slide"
        per="word"
        delay={0.7}
      >
        Years
      </TextEffect>
    </div>

    {/* of SIGA */}
    <TextEffect
      className="text-6xl md:text-7xl  xl:text-[5.25rem] mt-2 "
      preset="slide"
      per="word"
      delay={0.8}
    >
      of SIGA
    </TextEffect>
  </div>
</div>





                        <TextEffect
                          className="mx-auto lg:mx-0 mt-8 max-w-2xl text-balance text-lg"
                          preset="fade"
                          per="line"
                          delay={0.8}
                        >
                          In the history of modern astronomy, there is probably
                          no one greater leap forward than the building and
                          launch of the space telescope known as the Hubble.
                        </TextEffect>
                     

                      <div
                      
                        className="mt-12 flex flex-col   items-center lg:items-start  gap-2   md:flex-row"
                      >
                        <div
                          key={1}
                          className="bg-foreground/10  rounded-[14px] p-0.5"
                        >
                          {/* <Button
                            asChild
                            size="lg"
                            className="rounded-xl  px-5 text-base relative overflow-hidden group"
                          >
                            <Link href="#link">
                              <span className="relative z-10">
                                <TextEffect preset="scale" per="word">
                                  Become a Member
                                </TextEffect>
                              </span>
                              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-yellow-500/40 to-yellow-400/30 opacity-100 transition-opacity duration-300 -skew-x-12" />
                            </Link>
                          </Button> */}
                          <BecomeMember/>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*   takes 35% on large screens */}
                  <div className="lg:w-[40%]  relative w-full mt-12 lg:mt-0 p-8">



                  <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/90 to-indigo-50/20"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-indigo-300/25 blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/25 blur-[100px]"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)',
            backgroundSize: '60px 60px',
            animation: 'moveBackground 20s infinite alternate',
          }}
        ></div>
      </div>
      
                 
                
                     {/* <ImageMaskOne /> */}
      
         <ImageMaskTwo/>
       
                  </div>
                </div>
              </div>
            </BackgroundBeamsWithCollision>
          </div>
        </section>
     
      </main>
    </>
  );
}
