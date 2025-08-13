import React from 'react';
import Footer from '../components/Footer/Footer';
import HeroHeader from '@/components/Navbar/HeroHeader';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
  
     <div className="fixed top-0 left-0 w-full z-50  ">
        <HeroHeader />
      </div>

   {/* // pt-36  */}
      <main className="flex-grow   "> 
        <div className="bg-[#FFFFFF]">
          {children}
        </div>
      </main>

      <Footer />
      {/* <AppBottombar/> */}
    </div>
   
  );
};

export default MainLayout;


