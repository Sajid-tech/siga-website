import React from 'react'

const Efforts = () => {
  return (
    <div className="relative w-full pt-28  bg-white overflow-hidden">
    <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div 
            className="text-center mb-8 sm:mb-12 md:mb-16"
          
        >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                SIGA <Highlight>Efforts</Highlight>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                Explore the SIGA Directory to connect members and discover opportunities in the apparel industry.
            </p>
        </div>

        {/* Search and Filter Section */}
        <div className=" flex items-center justify-center">
           
             <img
             src='https://i.postimg.cc/9MhQnP8Y/commingson.png'
             alt='Comming soon pic'

             
             />
            
        </div>

        

      
    </div>
</div>
  )
}
const Highlight = ({ children, className }) => {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{children}</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-green-300/70 -rotate-1 -z-0"></span>
        </span>
    );
};
export default Efforts