import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { Calendar, Map, Briefcase, User } from 'lucide-react';
import BecomeMember from '@/components/becomeMember/BecomeMember';

const JobOpportunities = () => {
    const jobOpeningsData = [
        { id: 1, position: 'Office Helper', type: 'Full-time', location: 'Mumbai', salary: '₹12,000 - ₹15,000', posted: '2 days ago' },
        { id: 2, position: 'Godown Helper', type: 'Full-time', location: 'Delhi', salary: '₹10,000 - ₹13,000', posted: '1 week ago' },
        { id: 3, position: 'Accounts Assistant', type: 'Full-time', location: 'Bangalore', salary: '₹18,000 - ₹22,000', posted: '3 days ago' },
        { id: 4, position: 'Sales Executive', type: 'Full-time', location: 'Multiple Cities', salary: '₹15,000 + Commission', posted: 'Just now' },
        { id: 5, position: 'Tailor/Helper', type: 'Full-time', location: 'Surat', salary: '₹13,000 - ₹16,000', posted: '5 days ago' },
        { id: 6, position: 'Fabric Quality Checker', type: 'Part-time', location: 'Ahmedabad', salary: '₹200 per hour', posted: '1 day ago' },
        { id: 7, position: 'Merchandiser', type: 'Full-time', location: 'Chennai', salary: '₹25,000 - ₹30,000', posted: '2 weeks ago' },
        { id: 8, position: 'Delivery Assistant', type: 'Contract', location: 'Hyderabad', salary: '₹150 per delivery', posted: '4 days ago' },
    ];
    
    const jobSeekersData = [
        { id: 1, name: 'Rahul Sharma', position: 'Office Helper', experience: '2 years', location: 'Mumbai', availability: 'Immediate' },
        { id: 2, name: 'Priya Patel', position: 'Tailor', experience: '5 years', location: 'Surat', availability: '1 week notice' },
        { id: 3, name: 'Vikram Singh', position: 'Sales Executive', experience: '3 years', location: 'Delhi', availability: 'Immediate' },
        { id: 4, name: 'Anjali Gupta', position: 'Accounts Assistant', experience: '1 year', location: 'Bangalore', availability: '2 weeks notice' },
        { id: 5, name: 'Sanjay Verma', position: 'Godown Helper', experience: 'Fresher', location: 'Mumbai', availability: 'Immediate' },
        { id: 6, name: 'Meena K.', position: 'Quality Checker', experience: '4 years', location: 'Ahmedabad', availability: '1 week notice' },
        { id: 7, name: 'Meena K.', position: 'Quality Checker', experience: '4 years', location: 'Ahmedabad', availability: '1 week notice' },
        { id: 8, name: 'Meena K.', position: 'Quality Checker', experience: '4 years', location: 'Ahmedabad', availability: '1 week notice' },
    ];
    
    const [currentPageJobs, setCurrentPageJobs] = useState(1);
    const [currentPageSeekers, setCurrentPageSeekers] = useState(1);
    const itemsPerPage = 4;
    
    const indexOfLastJob = currentPageJobs * itemsPerPage;
    const indexOfFirstJob = indexOfLastJob - itemsPerPage;
    const currentJobs = jobOpeningsData.slice(indexOfFirstJob, indexOfLastJob);
    const totalPagesJobs = Math.ceil(jobOpeningsData.length / itemsPerPage);
    
    const indexOfLastSeeker = currentPageSeekers * itemsPerPage;
    const indexOfFirstSeeker = indexOfLastSeeker - itemsPerPage;
    const currentSeekers = jobSeekersData.slice(indexOfFirstSeeker, indexOfLastSeeker);
    const totalPagesSeekers = Math.ceil(jobSeekersData.length / itemsPerPage);
    
    const paginateJobs = (pageNumber) => setCurrentPageJobs(pageNumber);
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

    return (
        <div className="relative w-full py-2 bg-white overflow-hidden">
            <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        SIGA <Highlight>Job Opportunities</Highlight>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Connecting SIGA members with talented professionals in the apparel sector
                    </p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                   
                    {/* Job Offer Section */}
<FeatureCard className="flex flex-col">
    <CardHeader className="pb-3  flex-shrink-0">
        <CardHeading
            icon={Briefcase}
            title="Job Offer"
            description="Post your job requirements"
        />
    </CardHeader>
    <CardContent className="flex-1   flex flex-col">
        <div className="p-3 flex-1  flex flex-col">
            <p className="text-gray-600 mb-6 flex-1">
                SIGA members - Are you looking for employees to work in your office, godown, accounts, 
                sales, or tailoring unit? Fill the form online and relax - SIGA is working for you.
            </p>
            <motion.button 
                whileHover={{ backgroundColor: "#333" }}
                transition={{ duration: 0.3 }}
                className="w-full py-3 px-6 bg-black text-white font-medium rounded-lg transition-colors flex items-center justify-center"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Post a Job Opening
            </motion.button>
        </div>
    </CardContent>
</FeatureCard>

{/* Job Require Section */}
<FeatureCard className="flex flex-col">
    <CardHeader className="pb-3 flex-shrink-0">
        <CardHeading
            icon={User}
            title="Job Require"
            description="Submit your resume"
        />
    </CardHeader>
    <CardContent className="flex-1 flex flex-col">
        <div className="p-3 flex-1 flex flex-col">
            <p className="text-gray-600 mb-6 flex-1">
                Looking for a job? Post your resume on the SIGA Job Portal to find the perfect position 
                in the apparel sector.
            </p>
            <motion.button 
                className="w-full py-3 px-6 border border-black text-black font-medium rounded-lg transition-colors flex items-center justify-center"
                whileHover={{ backgroundColor: "#f5f5f5" }}
                transition={{ duration: 0.3 }}
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Submit Your Resume
            </motion.button>
        </div>
    </CardContent>
</FeatureCard>
                </div>

                {/* Job Openings Section */}
                <div className="mb-16">
                    <motion.h2 
                        className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Briefcase className="w-6 h-6 text-yellow-600 mr-2" />
                        Current Job Openings
                    </motion.h2>
                    
                    <FeatureCard>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Position
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Job Type
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Salary
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Posted
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentJobs.map((job) => (
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
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    job.type === 'Full-time' ? 'bg-green-100 text-green-800' : 
                                                    job.type === 'Part-time' ? 'bg-blue-100 text-blue-800' : 
                                                    'bg-purple-100 text-purple-800'
                                                }`}>
                                                    {job.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <Map className="h-4 w-4 text-gray-400 mr-1" />
                                                    {job.location}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {job.salary}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {job.posted}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination */}
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
                    </FeatureCard>
                </div>

                {/* Membership CTA */}
                <motion.div 
                    className="relative p-8 rounded-xl bg-gradient-to-r from-yellow-400/70 to-yellow-600 text-center text-white mb-16"
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
                      className="absolute inset-0 opacity-80 "
                      style={{
                        backgroundImage: 'radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)',
                        backgroundSize: '60px 60px',
                        animation: ' 1.5s infinite',
                      }}
                    ></div>
                </div>

                    <h3 className="text-2xl font-semibold mb-3">Join SIGA Membership</h3>
                    <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
                        Any company or person working as a manufacturer, distributor, or agent in the apparel sector is eligible to join our growing network of professionals.
                    </p>
                    {/*
                    <motion.button 
                        className="py-2 px-8 bg-white hover:bg-gray-100 text-yellow-600 font-medium rounded-lg transition-colors shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Apply for Membership
                    </motion.button>
                     */}
                     <BecomeMember/>
                </motion.div>


                {/* Candidates Looking for Jobs Section */}
                <div>
                    <motion.h2 
                        className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <User className="w-6 h-6 text-purple-600 mr-2" />
                        Job Seekers
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
                                    {currentSeekers.map((seeker) => (
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination */}
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
                    </FeatureCard>
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