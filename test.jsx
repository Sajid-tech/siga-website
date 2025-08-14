// src/pages/home/HeroGallery.jsx
import React, { useState, useEffect, useRef } from 'react';
import { PhotoGallery } from '../../components/ui/photo-gallery';
import { ShuffleHero } from '../../components/ui/shuffle-grid';
import LoadingPlaceholder from '@/components/ui/loading-placeholder';


const HeroGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasLoaded]);

  return (
    <div ref={containerRef} className="w-full py-12">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        {isVisible ? (
          <>
            <PhotoGallery />
            <ShuffleHero />
          </>
        ) : (
          <LoadingPlaceholder className="h-[400px]" />
        )}
      </div>
    </div>
  );
};

export default React.memo(HeroGallery);


// hero section 

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
                  <div className="lg:w-[65%] w-full">
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

                        <TextEffect
  as="h1"
  className="mt-8 max-w-4xl mx-auto lg:mx-0 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]"
  preset="slide"
  per="word"
  delay={0.5}
>
  THE MOST 
AWAITED
  EVENTS OF 2025
</TextEffect>

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
                  <div className="lg:w-[35%]  relative w-full mt-12 lg:mt-0 p-8">



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



// ------------------------------------------------------------

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "../ui/text-effect";
import { Drawer } from "vaul";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BecomeMember = () => {
  const [membershipCategory, setMembershipCategory] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [step, setStep] = useState(1);

  const membershipData = {
    "life-patron": {
      title: "Life Patron Member",
      price: "₹20,000 + GST",
      description: "Lifetime membership with premium benefits",
      color: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    "ordinary": {
      title: "Ordinary Member",
      price: "₹2,000/year",
      description: "Annual membership with standard benefits",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    "associate": {
      title: "Associate Member",
      price: "₹2,000/year + GST",
      description: "Annual membership for associates",
      color: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  };

  const businessTypeColors = {
    "manufacturer": "bg-indigo-100 text-indigo-800",
    "distributor": "bg-blue-100 text-blue-800",
    "agent": "bg-emerald-100 text-emerald-800",
    "consultant": "bg-amber-100 text-amber-800",
    "promoter": "bg-purple-100 text-purple-800"
  };

  const handleCategorySelect = (value) => {
    setMembershipCategory(value);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setMembershipCategory("");
  };

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button
          size="lg"
          className="rounded-xl px-5 text-base relative overflow-hidden hover:cursor-pointer group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300"
        >
          <span className="relative z-10">
            <TextEffect preset="scale" per="word">
              Become a Member
            </TextEffect>
          </span>
        </Button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        
        <Drawer.Content className={`bg-white z-50  flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 ${
          membershipCategory ? membershipData[membershipCategory]?.borderColor : 'border-indigo-200'
        } border-t-4`}>
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300/80 mb-4 mt-4" />

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 sm:max-w-4xl mx-auto relative">
              {/* Background pattern */}
              <div className="absolute inset-0 overflow-hidden opacity-5 -z-10">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="currentColor"></circle>
                  </pattern>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
                </svg>
              </div>

              {step === 1 ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-3 text-gray-900">Choose Your Membership</h2>
                    <p className="text-gray-600">
                      Select the membership category that best fits your needs
                    </p>
                  </div>

                  <div className="space-y-4 max-w-2xl mx-auto">
                    <RadioGroup 
                      value={membershipCategory} 
                      onValueChange={handleCategorySelect}
                      className="space-y-4"
                    >
                      {Object.entries(membershipData).map(([key, value]) => (
                        <div 
                          key={key}
                          className={`flex items-start space-x-4 p-5 border rounded-xl transition-all hover:shadow-sm cursor-pointer ${
                            membershipCategory === key ? 
                            `${value.borderColor} ${value.color} ring-1 ring-inset ${value.borderColor.replace('border', 'ring')}` : 
                            "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <RadioGroupItem value={key} id={key} className="mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${membershipCategory === key ? `${value.color} ${value.textColor}` : "bg-gray-100 text-gray-600"}`}>
                                {value.icon}
                              </div>
                              <div>
                                <Label htmlFor={key} className="font-semibold text-lg text-gray-900">{value.title}</Label>
                                <p className={`text-sm ${membershipCategory === key ? value.textColor : "text-gray-600"}`}>
                                  {value.price}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-3 pl-11">
                              {value.description}
                            </p>
                            <div className="mt-4 flex items-center space-x-2 text-sm pl-11">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                membershipCategory === key ? 
                                `${value.color} ${value.textColor} border ${value.borderColor}` : 
                                "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}>
                                {key === "life-patron" ? "Premium Benefits" : 
                                 key === "ordinary" ? "Standard Benefits" : "Associate Benefits"}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                membershipCategory === key ? 
                                `${value.color} ${value.textColor} border ${value.borderColor}` : 
                                "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}>
                                {key === "life-patron" ? "Lifetime Access" : "Annual Renewal"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-3 text-gray-900">Complete Your Application</h2>
                      <div className={`inline-flex items-center px-4 py-2 rounded-lg ${membershipData[membershipCategory]?.color} ${membershipData[membershipCategory]?.textColor} border ${membershipData[membershipCategory]?.borderColor}`}>
                        {membershipData[membershipCategory]?.icon}
                        <span className="ml-2 font-medium">{membershipData[membershipCategory]?.title}</span>
                        <span className="ml-3 text-sm font-normal">• {membershipData[membershipCategory]?.price}</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleBack}
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Change
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-700">Company Name *</Label>
                        <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" />
                      </div>

                      <div>
                        <Label className="text-gray-700">GST No *</Label>
                        <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-700">Authorized Representative Name *</Label>
                        <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" />
                      </div>

                      <div>
                        <Label className="text-gray-700">Mobile No *</Label>
                        <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" type="tel" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-700">Email Id *</Label>
                        <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" type="email" />
                      </div>

                      <div>
                        <Label className="text-gray-700">Office Phone No</Label>
                        <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" type="tel" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-700">Address *</Label>
                      <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-700">Photo *</Label>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                          <Input 
                            type="file" 
                            className="flex-1 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" 
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-700">Logo</Label>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center border border-gray-300">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <Input 
                            type="file" 
                            className="flex-1 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" 
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <Label className="text-gray-700">Business Type *</Label>
                      <Tabs 
                        value={businessType} 
                        onValueChange={setBusinessType}
                        className="mt-3"
                      >
                        <TabsList className="w-full flex flex-wrap h-auto gap-2 p-1 bg-gray-100/50 rounded-lg">
                          {Object.entries({
                            "manufacturer": "Manufacturer",
                            "distributor": "Distributor",
                            "agent": "Agent",
                            "consultant": "Consultant",
                            "promoter": "Promoter"
                          }).map(([value, label]) => (
                            <TabsTrigger 
                              key={value}
                              value={value} 
                              className={`flex-1 min-w-[45%] sm:min-w-0 text-sm px-3 py-2 rounded-md transition-all ${
                                businessType === value ? 
                                `${businessTypeColors[value]} font-medium` : 
                                "text-gray-600 hover:text-gray-900 hover:bg-white"
                              }`}
                            >
                              {label}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>

                    <div>
                      <Label className="text-gray-700">Brands (if any)</Label>
                      <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <Separator className="my-6" />

                    <div className="flex items-center justify-end space-x-4">
                      <Drawer.Close asChild>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                        >
                          Cancel
                        </Button>
                      </Drawer.Close>
                      <Button 
                        type="submit" 
                        className={`relative overflow-hidden transition-all ${
                          membershipCategory === "life-patron" ? "bg-indigo-600 hover:bg-indigo-700" :
                          membershipCategory === "ordinary" ? "bg-blue-600 hover:bg-blue-700" :
                          "bg-emerald-600 hover:bg-emerald-700"
                        } text-white`}
                      >
                        <span className="relative z-10">Submit Application</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BecomeMember;



// ----------------------------------------------------------
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/hero-highlight";
import SectionWithMockup from "./SectionWithMockup";
import { EventFeatures } from "./EventFeatures";

const exampleData1 = {
  title: (
    <>
      Welcome to
      <br />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      > 
        <Highlight className="text-black dark:text-white">
          SIGA Garment Fair 2025!
        </Highlight>
      </motion.p>
    </>
  ),
  description: (
    <>
      Join South India's premier garment industry event hosted by
      <br />
      South India Garment Association (SIGA). For over a decade,
      <br />
      we've united manufacturers, distributors, agents, and retailers
      <br />
      across the region. Discover new business opportunities,
      <br />
      network with industry leaders, and explore the latest trends.
    </>
  ),
  primaryImageSrc:
    "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg",
  secondaryImageSrc:
    "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg",
};

const EventSection = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const rayCount = 24;
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  return (
    <div className="relative w-full py-24 bg-white overflow-hidden" ref={containerRef}>
  
      <svg 
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ width: '100vw', height: '100vh' }}
      >
        <defs>
          <filter id="blur40">
            <feGaussianBlur stdDeviation="40" />
          </filter>
          
          <linearGradient id="gradientSoft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0.12)" />
            <stop offset="50%" stopColor="rgba(192, 192, 192, 0.06)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          
          <linearGradient id="gradientSharp" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0.35)" />
            <stop offset="50%" stopColor="rgba(255, 107, 107, 0.25)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
        
        {/* Static rays */}
        {Array.from({ length: rayCount }).map((_, i) => {
          const rayAngle = (360 / rayCount) * i;
          return (
            <g key={i} transform={`translate(${centerX}, ${centerY}) rotate(${rayAngle})`}>
              <path
                d={`M0,0 L${dimensions.width},200 L${dimensions.width},-200 Z`}
                fill="url(#gradientSoft)"
                filter="url(#blur40)"
              />
              <path
                d={`M0,0 L${dimensions.width},80 L${dimensions.width},-80 Z`}
                fill="url(#gradientSharp)"
              />
            </g>
          );
        })}
      </svg>

      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWithMockup
          title={exampleData1.title}
          description={exampleData1.description}
          primaryImageSrc={exampleData1.primaryImageSrc}
          secondaryImageSrc={exampleData1.secondaryImageSrc}
        />
        <EventFeatures />
      </div>
    </div>
  );
};

export default EventSection;