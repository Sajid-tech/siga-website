import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

const fetchCommitteeByYear = async (year) => {
  const response = await fetch(`https://southindiagarmentsassociation.com/public/api/getCommitteeByYear/${year}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const fetchCommitteeYears = async () => {
  const response = await fetch('https://southindiagarmentsassociation.com/public/api/getCommitteeYear');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const ManagingCommitte = () => {
  const [selectedYear, setSelectedYear] = useState('2024-26');
  const [selectedTabYear, setSelectedTabYear] = useState('2022-24'); 


  const { data: yearsData, isLoading: isYearsLoading, isError: isYearsError } = useQuery({
    queryKey: ['committeeYears'],
    queryFn: fetchCommitteeYears,
  });


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['committeeData', selectedYear],
    queryFn: () => fetchCommitteeByYear(selectedYear),
  });


  const { data: tabData, isLoading: isTabLoading } = useQuery({
    queryKey: ['tabCommitteeData', selectedTabYear],
    queryFn: () => fetchCommitteeByYear(selectedTabYear),
    enabled: !!selectedTabYear 
  });

  if (isYearsLoading || isLoading) {
    return (
      <div className="relative w-full pt-28 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
       
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <Skeleton height={40} width={300} className="mx-auto mb-4" />
            <Skeleton height={20} width={500} className="mx-auto" />
          </div>

       
          <div className="w-full">
            <div className="bg-green-200 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-16 sticky">
              <Skeleton height={200} count={6} containerClassName="grid grid-cols-2 md:grid-cols-3 gap-4" />
            </div>
            <div className="bg-yellow-200 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-16 sticky">
              <Skeleton height={200} count={5} containerClassName="grid grid-cols-2 md:grid-cols-3 gap-4" />
            </div>
            <div className="bg-blue-200 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-16 sticky">
              <Skeleton height={200} count={4} containerClassName="grid grid-cols-2 gap-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isYearsError || isError) {
    return (
      <div className="relative w-full pt-28 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
              SIGA <Highlight>Managing Committee</Highlight>
            </h1>
          </div>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="text-red-600 font-medium mb-2">
                Failed to load committee data
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {error?.message || 'Please try again later.'}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
              >
                Retry
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full pt-28 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            SIGA <Highlight>Managing Committee</Highlight>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Meet our dedicated Managing Committee members who lead and support SIGA in its mission.
          </p>
        </div>

  
        <div className="w-full">
      
          <div className="bg-green-50 grid grid-cols-1 gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-16 " >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center col-span-full">
            Managing Committee {selectedYear} test
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
              {data?.office_berres?.map((member) => (
                <MemberCard 
                  key={member.name}
                  name={member.name}
                  designation={member.designation || member.designation}
                  image={`${data.image_url}${member.image}`}
                />
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 grid grid-cols-1 gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-16 sticky" style={{ top: "100px" }}>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center col-span-full">
              Committee Members {selectedYear}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
              {data?.committee_members?.map((member) => (
                <MemberCard 
                  key={member.name}
                  name={member.name}
                  image={`${data.image_url}${member.image}`}
                />
              ))}
              {data?.committee_special_invitiees?.map((member) => (
                <MemberCard 
                  key={member.name}
                  name={member.name}
                  image={member.image ? `${data.image_url}${member.image}` : null}
                />
              ))}
              {data?.committee_regional_invitiees?.map((member) => (
                <MemberCard 
                  key={member.name}
                  name={member.name}
                  image={member.image ? `${data.image_url}${member.image}` : null}
                />
              ))}
            </div>
          </div>

        
          <div className="bg-blue-50 grid grid-cols-1 gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-16 sticky" style={{ top: "100px" }}>
           
            <div className="flex flex-wrap gap-2 mb-6 justify-center col-span-full">
              {yearsData?.data?.filter(year => year.year !== selectedYear).map((yearData) => (
                <button
                  key={yearData.year}
                  onClick={() => setSelectedTabYear(yearData.year)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTabYear === yearData.year
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {yearData.tag_line}
                </button>
              ))}
            </div>

           
            {isTabLoading ? (
              <Skeleton height={200} count={4} containerClassName="grid grid-cols-2 gap-4 w-full" />
            ) : (
              <>
             
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Managing Committee  {selectedTabYear}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {tabData?.office_berres?.map((member) => (
                      <MemberCardSmall 
                        key={member.name}
                        name={member.name}
                        designation={member.designation || member.designation}
                        image={`${tabData.image_url}${member.image}`}
                        small
                      />
                    ))}
                  </div>
                </div>

          
                <div className="w-full mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Committee Members</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {tabData?.committee_members?.map((member) => (
                      <MemberCardSmall 
                        key={member.name}
                        name={member.name}
                        image={`${tabData.image_url}${member.image}`}
                        small
                      />
                    ))}
                  </div>
                </div>

                {tabData?.committee_regional_invitiees?.length > 0 && (
                  <div className="w-full mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Regional Invitees</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {tabData.committee_regional_invitiees.map((member) => (
                        <MemberCardSmall 
                          key={member.name}
                          name={member.name}
                          image={member.image ? `${tabData.image_url}${member.image}` : null}
                          small
                        />
                      ))}
                    </div>
                  </div>
                )}
     
                
                {tabData?.committee_special_invitiees?.length > 0 && (
                  <div className="w-full mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Special Invitees</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {tabData.committee_special_invitiees.map((member) => (
                        <MemberCardSmall 
                          key={member.name}
                          name={member.name}
                          image={member.image ? `${tabData.image_url}${member.image}` : null}
                          small
                        />
                      ))}
                    </div>
                  </div>
                )}

              
                {tabData?.committee_past_president?.length > 0 && (
                  <div className="w-full mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Past Presidents</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {tabData.committee_past_president.map((president) => (
                        <div key={president.name} className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="text-center">
                            <div className="mx-auto bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center mb-2">
                              <User className="h-6 w-6 text-gray-500" />
                            </div>
                            <h3 className="font-medium text-gray-900 text-sm">{president.name}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const MemberCard = ({ name, designation, image, small = false }) => {
    const sizeClass = small ? "h-16 w-16" : "h-24 w-24";
    const textSizeClass = small ? "text-sm" : "text-base";
  
    return (
      <div
        className={`relative 
        transition-all duration-300 ease-out ${small ? "" : "h-full"}`}
      >
        <div className="flex flex-col items-center text-center">
          {image ? (
            <div
              className={`relative  rounded-md overflow-hidden 
              ring-2 ring-transparent hover:ring-indigo-400 transition-all duration-300`}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23f3f4f6%22/%3E%3Ctext%20x%3D%2235%22%20y%3D%2255%22%20fill%3D%22%239ca3af%22%20font-size%3D%2210%22%20font-family%3D%22Arial%22%3ENo%20Img%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          ) : (
            <div
              className={`rounded-full ${sizeClass} bg-gray-100 flex items-center justify-center 
              ring-1 ring-gray-200`}
            >
              <User
                className={`${small ? "h-6 w-6" : "h-8 w-8"} text-gray-500`}
              />
            </div>
          )}
  
          <h3
            className={`mt-3 font-semibold text-gray-900 ${textSizeClass} tracking-tight`}
          >
            {name}
          </h3>
  
          {designation && (
            <p
              className={`text-gray-500 ${small ? "text-xs" : "text-sm"} font-medium`}
            >
              {designation}
            </p>
          )}
        </div>
      </div>
    );
  };
const MemberCardSmall = ({ name, designation, image, small = false }) => {
    const sizeClass = small ? "h-16 w-16" : "h-24 w-24";
    const textSizeClass = small ? "text-sm" : "text-base";
  
    return (
      <div
        className={`relative  bg-white p-2
        transition-all duration-300 ease-out ${small ? "" : "h-full"}`}
      >
        <div className="flex flex-col  items-center text-center">
          {image ? (
            <div
              className={`relative  ${sizeClass} rounded-md overflow-hidden 
              ring-2 ring-transparent hover:ring-indigo-400 transition-all duration-300`}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23f3f4f6%22/%3E%3Ctext%20x%3D%2235%22%20y%3D%2255%22%20fill%3D%22%239ca3af%22%20font-size%3D%2210%22%20font-family%3D%22Arial%22%3ENo%20Img%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          ) : (
            <div
              className={`rounded-full ${sizeClass} bg-gray-100 flex items-center justify-center 
              ring-1 ring-gray-200`}
            >
              <User
                className={`${small ? "h-6 w-6" : "h-8 w-8"} text-gray-500`}
              />
            </div>
          )}
  
          <h3
            className={`mt-3 font-semibold text-gray-900 ${textSizeClass} tracking-tight`}
          >
            {name}
          </h3>
  
          {designation && (
            <p
              className={`text-gray-500 ${small ? "text-xs" : "text-sm"} font-medium`}
            >
              {designation}
            </p>
          )}
        </div>
      </div>
    );
  };
const Highlight = ({ children, className }) => {
  return (
    <span className={`relative inline-block font-semibold ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-green-100 via-green-200 to-green-300 rounded-lg px-2 py-1 -z-0 blur-sm"></span>
    </span>
  );
};

export default ManagingCommitte;