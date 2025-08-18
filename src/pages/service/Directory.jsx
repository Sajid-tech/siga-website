import React, { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { Building, User, Mail, Phone, Globe, Briefcase, MapPin } from 'lucide-react';

const fetchDirectoryData = async () => {
  const response = await fetch('https://southindiagarmentsassociation.com/public/api/getDirectory');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Directory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Use Tanstack Query to fetch data
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['directory'],
        queryFn: fetchDirectoryData,
    });

    // Transform API data to match our UI structure
    const transformData = (apiData) => {
        if (!apiData || !apiData.data) return [];
        
        return apiData.data.map(item => ({
            id: item.id,
            name: item.name_of_firm,
            contactPerson: item.contact_person,
            address: item.contact_address,
            email: item.mail_id,
            website: item.website,
            phone: item.office_ph_no,
            mobile: item.cell_no,
            fax: item.fax_no,
            businessType: item.nature_of_business,
            isManufacturer: item.manufacturers === "Yes",
            brands: item.brands,
            isDistributor: item.agents !== null,
            specialization: item.specialization,
            category: item.manufacturers === "Yes" && item.agents !== null 
                ? 'both' 
                : item.manufacturers === "Yes" 
                    ? 'manufacturer' 
                    : 'distributor'
        }));
    };

    // Get transformed data or empty array if loading/error
    const directoryData = data ? transformData(data) : [];

    // Filter and search functionality
    const filteredData = directoryData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             item.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.businessType.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = activeFilter === 'all' || 
                            (activeFilter === 'manufacturer' && item.isManufacturer) ||
                            (activeFilter === 'distributor' && item.isDistributor) ||
                            (activeFilter === 'both' && item.isManufacturer && item.isDistributor);
        
        return matchesSearch && matchesFilter;
    });

    const FeatureCard = useCallback(({ children, className }) => (
        <Card className={cn('group relative rounded-none shadow-zinc-950/5', className)}>
            <CardDecorator />
            {children}
        </Card>
    ),[]);

    const CardDecorator = useCallback(() => (
        <>
            <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
            <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
            <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
            <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
        </>
    ),[]);

    // Loading state
    if (isLoading) {
        return (
            <div className="relative w-full pt-28 bg-white overflow-hidden">
                <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section Skeleton */}
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <Skeleton height={40} width={300} className="mx-auto mb-4" />
                        <Skeleton height={20} width={500} className="mx-auto" />
                    </div>

                    {/* Search and Filter Section Skeleton */}
                    <div className="mb-6 sm:mb-8">
                        <FeatureCard>
                            <CardContent className="p-4 sm:p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <Skeleton height={20} width={120} className="mb-2" />
                                        <Skeleton height={36} />
                                    </div>
                                    <div>
                                        <Skeleton height={20} width={150} className="mb-2" />
                                        <div className="flex gap-2">
                                            <Skeleton height={32} width={100} />
                                            <Skeleton height={32} width={120} />
                                            <Skeleton height={32} width={110} />
                                            <Skeleton height={32} width={80} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </FeatureCard>
                    </div>

                    {/* Results Count Skeleton */}
                    <Skeleton height={20} width={150} className="mb-4" />

                    {/* Directory List Skeleton */}
                    <div className="space-y-4 sm:space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <FeatureCard key={i}>
                                <CardContent className="p-4 sm:p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                        <div className="space-y-2">
                                            <Skeleton height={24} width={200} />
                                            <Skeleton height={16} width={150} />
                                            <Skeleton height={16} width={250} />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton height={20} width={180} />
                                            <Skeleton height={16} width={250} />
                                            <Skeleton height={16} width={200} />
                                            <Skeleton height={16} width={180} />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton height={16} width={180} />
                                            <Skeleton height={16} width={180} />
                                            <Skeleton height={16} width={180} />
                                            <Skeleton height={24} width={120} className="mt-2" />
                                        </div>
                                    </div>
                                </CardContent>
                            </FeatureCard>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

   
    if (isError) {
        return (
            <div className="relative w-full pt-28 bg-white overflow-hidden">
                <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
              
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                            SIGA <Highlight>Directory</Highlight>
                        </h1>
                    </div>

                  
                    <FeatureCard>
                        <CardContent className="p-4 sm:p-6 text-center">
                            <div className="text-red-600 font-medium mb-2">
                                Failed to load directory data
                            </div>
                            <p className="text-sm text-gray-600">
                                { 'Please try again later.'}
                            </p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
                            >
                                Retry
                            </button>
                        </CardContent>
                    </FeatureCard>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full pt-28 bg-white overflow-hidden">
            <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
     
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                        SIGA <Highlight>Directory</Highlight>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                        Explore the SIGA Directory to connect members and discover opportunities in the apparel industry.
                    </p>
                </div>

              
                <div className="mb-6 sm:mb-8">
                    <FeatureCard>
                        <CardContent className="p-4 sm:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                              
                                <div>
                                    <label htmlFor="search" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Search Members
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="search"
                                            placeholder="Search by name, contact or business type..."
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 border"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                             
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Filter by Business Type
                                    </label>
                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                        <button
                                            onClick={() => setActiveFilter('all')}
                                            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium ${activeFilter === 'all' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            All Members
                                        </button>
                                        <button
                                            onClick={() => setActiveFilter('manufacturer')}
                                            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium ${activeFilter === 'manufacturer' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            Manufacturers
                                        </button>
                                        <button
                                            onClick={() => setActiveFilter('distributor')}
                                            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium ${activeFilter === 'distributor' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            Distributors
                                        </button>
                                        <button
                                            onClick={() => setActiveFilter('both')}
                                            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium ${activeFilter === 'both' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            Both
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </FeatureCard>
                </div>

                {/* Results Count */}
                <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                    Showing {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'}
                </div>

                {/* Directory List */}
                <div className="space-y-4 sm:space-y-6">
                    {filteredData.length > 0 ? (
                        filteredData.map((company) => (
                            <div key={company.id}>
                                <FeatureCard>
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                            {/* Company Info */}
                                            <div className="space-y-1 sm:space-y-2">
                                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                                                    <Building className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2" />
                                                    {company.name}
                                                </h3>
                                                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-400" />
                                                    {company.businessType}
                                                </div>
                                                {company.brands && (
                                                    <div className="text-xs sm:text-sm text-gray-600">
                                                        <span className="font-medium">Brands:</span> {company.brands}
                                                    </div>
                                                )}
                                                {company.specialization && (
                                                    <div className="text-xs sm:text-sm text-gray-600">
                                                        <span className="font-medium">Specialization:</span> {company.specialization}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Contact Info */}
                                            <div className="space-y-1 sm:space-y-2">
                                                <h4 className="font-medium text-gray-900 flex items-center text-sm sm:text-base">
                                                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1 sm:mr-2" />
                                                    {company.contactPerson}
                                                </h4>
                                                <div className="text-xs sm:text-sm text-gray-600 flex items-start">
                                                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                                                    <span>{company.address}</span>
                                                </div>
                                                {company.email && (
                                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                                                        <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-400" />
                                                        {company.email}
                                                    </div>
                                                )}
                                                {company.website && (
                                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                                                        <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-400" />
                                                        <a 
                                                            href={`https://${company.website.replace(/^https?:\/\//, '')}`} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="text-green-600 hover:underline break-all"
                                                        >
                                                            {company.website}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Contact Numbers */}
                                            <div className="space-y-1 sm:space-y-2">
                                                {company.phone && (
                                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                                                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-400" />
                                                        <span>Office: {company.phone}</span>
                                                    </div>
                                                )}
                                                {company.mobile && (
                                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                                                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-400" />
                                                        <span>Mobile: {company.mobile}</span>
                                                    </div>
                                                )}
                                                {company.fax && (
                                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                                                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-400" />
                                                        <span>Fax: {company.fax}</span>
                                                    </div>
                                                )}
                                                <div className="pt-1 sm:pt-2">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-2xs sm:text-xs font-medium ${
                                                        company.category === 'manufacturer' ? 'bg-blue-100 text-blue-800' :
                                                        company.category === 'distributor' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}>
                                                        {company.category === 'manufacturer' ? 'Manufacturer' :
                                                         company.category === 'distributor' ? 'Distributor' :
                                                         'Manufacturer & Distributor'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </FeatureCard>
                            </div>
                        ))
                    ) : (
                        <FeatureCard>
                            <CardContent className="p-4 sm:p-6 text-center text-xs sm:text-sm text-gray-600">
                                No matching members found. Try adjusting your search or filters.
                            </CardContent>
                        </FeatureCard>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Directory;

const Highlight = ({ children, className }) => {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{children}</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-green-300/70 -rotate-1 -z-0"></span>
        </span>
    );
};