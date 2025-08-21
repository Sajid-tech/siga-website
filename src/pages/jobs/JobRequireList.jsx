import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Calendar, Map, Briefcase, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BASE_URL from '@/config/BaseUrl';

const JobRequireList = () => {
 
  const fetchJobSeekers = async () => {
    const response = await axios.get(  `${BASE_URL}/api/getJobrequire`);
    return response.data;
  };

  const { data: jobSeekersApiData, isLoading: isLoadingSeekers, isError: isErrorSeekers } = useQuery({
    queryKey: ["jobSeekers"],
    queryFn: fetchJobSeekers,
  });

  
  const jobSeekersData = jobSeekersApiData?.data?.map((seeker, index) => ({
    id: index + 1,
    name: seeker.full_name || 'Anonymous',
    position: seeker.designation || seeker.job_profile || 'Not specified',
    experience: seeker.exp_salary ? `Expected salary: ${seeker.exp_salary}` : 'Salary not specified',
    location: 'Location not specified', 
    availability: 'Available', 
    validity: seeker.staff_validity
  })) || [];
    
  const [currentPageSeekers, setCurrentPageSeekers] = useState(1);
  const itemsPerPage = 10;
  
  const indexOfLastSeeker = currentPageSeekers * itemsPerPage;
  const indexOfFirstSeeker = indexOfLastSeeker - itemsPerPage;
  const currentSeekers = jobSeekersData.slice(indexOfFirstSeeker, indexOfLastSeeker);
  const totalPagesSeekers = Math.ceil(jobSeekersData.length / itemsPerPage);
  
  const paginateSeekers = (pageNumber) => setCurrentPageSeekers(pageNumber);

  const CardHeading = ({ icon: Icon, title, description }) => (
    <div className="px-2">
      <span className="text-muted-foreground flex items-center gap-2">
        <Icon className="size-4" />
        {title}
      </span>
      <p className="mt-4 text-2xl font-semibold">{description}</p>
    </div>
  );

  const FeatureCard = ({ children, className }) => (
    <Card className={cn('group relative rounded-none shadow-zinc-950/5', className)}>
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

  // Skeleton components for loading state
  const TableRowSkeleton = () => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Skeleton circle width={40} height={40} />
          <div className="ml-4">
            <Skeleton width={120} height={16} />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton width={100} height={16} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton width={80} height={24} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Skeleton width={20} height={20} className="mr-1" />
          <Skeleton width={80} height={16} />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton width={80} height={24} />
      </td>
    </tr>
  );

  const PaginationSkeleton = () => (
    <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <Skeleton width={200} height={16} />
        </div>
        <div>
          <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <Skeleton width={80} height={36} className="rounded-l-md" />
            <Skeleton width={36} height={36} />
            <Skeleton width={36} height={36} />
            <Skeleton width={80} height={36} className="rounded-r-md" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full pt-28 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            SIGA <Highlight>Job Require</Highlight>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Explore the SIGA Directory to connect members and discover
            opportunities in the apparel industry.
          </p>
        </div>

        <div>
          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-6 flex flex-row items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <User className="w-6 h-6 text-purple-600 mr-2" />
            <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-900 ">
              Job Seekers
            </h1>
          </motion.h2>
          
          <FeatureCard>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seeking Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoadingSeekers ? (
                    // Show skeleton loading state
                    [...Array(4)].map((_, index) => (
                      <TableRowSkeleton key={index} />
                    ))
                  ) : isErrorSeekers ? (
                    // Show error state
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-red-500">
                        Error loading job seekers. Please try again later.
                      </td>
                    </tr>
                  ) : jobSeekersData.length === 0 ? (
                    // Show empty state
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No job seekers found.
                      </td>
                    </tr>
                  ) : (
                    // Show actual data
                    currentSeekers.map((seeker) => (
                      <motion.tr 
                        key={seeker.id} 
                        className="hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{seeker.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{seeker.position}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {seeker.experience}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Map className="h-4 w-4 text-gray-400 mr-1" />
                            {seeker.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            seeker.availability === 'Immediate' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {seeker.availability}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {isLoadingSeekers ? (
              <PaginationSkeleton />
            ) : !isErrorSeekers && jobSeekersData.length > 0 && (
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button 
                    onClick={() => paginateSeekers(currentPageSeekers - 1)} 
                    disabled={currentPageSeekers === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => paginateSeekers(currentPageSeekers + 1)} 
                    disabled={currentPageSeekers === totalPagesSeekers}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstSeeker + 1}</span> to <span className="font-medium">
                        {Math.min(indexOfLastSeeker, jobSeekersData.length)}
                      </span> of <span className="font-medium">{jobSeekersData.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => paginateSeekers(currentPageSeekers - 1)}
                        disabled={currentPageSeekers === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPageSeekers === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {Array.from({ length: totalPagesSeekers }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginateSeekers(number)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPageSeekers === number
                              ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                      <button
                        onClick={() => paginateSeekers(currentPageSeekers + 1)}
                        disabled={currentPageSeekers === totalPagesSeekers}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPageSeekers === totalPagesSeekers ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </FeatureCard>
        </div>
      </div>
    </div>
  );
};

const Highlight = ({ children, className }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300/70 -rotate-1 -z-0"></span>
    </span>
  );
};

export default JobRequireList;