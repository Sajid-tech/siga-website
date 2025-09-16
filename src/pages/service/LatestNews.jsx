import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BASE_URL from '@/config/BaseUrl';

const LatestNews = () => {
    const { data: newsData = [], isLoading, isError } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const response = await axios.get(  `${BASE_URL}/api/getNews`);
            return response.data.data;
        }
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedNews, setSelectedNews] = useState(null);
    const itemsPerPage = 6;
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(newsData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleReadMore = (news) => {
        setSelectedNews(news);
    };

    const handleBack = () => {
        setSelectedNews(null);
    };

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

    const NewsSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-12">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
                <div key={index} className="h-full flex flex-col">
                    <div className="group relative rounded-none shadow-zinc-950/5 border border-gray-200 h-full">
                        <div className="p-4 sm:p-6 flex-1 flex flex-col h-full">
                            <Skeleton height={20} width={150} className="mb-3" />
                            <Skeleton height={24} className="mb-3" />
                            <Skeleton count={3} className="mb-4" />
                            <Skeleton height={36} className="mt-auto" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="relative w-full  bg-white overflow-hidden">
            <div className="relative z-10 max-w-[85rem] mx-auto ">
                <AnimatePresence mode="wait">
                    {selectedNews ? (
                        <motion.div
                            key="detail-view"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg"
                        >
                            <button
                                onClick={handleBack}
                                className="flex items-center text-gray-700 hover:text-lime-600 mb-6 transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Back to News
                            </button>

                            <FeatureCard className="mb-8">
                                <CardContent className="p-4">
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {selectedNews.news_date ? new Date(selectedNews.news_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'Date not available'}
                                    </div>
                                    
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                        {selectedNews.news_heading || 'No title'}
                                    </h1>
                                    
                                    {selectedNews.news_sub_title && (
                                        <h2 className="text-xl text-gray-700 mb-6 italic">
                                            {selectedNews.news_sub_title}
                                        </h2>
                                    )}
                                    
                                    {selectedNews.news_department && (
                                        <div className="inline-block bg-lime-100 text-lime-800 text-sm font-medium px-3 py-1 rounded-md mb-6">
                                            {selectedNews.news_department}
                                        </div>
                                    )}
                                    
                                    <div className="prose max-w-none mb-8">
                                        <p className="text-gray-700 leading-7 whitespace-pre-line">
                                            {selectedNews.news_details || 'No content available'}
                                        </p>
                                    </div>
                                    
                                    {selectedNews.news_link && selectedNews.news_link !== 'null' && (
                                        <motion.a
                                            href={selectedNews.news_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                           className="mt-auto w-full py-1 sm:py-2 hover:cursor-pointer px-3 sm:px-4 border border-black bg-lime-300 hover:bg-lime-600 hover:text-white text-black text-sm sm:text-base font-medium rounded-lg transition-colors flex items-center justify-center"
                                        >
                                            Visit Source
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </motion.a>
                                       
                                    )}
                                </CardContent>
                            </FeatureCard>
                        </motion.div>
                    ) : (
                        <div
                            key="list-view"
                            // initial={{ opacity: 0, y: 20 }}
                            // animate={{ opacity: 1, y: 0 }}
                            // exit={{ opacity: 0, y: -20 }}
                            // transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-4">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                                    SIGA <Highlight>Latest News</Highlight>
                                </h1>
                                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                                    Stay updated with the latest news and insights from SIGA
                                </p>
                            </div>

                            {isError && (
                                <div className="text-center py-12">
                                    <p className="text-red-500 text-lg">Failed to load news. Please try again later.</p>
                                </div>
                            )}

                            {isLoading && <NewsSkeleton />}

                            {!isLoading && !isError && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-12">
                                        {currentItems.map((news) => (
                                            <motion.div
                                                key={news.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                viewport={{ once: true }}
                                            >
                                                <FeatureCard className="h-full flex flex-col">
                                                    <CardContent className="flex-1 flex flex-col">
                                                        <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                                            <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                                                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                                                {news.news_date ? new Date(news.news_date).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                }) : 'Date not available'}
                                                            </div>
                                                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                                                                {news.news_heading || 'No title'}
                                                            </h3>
                                                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 flex-1">
                                                                {news.news_details ? (
                                                                    news.news_details.length > 100 
                                                                        ? `${news.news_details.substring(0, 100)}...` 
                                                                        : news.news_details
                                                                ) : 'No content available'}
                                                            </p>
                                                            <motion.button
                                                                onClick={() => handleReadMore(news)}
                                                                className="mt-auto w-full py-1 sm:py-2 hover:cursor-pointer px-3 sm:px-4 border border-black bg-lime-300 hover:bg-lime-600 text-black text-sm sm:text-base font-medium rounded-lg transition-colors flex items-center justify-center"
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                Read More
                                                            </motion.button>
                                                        </div>
                                                    </CardContent>
                                                </FeatureCard>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {totalPages > 1 && (
                                        <div className="flex justify-center mt-6 md:mt-8">
                                            <nav className="flex items-center space-x-1 sm:space-x-2">
                                                <button
                                                    onClick={() => paginate(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className={`p-1 sm:p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                                >
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                                    <button
                                                        key={number}
                                                        onClick={() => paginate(number)}
                                                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md text-sm sm:text-base ${currentPage === number ? 'bg-lime-100 text-lime-600 border border-lime-300' : 'text-gray-700 hover:bg-gray-100'}`}
                                                    >
                                                        {number}
                                                    </button>
                                                ))}

                                                <button
                                                    onClick={() => paginate(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className={`p-1 sm:p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                                >
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </nav>
                                        </div>
                                    )}
                                </>
                            )}

                            {!isLoading && !isError && newsData.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No news available at the moment.</p>
                                </div>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LatestNews;

const Highlight = ({ children, className }) => {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{children}</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-lime-300/70 -rotate-1 -z-0"></span>
        </span>
    );
};