import React from "react";
import {
  Users,
  Calendar,
  Award,
  Building2,
  Handshake,
  ShoppingBag,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
} from "lucide-react";

export default function HomeAbout() {
  const services = [
    {
      icon: <Users className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Our Members",
      description:
        "SIGA represents a diverse community of manufacturers, distributors, agents, and retail traders in the garment industry across South India.",
      position: "left",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Infrastructure",
      description:
        "We help small manufacturers upgrade their infrastructure with support from industry departments to compete in the global market.",
      position: "left",
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Government Relations",
      description:
        "Acting as a catalyst, we interact with government on policies, taxes, and regulations affecting the garment trade and industry.",
      position: "left",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Trade Fairs",
      description:
        "Our annual garment fair connects manufacturers with agents, franchisees, distributors and retailers under one roof.",
      position: "right",
    },
    {
      icon: <Award className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Market Growth",
      description:
        "Since inception in Bangalore, SIGA has established the region as a focal point for garment industry growth.",
      position: "right",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Longstanding",
      description:
        "With over a decade of service, SIGA has consistently provided a platform for all stakeholders in the garment industry.",
      position: "right",
    },
  ];

  return (
    <section
      id="about-section"
      className="w-full  py-24 px-4 bg-gradient-to-bl from-blue-50 via-transparent to-red-50 text-gray-800 relative"
    >
      <div className="container mx-auto  max-w-6xl relative z-10">
        <div className="flex flex-col items-center mb-6">
          <span className="text-blue-500 font-medium mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" /> ABOUT OUR ASSOCIATION
          </span>
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-center">
            Welcome to <span className="text-blue-500">SIGA</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500"></div>
        </div>

        <p className="text-center max-w-2xl mx-auto mb-16 text-gray-600">
          South India Garment Association (SIGA) was formed more than 3 decade ago to create a platform for manufacturers,
          distributors, agents and retail traders in the garment industry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem key={index} {...service} />
              ))}
          </div>

          {/* <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <div className="relative w-full max-w-xs rounded-md overflow-hidden shadow-xl">
              <img
                src="https://southindiagarmentsassociation.com/assets/images/banner/about.jpg"
                alt="Market interior with customers"
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}

          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem key={index} {...service} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ icon, secondaryIcon, title, description }) {
  return (
    <div className="flex flex-col group">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-blue-500 bg-blue-100 p-3 rounded-lg relative transition-colors duration-300 group-hover:bg-blue-200 group-hover:rotate-6">
          {icon}
          {secondaryIcon}
        </div>
        <h3 className="text-xl font-medium text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed pl-12">{description}</p>
    </div>
  );
}
