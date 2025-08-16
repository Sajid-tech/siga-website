import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

const LatestNews = () => {
    // Mock data for news articles
    const newsData = [
        {
            id: 1,
            date: '2023-06-15',
            title: 'SIGA Annual Conference 2023 Announced',
            content: 'The SIGA Annual Conference 2023 will be held in Mumbai from November 15-17. This year\'s theme is "Innovation in Apparel: Sustainable Futures". Members can register starting July 1st.',
        },
        {
            id: 2,
            date: '2023-06-10',
            title: 'New Trade Agreement Benefits Apparel Sector',
            content: 'The recently signed trade agreement between India and UAE is expected to boost apparel exports by 25%. SIGA has prepared a guide to help members take advantage of new opportunities.',
        },
        {
            id: 3,
            date: '2023-06-05',
            title: 'SIGA Launches Mentorship Program',
            content: 'SIGA is launching a mentorship program connecting industry veterans with new entrepreneurs. Applications for both mentors and mentees are now open until June 30th.',
        },
        {
            id: 4,
            date: '2023-05-28',
            title: 'Quarterly Market Trends Report Released',
            content: 'The Q2 2023 Apparel Market Trends Report is now available to SIGA members. The report analyzes shifting consumer preferences and emerging market opportunities.',
        },
        {
            id: 5,
            date: '2023-05-20',
            title: 'Workshop on Sustainable Manufacturing',
            content: 'Join our free workshop on implementing sustainable practices in apparel manufacturing. The event will be held on June 10th at SIGA headquarters.',
        },
        {
            id: 6,
            date: '2023-05-15',
            title: 'SIGA Member Discounts on Raw Materials',
            content: 'Exclusive partnership with leading suppliers offers SIGA members 10-15% discounts on fabrics and materials. Login to the member portal for details.',
        },
        {
            id: 7,
            date: '2023-05-10',
            title: 'Digital Marketing Webinar Series',
            content: 'Learn how to grow your apparel business online with our 4-part webinar series starting May 25th. Topics include social media, e-commerce, and more.',
        },
        {
            id: 8,
            date: '2023-05-05',
            title: 'New SIGA Regional Chapter in Bangalore',
            content: 'SIGA is expanding with a new regional chapter in Bangalore to better serve members in southern India. The inaugural meeting will be held on June 5th.',
        },
        {
            id: 9,
            date: '2023-04-28',
            title: 'Export Documentation Simplified',
            content: 'SIGA has partnered with customs officials to simplify export documentation for small and medium apparel businesses. New guidelines available now.',
        },
        {
            id: 10,
            date: '2023-04-20',
            title: 'Annual General Meeting Recap',
            content: 'Key decisions from the SIGA Annual General Meeting include new board members, updated bylaws, and plans for expanded member services in 2023-24.',
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(newsData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="relative w-full py-8 md:py-12 bg-white overflow-hidden">
            <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-8 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
                        SIGA <Highlight>Latest News</Highlight>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                        Stay updated with the latest news and insights from SIGA
                    </p>
                </motion.div>

                {/* News Cards Grid */}
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
                                            {new Date(news.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                                            {news.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 flex-1">
                                            {news.content.length > 100 
                                                ? `${news.content.substring(0, 100)}...` 
                                                : news.content}
                                        </p>
                                        <motion.button
                                            className="mt-auto w-full py-1 sm:py-2 px-3 sm:px-4 border border-black text-black text-sm sm:text-base font-medium rounded-lg transition-colors flex items-center justify-center"
                                            whileHover={{ backgroundColor: "#f5f5f5" }}
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

                {/* Pagination */}
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