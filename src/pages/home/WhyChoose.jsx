import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Users, Mail, Trophy, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
const buttonColorMap = {
  red: {
    gradient: "from-red-400/70 via-red-500/60 to-red-400/70",
    iconBg: "group-hover:bg-red-50",
    iconText: "group-hover:text-red-500",
  },
  blue: {
    gradient: "from-blue-400/70 via-blue-500/60 to-blue-400/70",
    iconBg: "group-hover:bg-blue-50",
    iconText: "group-hover:text-blue-500",
  },
  green: {
    gradient: "from-green-400/70 via-green-500/60 to-green-400/70",
    iconBg: "group-hover:bg-green-50",
    iconText: "group-hover:text-green-500",
  },
  yellow: {
    gradient: "from-yellow-400/70 via-yellow-500/60 to-yellow-400/70",
    iconBg: "group-hover:bg-yellow-50",
    iconText: "group-hover:text-yellow-500",
  },
  purple: {
    gradient: "from-purple-400/70 via-purple-500/60 to-purple-400/70",
    iconBg: "group-hover:bg-purple-50",
    iconText: "group-hover:text-purple-500",
  },
};
const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[12rem] grid-cols-3 gap-4",
        "md:auto-rows-[14rem] lg:auto-rows-[16rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardDecorator = () => (
  <>
    <span className="absolute -left-px -top-px block size-2 border-l-2 border-t-2 border-red-500"></span>
    <span className="absolute -right-px -top-px block size-2 border-r-2 border-t-2 border-red-500"></span>
    <span className="absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 border-red-500"></span>
    <span className="absolute -bottom-px -right-px block size-2 border-b-2 border-r-2 border-red-500"></span>
  </>
);
const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  buttonColor,
}) => {
  const [active, setActive] = useState(false);
  const colorClasses = buttonColorMap[buttonColor] || buttonColorMap.red;
  const navigate = useNavigate()
  return (
    <motion.div
      key={name}
      className={cn(
        `group relative col-span-3 flex flex-col justify-between overflow-hidden`,
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => setActive(!active)}
    >
      <CardDecorator />
      {background}

      {/* 🔥 Full-card hover overlay */}
      <motion.div
        className={cn(
          "absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br",
          colorClasses.gradient
        )}
      />

      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4 transition-all duration-300 md:p-6">
        {Icon && (
          <div
            className={cn(
              "w-6 h-6 mb-3 flex items-center justify-center rounded-full bg-gray-50 transition-colors",
              colorClasses.iconBg
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 text-gray-700 transition-colors",
                colorClasses.iconText
              )}
            />
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-300 md:text-xl">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-gray-600 dark:text-neutral-400 md:text-sm">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute right-0 bottom-0 flex items-center transition-all duration-300 p-4 md:p-6",
          active ? "opacity-100" : "opacity-0",
          "group-hover:opacity-100"
        )}
      >
        <Button
          asChild
          size="sm"
          className="pointer-events-auto relative text-black overflow-hidden"
        >
          
          <Link to={href}  className="flex items-center gap-1 relative z-10 hover:cursor-pointer">
            {cta}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
            <span
              className={cn(
                "absolute inset-0 -z-10 bg-gradient-to-r opacity-100 transition-opacity duration-300 -skew-x-12",
                colorClasses.gradient
              )}
            />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};


const WhyChoose = () => {
  const features = [
    {
      name: "Job Opportunities",
      description: "Offer/Apply for jobs through SIGA's portal. Find great talent fast.",
      href: "/service?tab=job_opportunities",
      cta: "View",
      Icon: Heart,
      buttonColor: "red",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
      background: (
        <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 rounded-full bg-red-100 blur-xl"></div>
      )
    },
    {
      name: "Latest News",
      description: "Stay updated with MSME news, events, GST & policy updates",
      href: "/service?tab=latest_news",
      cta: "View",
      Icon: Users,
      buttonColor: "blue",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
      background: (
        <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 rounded-full bg-blue-100 blur-xl"></div>
      )
    },
    {
      name: "Coming Soon",
      description: "Exciting new features are on their way!",
      href: "/service?tab=job_opportunities",
      cta: "Learn more",
      buttonColor: "purple",
      className: cn(
        "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
        "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      ),
      background: (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent to-gray-200/50 dark:to-gray-800/50"></div>
      )
    },
    {
      name: "Payment Mediation",
      description: "Resolve payment issues with our dedicated support system",
      href: "/service?tab=payment_mediation",
      cta: "View",
      Icon: Mail,
      buttonColor: "green",
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
      background: (
        <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 rounded-full bg-green-100 blur-xl"></div>
      )
    },
    {
      name: "Business Opportunities",
      description: "Propose or request business opportunities for expansion",
      href: "/service?tab=business_expansion",
      cta: "View",
      Icon: Trophy,
      buttonColor: "yellow",
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
      background: (
        <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 rounded-full bg-yellow-100 blur-xl"></div>
      )
    },
  ];

  return (
    <div className="py-12 px-4 relative overflow-hidden  bg-gradient-to-br from-green-50/20 via-transparent to-blue-50">
      {/* Refined SVG Pattern Background */}
      <div className="absolute inset-0 z-10 opacity-10">
        <svg 
          className="absolute left-0 top-1/4"
          width="240" 
          height="240" 
          viewBox="0 0 240 240" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="40" y="40" width="160" height="160" rx="20" stroke="#4B558D" strokeWidth="2" strokeDasharray="8 4"/>
          <circle cx="120" cy="120" r="40" fill="#E84E53" fillOpacity="0.3"/>
        </svg>
        <svg 
          className="absolute right-0 bottom-1/4"
          width="240" 
          height="240" 
          viewBox="0 0 240 240" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M120 0V240M0 120H240" stroke="#4B558D" strokeWidth="2" strokeDasharray="6 3"/>
          <rect x="80" y="80" width="80" height="80" rx="10" stroke="#E84E53" strokeWidth="2"/>
        </svg>
        <svg 
          className="absolute left-1/4 bottom-0"
          width="180" 
          height="180" 
          viewBox="0 0 180 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M90 0L180 90L90 180L0 90L90 0Z" stroke="#4B558D" strokeWidth="1.5" strokeDasharray="5 2" fill="none"/>
        </svg>
        <svg 
          className="absolute right-1/4 top-0"
          width="200" 
          height="200" 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" stroke="#E84E53" strokeWidth="1.5" strokeDasharray="4 4" fill="none"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            WHY CHOOSE SIGA?
          </h2>
          <div className="flex justify-center gap-1 mb-3">
            <div className="w-12 h-[1px] bg-red-500"></div>
            <div className="w-12 h-[1px] bg-red-500 translate-y-1.5 -translate-x-8"></div>
          </div>
          <p className="text-gray-600 text-md max-w-2xl mx-auto">
            Empowering MSMEs with comprehensive solutions for growth and success
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <BentoGrid className="lg:grid-rows-2">
        {features.map((feature, index) => (
            <BentoCard key={index} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default WhyChoose;