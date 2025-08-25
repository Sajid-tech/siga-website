import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Target, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/event-card";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BASE_URL from "@/config/BaseUrl";

const stats = [
  { icon: Users, value: "5000+", label: "Maufaturer Connected" },
  { icon: Target, value: "12,000+", label: "Retailer Connected" },
  { icon: Award, value: "50+", label: "Industry Events" },
  { icon: Calendar, value: "30+", label: "Years of Service" }
];

const Efforts = () => {
  const navigate = useNavigate();
  
  const { data: effortsData = [], isLoading, isError } = useQuery({
    queryKey: ['efforts'],
    queryFn: async () => {
      const response = await axios.get(  `${BASE_URL}/api/getEfforts`);
      return response.data;
    }
  });

  const CardDecorator = useCallback(() => (
    <>
      <span className="border-indigo-800 absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
      <span className="border-indigo-800 absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
      <span className="border-indigo-800 absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
      <span className="border-indigo-800 absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </>
  ),[]);

  const FeatureCard = useCallback(({ children, className }) => (
    <Card className={cn('group relative rounded-none border border-indigo-600 shadow-zinc-950/5', className)}>
      <CardDecorator />
      {children}
    </Card>
  ),[]);


  const EffortsSkeleton = () => (
    <div className="relative">
     
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 to-purple-300 transform -translate-x-1/2"></div>
      
      {Array.from({ length: 8 }).map((_, index) => (
        <div 
          key={index}
          className={cn(
            "mb-12 md:mb-16 flex flex-col md:flex-row",
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          )}
        >
      
          <div className="relative z-10 flex items-start justify-center md:justify-start md:w-1/2">
            <div className={cn(
              "absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-lg transform -translate-x-1/2",
              index % 2 === 0 ? "md:left-1/2" : "md:left-1/2"
            )}></div>
          </div>

         
          <div className={cn(
            "ml-10 md:ml-0 md:w-1/2",
            index % 2 === 0 ? "md:pr-12 md:pl-0 md:text-right" : "md:pl-12"
          )}>
            <FeatureCard className="p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                <Skeleton width={150} height={24} />
              </div>
              
              <div className={cn(
                "aspect-video overflow-hidden rounded-lg mb-4",
                index % 2 === 0 ? "md:float-left md:mr-4 md:ml-0" : "md:float-right md:ml-4 md:mr-0"
              )}>
                <Skeleton height={200} />
              </div>
              <Skeleton count={2} />
            </FeatureCard>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full pt-28 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Efforts by the <Highlight>SIGA Association</Highlight>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Discover how SIGA works tirelessly to represent the garment industry's voice through policy advocacy, events, and stakeholder engagement.
            </p>
          </motion.div>
        </div>

       
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <FeatureCard key={index} className="text-center p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
              <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 mx-auto mb-2 sm:mb-4" />
              <div className="text-2xl sm:text-3xl font-medium text-gray-900">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
            </FeatureCard>
          ))}
        </motion.div>

    
        {isError && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Failed to load efforts. Please try again later.</p>
          </div>
        )}

 
        {isLoading && <EffortsSkeleton />}


        {!isLoading && !isError && effortsData.data && (
          <div 
            className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-20"
          
          >
  
            <div className="absolute  left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 to-purple-300 transform -translate-x-1/2"></div>
            
            {effortsData.data.map((item, index) => (
              <motion.div 
                key={index}
                className={cn(
                  "mb-5 md:mb-2  flex flex-col md:flex-row",
                  index % 2 === 1 ? 'md:translate-y-32' :""
                  
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
              
               

            
                <div className={cn(
                  "ml-10 md:ml-0  ",
             
                  
                )}>
                   
                  <div className=" ">
                    <div className="flex  flex-col sm:flex-row items-start sm:items-center justify-between gap-2  ">
                      <span className="text-sm  font-medium px-2 py-1 bg-indigo-100 text-indigo-800 rounded-tl-lg rounded-tr-lg  ">
                        {item.efforts_heading || ''} 
                      </span>
                    </div>
                    
                    <div className={cn(
                      "aspect-video overflow-hidden    rounded-b-lg rounded-r-lg mb-4",
                   
                    )}>
                      <img 
                        src={`${effortsData.image_url}${item.efforts_image}`} 
                        alt={item.efforts_description}
                        className="w-full  h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <h3 className= {cn(
                      "text-lg font-medium text-gray-900 mb-3",
                      index % 2 === 0 ? "md:float-left md:mr-4 md:ml-0" : "md:float-right md:ml-4 md:mr-0 "
                    )}
                   
                    
                    
                    
                    >{item.efforts_description}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      
        {!isLoading && !isError && (!effortsData.data || effortsData.data.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No efforts data available at the moment.</p>
          </div>
        )}

      
        <motion.div 
          className="p-6 sm:p-8 mt-12 sm:mt-16 md:mt-36 rounded-2xl border border-white/20 backdrop-blur-lg text-center overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, rgba(253, 224, 71, 0.1) 0%, rgba(250, 204, 21, 0.1) 100%",
            boxShadow: "0 4px 16px rgba(99, 102, 241, 0.1), 0 8px 32px rgba(168, 85, 247, 0.05)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-500/15"></div>
            <div className="absolute top-1/4 left-1/4 w-8 sm:w-16 h-8 sm:h-16 rounded-full bg-yellow-400/10 blur-lg sm:blur-xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-12 sm:w-24 h-12 sm:h-24 rounded-full bg-yellow-500/15 blur-lg sm:blur-xl"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              Join Our Efforts
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Become part of SIGA's mission to strengthen the garment industry through advocacy, networking, and development initiatives.
            </p>
            <Link to={'/become-member'} className="px-6 py-3 hover:cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors duration-300">
              Get Involved
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Highlight = ({ children, className }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-2 bg-indigo-300/70 -rotate-1 -z-0"></span>
    </span>
  );
};

export default Efforts;

//