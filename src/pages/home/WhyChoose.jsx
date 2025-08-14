import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Users, Mail, Trophy, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
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
  cardBackground
}) => {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      key={name}
      className={cn(
        `group relative col-span-3  flex flex-col justify-between overflow-hidden`,
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => setActive(!active)}
    >
      <CardDecorator />
      <div>{background}</div>
 
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300">
        {Icon && (
          <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-red-50 transition-colors">
            <Icon className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition-colors" />
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-300">
          {name}
        </h3>
        <p className="max-w-lg text-gray-600 dark:text-neutral-400">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute right-0 flex items-center transition-all duration-300",
          (active ? "opacity-100" : "opacity-0"),
          "group-hover:opacity-100"
        )}
      >
        <Button
          asChild
          size="sm"
          className="pointer-events-auto relative text-black overflow-hidden"
        >
          <a href={href} className="flex items-center gap-1 relative z-10">
            {cta}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-green-400/70 via-green-500/60 to-green-400/70 opacity-100 transition-opacity duration-300 -skew-x-12" />
          </a>
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </motion.div>
  );
};

const WhyChoose = () => {
  const features = [
    {
      name: "Job Opportunities",
      description: "Offer/Apply for jobs through SIGA's portal. Find great talent fast.",
      href: "/",
      cta: "View",
      Icon: Heart,
  
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
      background: (
        <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 rounded-full bg-red-100 blur-xl"></div>
      )
    },
    {
      name: "Latest News",
      description: "Stay updated with MSME news, events, GST & policy updates",
      href: "/",
      cta: "View",
      Icon: Users,
     
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
      background: (
        <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 rounded-full bg-blue-100 blur-xl"></div>
      )
    },
    {
      name: "Coming Soon",
      description: "Exciting new features are on their way!",
      href: "/",
      cta: "Learn more",
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
      href: "/",
      cta: "View",
      Icon: Mail,
  
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
      background: (
        <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 rounded-full bg-green-100 blur-xl"></div>
      )
    },
    {
      name: "Business Opportunities",
      description: "Propose or request business opportunities for expansion",
      href: "/",
      cta: "View",
      Icon: Trophy,
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  
      background: (
        <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 rounded-full bg-yellow-100 blur-xl"></div>
      )
    },
  ];

  return (
    <div className="py-12 px-4 relative overflow-hidden bg-gradient-to-r from-yellow-50 via-transparent to-purple-50">
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
            <BentoCard 
              key={index}
              name={feature.name}
              description={feature.description}
              href={feature.href}
              cta={feature.cta}
              className={feature.className}
              Icon={feature.Icon}
              background={feature.background}
              cardBackground={feature.cardBackground}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default WhyChoose;