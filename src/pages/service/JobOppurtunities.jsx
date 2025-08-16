import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { Calendar, Map, Briefcase, User, X, ArrowLeft } from 'lucide-react';
import BecomeMember from '@/components/becomeMember/BecomeMember';
import { Link } from 'react-router-dom';
import JobRequireForm from './JobRequireForm';
import JobOfferForm from './JobOfferForm';

const JobOpportunities = () => {
    const [activeView, setActiveView] = useState('main');
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
    const itemsPerPage = 5;
    
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
            <p className="mt-2 sm:mt-4 text-xl sm:text-2xl font-semibold">{description}</p>
        </div>
    );

    const FeatureCard = ({ children, className }) => (
        <Card className={cn('group relative rounded-none shadow-zinc-950/5 h-full flex flex-col', className)}>
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
if (activeView === 'offer') {
        return (
            <div className="relative w-full  bg-white overflow-hidden">
                <div className="">
                    <button 
                        onClick={() => setActiveView('main')}
                        className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Job Opportunities
                    </button>
                    <JobOfferForm onClose={() => setActiveView('main')} />
                </div>
            </div>
        );
    }

    if (activeView === 'require') {
        return (
            <div className="relative w-full  bg-white overflow-hidden">
                <div className="">
                    <button 
                        onClick={() => setActiveView('main')}
                        className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Job Opportunities
                    </button>
                    <JobRequireForm onClose={() => setActiveView('main')} />
                </div>
            </div>
        );
    }
    return (
        <div className="relative w-full py-4 sm:py-8 bg-white overflow-hidden">
             {/* Modal for Job Offer Form */}
          
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
                        SIGA <Highlight>Job Opportunities</Highlight>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                        Connecting SIGA members with talented professionals in the apparel sector
                    </p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
                    {/* Job Offer Section */}
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
                                    SIGA members - Are you looking for employees to work in your office, godown, accounts, 
                                    sales, or tailoring unit? Fill the form online and relax - SIGA is working for you.
                                </p>
                                <motion.button 
                                   onClick={() => setActiveView('offer')}
                                    whileHover={{ backgroundColor: "#333" }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-black text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Post a Job Opening
                                </motion.button>
                            </div>
                        </CardContent>
                    </FeatureCard>

                    {/* Job Require Section */}
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
                                    Looking for a job? Post your resume on the SIGA Job Portal to find the perfect position 
                                    in the apparel sector.
                                </p>
                                <motion.button 
                                  onClick={() => setActiveView('require')}
                                    className="w-full py-2 sm:py-3 px-4 sm:px-6 border border-black text-black text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
                                    whileHover={{ backgroundColor: "#f5f5f5" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Submit Your Resume
                                </motion.button>
                            </div>
                        </CardContent>
                    </FeatureCard>
                </div>

                {/* Job Openings Section */}
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
                                                <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{job.position}</h3>
                                                <div className="mt-1 flex flex-wrap gap-1 sm:gap-2">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                        job.type === 'Full-time' ? 'bg-green-100 text-green-800' : 
                                                        job.type === 'Part-time' ? 'bg-blue-100 text-blue-800' : 
                                                        'bg-purple-100 text-purple-800'
                                                    }`}>
                                                        {job.type}
                                                    </span>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                        <Map className="h-3 w-3 mr-1 text-gray-500" />
                                                        {job.location}
                                                    </span>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-xs sm:text-sm text-gray-500">
                                                        <span className="font-medium">Salary:</span> {job.salary}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Posted: {job.posted}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </FeatureCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* View More Link */}
                    <div className="mt-6 text-center">
                        <Link to="/jobopeningsection">
                            <motion.div 
                                className="inline-flex items-center text-sm sm:text-base font-medium text-yellow-600 hover:text-yellow-700 cursor-pointer"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                View all job openings
                                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.div>
                        </Link>
                    </div>
                </div>

                {/* Membership CTA */}
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
                                backgroundImage: 'radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)',
                                backgroundSize: '60px 60px',
                            }}
                        ></div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Join SIGA Membership</h3>
                    <p className="text-yellow-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-xs sm:text-sm">
                        Any company or person working as a manufacturer, distributor, or agent in the apparel sector is eligible to join our growing network of professionals.
                    </p>
                    <BecomeMember/>
                </motion.div>

                {/* Candidates Looking for Jobs Section */}
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
                                                <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{seeker.name}</h3>
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
                                                        <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                                            seeker.availability === 'Immediate' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {seeker.availability}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </FeatureCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* View More Link */}
                    <div className="mt-6 text-center">
                        <Link to="/candidatelooking-option">
                            <motion.div 
                                className="inline-flex items-center text-sm sm:text-base font-medium text-purple-600 hover:text-purple-700 cursor-pointer"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                View all job seekers
                                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.div>
                        </Link>
                    </div>
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