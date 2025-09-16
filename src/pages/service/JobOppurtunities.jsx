/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/event-card";
import { cn } from "@/lib/utils";
import {  Map, Briefcase, User, X, ArrowLeft } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import JobRequireForm from "./JobRequireForm";
import JobOfferForm from "./JobOfferForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import BASE_URL from "@/config/BaseUrl";

const JobOpportunities = () => {
  const [activeView, setActiveView] = useState("main");
  const [currentPageJobs, setCurrentPageJobs] = useState(1);
  const [currentPageSeekers, setCurrentPageSeekers] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

 
  const fetchJobOffers = async () => {
    const response = await axios.get(
       `${BASE_URL}/api/getJoboffer`
    );
    return response.data;
  };

  const {
    data: jobOffersData,
    isLoading: isLoadingOffers,
    isError: isErrorOffers,
  } = useQuery({
    queryKey: ["jobOffers"],
    queryFn: fetchJobOffers,
  });

 
  const fetchJobSeekers = async () => {
    const response = await axios.get(
       `${BASE_URL}/api/getJobrequire`
    );
    return response.data;
  };

  const {
    data: jobSeekersData,
    isLoading: isLoadingSeekers,
    isError: isErrorSeekers,
  } = useQuery({
    queryKey: ["jobSeekers"],
    queryFn: fetchJobSeekers,
  });

  
  const jobOpeningsData =
    jobOffersData?.data?.map((job, index) => ({
      id: index + 1,
      position: job.profile_employee || "Not specified",
      type: "Full-time", 
      location: job.location || "Not specified",
      salary: job.appx_sal || "Salary not specified",
      posted: "Recently", 
      company_name: job.company_name,
      experience: job.appx_exp,
      validity: job.company_validity,
    })) || [];

  const transformedSeekersData =
    jobSeekersData?.data?.map((seeker, index) => ({
      id: index + 1,
      name: seeker.full_name || "Anonymous",
      position: seeker.designation || seeker.job_profile || "Not specified",
      experience: seeker.exp_salary
        ? `${seeker.exp_salary} expected salary`
        : "Experience not specified",
      location: "Location not specified", 
      availability: "Available", 
      validity: seeker.staff_validity,
    })) || [];

 
  const indexOfLastJob = currentPageJobs * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobOpeningsData.slice(indexOfFirstJob, indexOfLastJob);


  const indexOfLastSeeker = currentPageSeekers * itemsPerPage;
  const indexOfFirstSeeker = indexOfLastSeeker - itemsPerPage;
  const currentSeekers = transformedSeekersData.slice(
    indexOfFirstSeeker,
    indexOfLastSeeker
  );
 


  const CardHeading = ({ icon: Icon, title, description }) => (
    <div className="px-2">
      <span className="text-muted-foreground flex items-center gap-2">
        <Icon className="size-4" />
        {title}
      </span>
      <p className="mt-2 sm:mt-4 text-xl sm:text-2xl font-semibold">
        {description}
      </p>
    </div>
  );

  const FeatureCard = ({ children, className }) => (
    <Card
      className={cn(
        "group relative rounded-none shadow-zinc-950/5 h-full flex flex-col",
        className
      )}
    >
      <CardDecorator />
      {children}
    </Card>
  );

  const CardDecorator = () => (
    <>
      <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
      <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
      <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
      <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </>
  );

 
  const JobCardSkeleton = () => (
    <FeatureCard>
      <CardContent className="p-4 sm:p-5 h-full flex flex-col">
        <div className="flex items-start flex-1">
          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <Skeleton circle width={20} height={20} />
          </div>
          <div className="flex-1 min-w-0">
            <Skeleton width="70%" height={20} className="mb-2" />
            <div className="mt-1 flex flex-wrap gap-1 sm:gap-2 mb-2">
              <Skeleton width={60} height={20} />
              <Skeleton width={80} height={20} />
            </div>
            <div className="mt-2">
              <Skeleton width="50%" height={16} className="mb-1" />
              <Skeleton width="60%" height={16} className="mb-1" />
              <Skeleton width="40%" height={16} className="mb-1" />
              <Skeleton width="50%" height={16} />
            </div>
          </div>
        </div>
      </CardContent>
    </FeatureCard>
  );

  const JobSeekerCardSkeleton = () => (
    <FeatureCard>
      <CardContent className="p-4 sm:p-5 h-full flex flex-col">
        <div className="flex items-start flex-1">
          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <Skeleton circle width={20} height={20} />
          </div>
          <div className="flex-1 min-w-0">
            <Skeleton width="70%" height={20} className="mb-2" />
            <div className="mt-1 flex flex-wrap gap-1 sm:gap-2 mb-2">
              <Skeleton width={80} height={20} />
              <Skeleton width={100} height={20} />
            </div>
            <div className="mt-2">
              <Skeleton width="60%" height={16} className="mb-1" />
              <Skeleton width="50%" height={16} className="mb-1" />
              <Skeleton width="40%" height={16} />
            </div>
          </div>
        </div>
      </CardContent>
    </FeatureCard>
  );

  if (activeView === "offer") {
    return (
      <div className="relative w-full  bg-white overflow-hidden">
        <div className="">
          <button
            onClick={() => setActiveView("main")}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job Opportunities
          </button>
          <JobOfferForm onClose={() => setActiveView("main")} />
        </div>
      </div>
    );
  }

  if (activeView === "require") {
    return (
      <div className="relative w-full  bg-white overflow-hidden">
        <div className="">
          <button
            onClick={() => setActiveView("main")}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job Opportunities
          </button>
          <JobRequireForm onClose={() => setActiveView("main")} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full  bg-white overflow-hidden">
      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
     
        <div
          className="text-center mb-4"
        
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-gray-900 mb-2 sm:mb-4">
            SIGA <Highlight>Job Opportunities</Highlight>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Connecting SIGA members with talented professionals in the apparel
            sector
          </p>
        </div>

     
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
       
          <FeatureCard className="h-full">
            <CardHeader className="pb-2 sm:pb-3 flex-shrink-0">
              <CardHeading
                icon={Briefcase}
                title="Job Offer"
                description="Post your job requirements"
              />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 flex-1">
                  SIGA members - Are you looking for employees to work in your
                  office, godown, accounts, sales, or tailoring unit? Fill the
                  form online and relax - SIGA is working for you.
                </p>
             
                <motion.button
                  onClick={() => setActiveView("offer")}
                  whileHover={{ backgroundColor: "#333" }}
                  transition={{ duration: 0.3 }}
                  className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-black text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Post a Job Opening
                </motion.button>
              
              </div>
            </CardContent>
          </FeatureCard>

        
          <FeatureCard className="h-full">
            <CardHeader className="pb-2 sm:pb-3 flex-shrink-0">
              <CardHeading
                icon={User}
                title="Job Require"
                description="Submit your resume"
              />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 flex-1">
                  Looking for a job? Post your resume on the SIGA Job Portal to
                  find the perfect position in the apparel sector.
                </p>
                <motion.button
                  onClick={() => setActiveView("require")}
                  className="w-full py-2 sm:py-3 px-4 sm:px-6 border border-black text-black text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
                  whileHover={{ backgroundColor: "#f5f5f5" }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Submit Your Resume
                </motion.button>
              </div>
            </CardContent>
          </FeatureCard>
        </div>

       
        <div className="mb-12 sm:mb-16">
          <motion.h2
            className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 mr-2" />
            Current Job Openings
          </motion.h2>

          {isLoadingOffers ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(5)].map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            </div>
          ) : isErrorOffers ? (
            <div className="text-center py-8 text-red-500">
              <p>Error loading job openings. Please try again later.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <FeatureCard>
                      <CardContent className="p-4 sm:p-5 h-full flex flex-col">
                        <div className="flex items-start flex-1">
                          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                            <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                              {job.position}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-1 sm:gap-2">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  job.type === "Full-time"
                                    ? "bg-green-100 text-green-800"
                                    : job.type === "Part-time"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {job.type}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                <Map className="h-3 w-3 mr-1 text-gray-500" />
                                {job.location}
                              </span>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs sm:text-sm text-gray-500">
                                <span className="font-medium">Salary:</span>{" "}
                                {job.salary}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">Company:</span>{" "}
                                {job.company_name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">Experience:</span>{" "}
                                {job.experience} years
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Valid until:{" "}
                                {new Date(job.validity).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </FeatureCard>
                  </motion.div>
                ))}
              </div>

         
              <div className="mt-6 text-center">
                <Link to="/jobopening">
                  <motion.div
                    className="inline-flex items-center text-sm sm:text-base font-medium text-yellow-600 hover:text-yellow-700 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    View all job openings
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </Link>
              </div>
            </>
          )}
        </div>

        
        <motion.div
          className="relative p-6 sm:p-8 rounded-xl bg-gradient-to-r from-yellow-400/70 to-yellow-600 text-center text-white mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute -z-10 rounded-xl inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/90 to-indigo-50/20"></div>
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-indigo-300/25 blur-[100px]"></div>
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-red-300/25 blur-[100px]"></div>
            <div
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)",
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
            Join SIGA Membership
          </h3>
          <p className="text-yellow-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-xs sm:text-sm">
            Company or person working as a manufacturer, distributor, retailer or
            agent in the apparel sector is eligible to join our growing network
            of professionals.
          </p>
          <Button
        
            size="lg"
            className="rounded-xl  hover:scale-105  text-yellow-800  px-5 text-base relative overflow-hidden hover:cursor-pointer group"
          >
            <Link to={'/become-member'}>
            <span className="relative z-10">
              <TextEffect preset="scale" per="word">
                Click Here
              </TextEffect>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/80 to-white opacity-100 transition-opacity duration-300 -skew-x-12" />
            </Link>
          </Button>
        </motion.div>

     
        <div>
          <motion.h2
            className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mr-2" />
            Job Seekers
          </motion.h2>

          {isLoadingSeekers ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(5)].map((_, index) => (
                <JobSeekerCardSkeleton key={index} />
              ))}
            </div>
          ) : isErrorSeekers ? (
            <div className="text-center py-8 text-red-500">
              <p>Error loading job seekers. Please try again later.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentSeekers.map((seeker) => (
                  <motion.div
                    key={seeker.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <FeatureCard>
                      <CardContent className="p-4 sm:p-5 h-full flex flex-col">
                        <div className="flex items-start flex-1">
                          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                              {seeker.name}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-1 sm:gap-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {seeker.position}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {seeker.experience}
                              </span>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                                <Map className="h-3 w-3 mr-1 text-gray-400" />
                                {seeker.location}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">Available:</span>
                                <span
                                  className={`ml-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                    seeker.availability === "Immediate"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {seeker.availability}
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Valid until:{" "}
                                {new Date(seeker.validity).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </FeatureCard>
                  </motion.div>
                ))}
              </div>

              
              <div className="mt-6 text-center">
                <Link to="/jobrequire">
                  <motion.div
                    className="inline-flex items-center text-sm sm:text-base font-medium text-purple-600 hover:text-purple-700 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    View all job seekers
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobOpportunities;

const Highlight = ({ children, className }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300/70 -rotate-1 -z-0"></span>
    </span>
  );
};
