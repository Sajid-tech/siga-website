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
import moment from 'moment';

const JobOpeningList = () => {

  const fetchJobOffers = async () => {
    const response = await axios.get(  `${BASE_URL}/api/getJoboffer`);
    return response.data;
  };

  const { data: jobOffersApiData, isLoading: isLoadingOffers, isError: isErrorOffers } = useQuery({
    queryKey: ["jobOffers"],
    queryFn: fetchJobOffers,
  });

 
  const jobOpeningsData = jobOffersApiData?.data?.map((job, index) => ({
    id: index + 1,
    position: job.profile_employee || 'Not specified',
  
    location: job.location || 'Not specified',
    salary: job.appx_sal || 'Salary not specified',
    posted: job.company_validity, 
    company_name: job.company_name,
    experience: `${job.appx_exp} Years`,
    validity: job.company_validity
  })) || [];
  
  const [currentPageJobs, setCurrentPageJobs] = useState(1);
  const itemsPerPage = 10;
  
  const indexOfLastJob = currentPageJobs * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobOpeningsData.slice(indexOfFirstJob, indexOfLastJob);
  const totalPagesJobs = Math.ceil(jobOpeningsData.length / itemsPerPage);
  
  const paginateJobs = (pageNumber) => setCurrentPageJobs(pageNumber);

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
        <Skeleton width={80} height={24} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Skeleton width={20} height={20} className="mr-1" />
          <Skeleton width={100} height={16} />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton width={100} height={16} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton width={60} height={16} />
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
            SIGA <Highlight>Job Opening</Highlight>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Explore the SIGA Directory to connect members and discover
            opportunities in the apparel industry.
          </p>
        </div>

        <div className="mb-16">
          <motion.h1 
            className="font-bold text-gray-800 mb-6 flex flex-row items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Briefcase className="w-6 h-6 text-yellow-600 mr-2" />
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-900">
              Current Job Openings
            </span>
          </motion.h1>
          
          <FeatureCard>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Validity
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoadingOffers ? (
                    
                    [...Array(4)].map((_, index) => (
                      <TableRowSkeleton key={index} />
                    ))
                  ) : isErrorOffers ? (
     
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-red-500">
                        Error loading job openings. Please try again later.
                      </td>
                    </tr>
                  ) : jobOpeningsData.length === 0 ? (
            
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No job openings found.
                      </td>
                    </tr>
                  ) : (
                 
                    currentJobs.map((job) => (
                      <motion.tr 
                        key={job.id} 
                        className="hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                              <Briefcase className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{job.position}</div>
                              <div className="text-xs text-gray-500">{job.company_name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  text-gray-700`}>
                            {job.experience} 
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Map className="h-4 w-4 text-gray-400 mr-1  " />
                          <span className='break-words whitespace-normal'> {job.location}</span> 
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {job.salary}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment(job.posted).format('DD-MMM-YYYY')}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {isLoadingOffers ? (
              <PaginationSkeleton />
            ) : !isErrorOffers && jobOpeningsData.length > 0 && (
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button 
                    onClick={() => paginateJobs(currentPageJobs - 1)} 
                    disabled={currentPageJobs === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => paginateJobs(currentPageJobs + 1)} 
                    disabled={currentPageJobs === totalPagesJobs}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstJob + 1}</span> to <span className="font-medium">
                        {Math.min(indexOfLastJob, jobOpeningsData.length)}
                      </span> of <span className="font-medium">{jobOpeningsData.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => paginateJobs(currentPageJobs - 1)}
                        disabled={currentPageJobs === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPageJobs === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {Array.from({ length: totalPagesJobs }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginateJobs(number)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPageJobs === number
                              ? 'z-10 bg-yellow-50 border-yellow-500 text-yellow-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                      <button
                        onClick={() => paginateJobs(currentPageJobs + 1)}
                        disabled={currentPageJobs === totalPagesJobs}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPageJobs === totalPagesJobs ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
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

export default JobOpeningList;