import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { Building, User, Mail, Phone, Globe, Briefcase, MapPin } from 'lucide-react';

const Directory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Directory data
    const directoryData = [
        {
            id: 1,
            name: 'ARU ENTERPRISES',
            contactPerson: 'Paresh Chandan',
            address: '#917/44, 2nd Cross, snd Stage, Kirloskar Colony, W.O.C Road, Bangalore - 560 079',
            email: 'aruenterprises@yahoo.com / info@hardcurrencyjeans.com',
            website: 'www.hardcurrencyjeans.com',
            phone: '+9180 23221083',
            mobile: '09450 36022',
            fax: '080 2322 3260',
            businessType: 'Jeans & Casuals',
            isManufacturer: true,
            brands: 'Hard Currency',
            isDistributor: false,
            specialization: '',
            category: 'manufacturer'
        },
        {
            id: 2,
            name: 'BAFNA CLOTHING COMPANY',
            contactPerson: 'Praveen Mutha',
            address: '#5, 1st Cross, Sudhamanagar, Lalbagh Road Bangalore - 560 027',
            email: 'praveen@coolcolors.in',
            website: 'www.coolcolors.in',
            phone: '+9180 22128266',
            mobile: '094484 85725',
            fax: '080 22128267',
            businessType: 'Mens Shirts & Trousers',
            isManufacturer: true,
            brands: 'Cool Color, Walker, I Blue',
            isDistributor: false,
            specialization: 'All types of Garments',
            category: 'manufacturer'
        },
        {
            id: 3,
            name: 'BAJAJ CLOTHING PVT. LTD',
            contactPerson: 'Vijay Bajaj',
            address: '#194, 4th Cross, K.S. Garden, Lalbagh Road, Bangalore - 560 027',
            email: 'bajajclothings3@yahoo.com',
            website: '',
            phone: '+9180 41130598',
            mobile: '98864 01966',
            fax: '080 41130599',
            businessType: 'Mens-Women Kids Garments & Under Garments',
            isManufacturer: false,
            brands: '',
            isDistributor: true,
            specialization: 'All types of Garments',
            category: 'distributor'
        },
        {
            id: 4,
            name: 'CHAMAN APPARELS',
            contactPerson: 'R. Hukmi Chand',
            address: '#893/896, 3rd Floor, Shanti Complex, Nagrathpet Main Road, Bangalore - 560 002',
            email: 'chamanapparels@yahoo.co.in',
            website: '',
            phone: '+9180 22213830, 3297',
            mobile: '98452 85110',
            fax: '',
            businessType: 'Mens - Women - Kids Garments',
            isManufacturer: false,
            brands: '',
            isDistributor: true,
            specialization: 'Designer kidswear, Bottoms, Babyset, Designer Lounge Wear',
            category: 'distributor'
        },
        {
            id: 5,
            name: 'CREATIVE GARMENTS',
            contactPerson: 'Parijat Manju',
            address: 'NO. 18B, 2nd Floor, SGN Layout, 1st Cross Lalabag Road, Bangalore - 560027',
            email: 'creativegarments@outlook.com',
            website: '',
            phone: '080-41146718, 4127 3',
            mobile: '98860 39030',
            fax: '',
            businessType: 'Manufacturers/Wholesale Distributors/Agents',
            isManufacturer: true,
            brands: '',
            isDistributor: true,
            specialization: 'Mens wedding wears, Sherwanies, Tunics, Suits, Kurta sets, Fenct Outfits, Zoop, Cartel, Blue Stag, Suitsmith, Creaseline, Rajwada, Samrat, Dollar, Tuxido, Davik',
            category: 'both'
        }
    ];

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
 return (
        <div className="relative w-full py-4 sm:py-8 bg-white overflow-hidden">
            <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                        SIGA <Highlight>Directory</Highlight>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                        Explore the SIGA Directory to connect members and discover opportunities in the apparel industry.
                    </p>
                </motion.div>

                {/* Search and Filter Section */}
                <div className="mb-6 sm:mb-8">
                    <FeatureCard>
                        <CardContent className="p-4 sm:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {/* Search Input */}
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
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Filter Buttons */}
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
                            <motion.div
                                key={company.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                viewport={{ once: true }}
                            >
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
                                                <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                                                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-400" />
                                                    {company.email}
                                                </div>
                                                {company.website && (
                                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                                                        <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-400" />
                                                        <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline break-all">
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
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs sm:text-xs font-medium ${
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
                            </motion.div>
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