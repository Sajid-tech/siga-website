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



/////////////////////////////////////////////////
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';

const fetchGallery = async () => {
  const response = await fetch('https://southindiagarmentsassociation.com/public/api/getGallery');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const GallerySection = ({ title, images }) => {
  // Get year from title
  const year = title.match(/\d{4}/)?.[0] || '';
  const venue = title.split('_').pop().replace(/_/g, ' ');

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold mr-4">
          {year}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {title.replace(/_/g, ' ').replace('autum', 'Autumn')}
          </h2>
        </div>
      </div>
      
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4"
      >
        {images.map((image, index) => (
          <motion.div
            key={`${title}-${index}`}
            whileHover={{ scale: 1.02 }}
            className="mb-4 relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <LazyLoadImage
              src={image}
              alt={`Gallery image ${index + 1}`}
              effect="opacity"
              className="w-full h-auto object-cover"
              width="100%"
              height="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium text-sm bg-black/50 px-2 py-1 rounded">
                Image #{index + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </Masonry>
    </motion.div>
  );
};

const Gallery = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <h3 className="font-bold mb-2">Error loading gallery</h3>
          <p>{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded text-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Filter out the "code" property and get gallery sections in reverse chronological order
  const gallerySections = Object.entries(data)
    .filter(([key]) => key !== 'code')
    .sort(([a], [b]) => {
      const yearA = a.match(/\d{4}/)?.[0] || 0;
      const yearB = b.match(/\d{4}/)?.[0] || 0;
      return yearB - yearA;
    });

  return (
    <div className="min-h-screen bg-white pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SIGA <span className="relative inline-block">
              <span className="relative z-10">Gallery</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-300 -rotate-1 -z-0"></span>
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A visual journey through our events and exhibitions
          </p>
        </motion.div>

        <div className="space-y-20">
          {gallerySections.map(([title, images]) => (
            <GallerySection key={title} title={title} images={images} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;

import { cn } from "@/lib/utils"
import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronRight, Menu, X } from 'lucide-react'
import { Button } from "../ui/button"
const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Event', href: '/event' },

    { name: 'Service', href: '/service' },
    { name: 'Others', href: '/other' },
]
const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
const navigate = useNavigate()
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-999 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-white max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={()=>navigate(item.href)}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link to="#">
                                        <span>Become Member</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link to="/contact">
                                        <span>Contact</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <Link to="#">
                                        <span>Become Member</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default HeroHeader

const Logo = ({ className }) => {
    return (
        // <img
        //     src="https://southindiagarmentsassociation.com/assets/images/logo.png"
        //     alt="Company Logo"
        //     className={cn('h-10 w-auto', className)}
        // />
        <LazyLoadImage
   alt="Company Logo"
effect="blur"
  src="https://southindiagarmentsassociation.com/assets/images/logo.png"
  className={cn('h-12 w-auto', className)}
  />
    )
}


// ------------------------------------------------

// sticky-scroll-card-section.jsx

import React, { useState, useEffect, useRef } from 'react';

// --- Data for the feature cards ---
const features = [
  {
    title: "Managing Committee 2022-24",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit accusantium consequatur sunt voluptate iusto distinctio. Dolor quisquam voluptatibus distinctio eligendi labore eius optio nobis, in ipsa odio illo, accusamus veritatis.",
    imageUrl:
      "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
    bgColor: "bg-yellow-200 dark:bg-yellow-800",
    textColor: "text-gray-700 dark:text-gray-200",
  },
  {
    title: "Managing Committee 2022-24",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit accusantium consequatur sunt voluptate iusto distinctio. Dolor quisquam voluptatibus distinctio eligendi labore eius optio nobis, in ipsa odio illo, accusamus veritatis.",
    imageUrl:
      "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
    bgColor: "bg-red-200 dark:bg-red-800",
    textColor: "text-gray-700 dark:text-gray-200",
  },
  {
    title: "Managing Committee 2022-24",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit accusantium consequatur sunt voluptate iusto distinctio. Dolor quisquam voluptatibus distinctio eligendi labore eius optio nobis, in ipsa odio illo, accusamus veritatis.",
    imageUrl:
      "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
    bgColor: "bg-green-200 dark:bg-green-800",
    textColor: "text-gray-700 dark:text-gray-200",
  },
  {
    title: "Managing Committee 2022-24",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit accusantium consequatur sunt voluptate iusto distinctio. Dolor quisquam voluptatibus distinctio eligendi labore eius optio nobis, in ipsa odio illo, accusamus veritatis.",
    imageUrl:
      "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
    bgColor: "bg-yellow-200 dark:bg-yellow-800",
    textColor: "text-gray-700 dark:text-gray-200",
  },
  
  
];


const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
};

// --- Header Component ---
// const AnimatedHeader = () => {
//   const [headerRef, headerInView] = useScrollAnimation();
//   const [pRef, pInView] = useScrollAnimation();

//   return (
//     <div className="text-center max-w-3xl mx-auto mb-16">
//       <h2
//         ref={headerRef}
//         className={`text-4xl md:text-5xl font-bold transition-all duration-700 ease-out text-gray-900 dark:text-white ${
//           headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//       >
//         Uncover Insights, Expose Nothing
//       </h2>
//       <p
//         ref={pRef}
//         className={`text-lg text-gray-600 dark:text-gray-300 mt-4 transition-all duration-700 ease-out delay-200 ${
//           pInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//       >
//         We aim to make on-device AI friction-free and production-ready
//       </p>
//     </div>
//   );
// };

// --- Main Component ---
export default function StickyFeatureSection() {
  return (
    <div className=" font-sans">
     
        <div className="max-w-[85rem] mx-auto">
          <section className=" flex flex-col items-center">
            {/* <AnimatedHeader /> */}

            <div className="w-full">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.bgColor} grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-16 sticky`}
                  style={{ top: "100px" }}
                >
                  {/* Card Content */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      {feature.title} 
                    </h3>
                    <p className={feature.textColor}>{feature.description}</p>
                  </div>

                  {/* Card Image */}
                  <div className="image-wrapper mt-8 md:mt-0">
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      loading="lazy"
                      className="w-auto h-auto rounded-lg shadow-lg object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
    
    </div>
  );
}
// --------------------------------------------------------------------------------------------------------------

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/effect-cards"
import { EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

export const CardSwipe = ({
  images,
  autoplayDelay = 1500,
  slideShadows = false,
}) => {
  const css = `
    .card-swipe .swiper {
 
   
      padding: 30px;
      margin: 0 auto;
    }
    
    .card-swipe .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
    }
    
    .card-swipe .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    @media (max-width: 768px) {
      .card-swipe .swiper {
        height: 300px;
        max-width: 500px;
      }
    }
    
    @media (max-width: 480px) {
      .card-swipe .swiper {
        height: 250px;
        max-width: 350px;
      }
    }
  `
  
  return (
    <section className="card-swipe w-full  ">
      <style>{css}</style>
      <div className="flex w-full items-center  justify-center">
        <div className="w-full ">
          <Swiper
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
            }}
            effect="cards"
            grabCursor={true}
            loop={true}
            slidesPerView="auto"
            rewind={true}
            cardsEffect={{
              slideShadows: slideShadows,
            }}
            modules={[EffectCards, Autoplay, Pagination, Navigation]}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="size-full  rounded-3xl">
                  <img
                    src={image.src}
                    className="size-full  rounded-xl object-cover"
                    alt={image.alt}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};


// ---------------------------------------------------------------
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { TextEffect } from "@/components/ui/text-effect";
import BecomeMember from "@/components/becomeMember/BecomeMember";

const images = [
  "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG",
  "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2466.JPG",
  "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2480.JPG",
  "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG",
  "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2466.JPG",
  "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2480.JPG",
  "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG",
  "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2466.JPG",
  "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2480.JPG",
];

const duplicatedImages = [...images, ...images];

export function HeroSection() {
  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 50s linear infinite;
        }

       

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
      <main className="overflow-hidden  ">
        <section className="relative  ">
          <div className="relative pt-24 md:pt-36">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />

            <BackgroundBeamsWithCollision>
              <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-[40%] w-full">
                    <div className="text-center lg:text-left">
                      <Link
                        href="#link"
                        className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto lg:mx-0 flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                      >
                        <span className="text-foreground text-sm">
                          Welcome to the Siga, Bengaluru
                        </span>
                        <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                        <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                          <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                            <span className="flex size-6">
                              <ArrowRight className="m-auto size-3" />
                            </span>
                            <span className="flex size-6">
                              <ArrowRight className="m-auto size-3" />
                            </span>
                          </div>
                        </div>
                      </Link>

                      <div className="mt-8 max-w-5xl mx-auto lg:mx-0 lg:mt-16 flex flex-col lg:flex-row items-center gap-6">
                        {/* Right side - Three rows */}
                        <div className="flex flex-col justify-center text-center lg:text-left order-1 lg:order-2">
                          {/* Celebrating */}
                          <TextEffect
                            className=" text-6xl md:text-7xl  xl:text-[5.25rem] text-balance "
                            preset="slide"
                            per="word"
                            delay={0.4}
                          >
                            Celebrating
                          </TextEffect>

                          {/* 30 Years */}
                          <div className="flex items-center justify-center lg:justify-start mt-2">
                            <TextEffect
                              className="text-6xl md:text-8xl font-semibold leading-none bg-gradient-to-b from-red-400 to-indigo-500 bg-clip-text text-transparent"
                              preset="slide"
                              per="char"
                              delay={0.6}
                            >
                              30
                            </TextEffect>

                            <TextEffect
                              className="text-6xl md:text-7xl  xl:text-[5.25rem] ml-2"
                              preset="slide"
                              per="word"
                              delay={0.7}
                            >
                              Years
                            </TextEffect>
                          </div>

                          {/* of SIGA */}
                          <TextEffect
                            className="text-6xl md:text-7xl  xl:text-[5.25rem] mt-2 "
                            preset="slide"
                            per="word"
                            delay={0.8}
                          >
                            of SIGA
                          </TextEffect>
                        </div>
                        
                      </div>
                   <div>
                   <TextEffect
                                              className="lg:mx-0 mt-4 md:mt-6 max-w-xl mx-auto line-clamp-5 text-balance text-sm md:text-base description-text px-2 sm:px-0"
                                              preset="fade"
                                              per="line"
                                              delay={0.8}
                                            >
                                              In the history of modern astronomy, there is probably
                                              no one greater leap forward than the building and
                                              launch of the space telescope known as the Hubble.
                                            </TextEffect>
                     
                   </div>

                     
                    </div>
                  </div>

                  <div className="lg:w-[60%]   relative w-full mt-12 lg:mt-0 p-2">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/90 to-indigo-50/20"></div>
                      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-indigo-300/25 blur-[100px]"></div>
                      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/25 blur-[100px]"></div>
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
                          backgroundSize: "50px 50px",
                        }}
                      ></div>
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)",
                          backgroundSize: "60px 60px",
                          animation: "moveBackground 20s infinite alternate",
                        }}
                      ></div>
                    </div>

                    <div className="w-full  relative overflow-hidden flex items-center justify-center">
                      {/* Scrolling images container */}
                      <div className=" z-10 w-full  flex items-center justify-center py-8">
                        <div className="scroll-container w-full max-w-6xl">
                          <div className="infinite-scroll flex gap-6 w-max">
                            {duplicatedImages.map((image, index) => (
                              <div
                                key={index}
                                className="image-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-80 rounded-xl overflow-hidden shadow-2xl"
                              >
                                <img
                                  src={image}
                                  alt={`Gallery image ${
                                    (index % images.length) + 1
                                  }`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="relative p-4 mt-2 rounded-xl border border-white/20 backdrop-blur-lg text-center text-white mb-16 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 193, 7, 1) 0%, rgba(245, 158, 11, 1) 100%)",
                        boxShadow: "0 8px 32px rgba(251, 191, 36, 0.3)",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-500/15"></div>

                        <motion.div
                          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-yellow-400/10 blur-xl"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-amber-500/15 blur-xl"></div>
                      </div>

                      <div className="relative z-10">
                        <div className="flex flex-row items-center justify-between">
                          <h3 className="text-2xl font-medium mb-3 text-yellow-900 drop-shadow-md">
                            Join SIGA Membership
                          </h3>

                          <BecomeMember />
                        </div>

                        <p className="text-yellow-950">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Error iusto totam nesciunt voluptas, quam
                          inventore ducimus accusantium
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </BackgroundBeamsWithCollision>
          </div>
        </section>
      </main>
    </>
  );
}


// -------------------------------------------------------------------
<div className=" flex items-center justify-center">
           
           <img
           src='https://i.postimg.cc/9MhQnP8Y/commingson.png'
           alt='Comming soon pic'

           
           />
          
      </div>