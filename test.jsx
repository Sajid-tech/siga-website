import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";


import {
  Phone,
  MessageCircleCode,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useCompanyData } from "../../hooks/useCompanyData";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { supportPhone, supportWhatsapp } = useCompanyData();
  const location = useLocation();

 

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
  
 
    handleScroll();
  
   
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);
  

  // const navbarVariants = {
  //   hidden: { y: -20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: { duration: 0.4 },
    
  //   },
  //   scrolled: {
  //     backdropFilter: "blur(10px)",
  //     backgroundColor: "rgba(255, 255, 255, 0.95)",
  //     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  //     transition: { duration: 0.3 }
  //   }
  // };
  const navbarVariants = {
    hidden: { 
      y: -20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      transition: { duration: 0.4 }
    },
    scrolled: {
      // backdropFilter: "blur(10px)",
      backdropFilter: "none", 
      // backgroundColor: "rgba(255, 255, 255, 0.95)",
      backgroundColor: "transparent", 
      boxShadow: "none",            
      // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      transition: { duration: 0.3 }
    }
  };
  
  const menuItemVariants = {
    hover: { 
      y: -2,
      color: "#2563eb",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Event", path: "/categories" },
    { name: "Gallery", path: "/products" },
    { name: "Member", path: "/contact" },
    { name: "Service", path: "/contact" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Floating Navbar Deck */}
      <motion.div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-xl overflow-hidden"
        initial="hidden"
        animate={["visible", isScrolled ? "scrolled" : ""]}
        variants={navbarVariants}
        style={{
          width: "calc(100% - 2rem)",
          maxWidth: "85rem"
        }}
      >
        {/* Top Contact Bar - Only visible when not scrolled */}
        {!isScrolled && (
          <div className="bg-gray-100 border-b border-gray-200 px-6 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <a
                  href={`tel:${supportPhone}`}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Phone size={12} />
                  <span>{supportPhone}</span>
                </a>
                <a
                  href={`tel:${supportWhatsapp}`}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <MessageCircleCode size={12} />
                  <span>{supportWhatsapp}</span>
                </a>
              </div>

              <div className="flex items-center space-x-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-600 hover:text-blue-600"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className=" bg-opacity-90 px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className={`flex-shrink-0 ${isScrolled?"   h-16 p-2 bg-white rounded-2xl":""}  flex items-center cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
            >
              <img
                src="https://southindiagarmentsassociation.com/assets/images/logo.png"
                alt="Logo"
                className={`transition-all duration-300 ${
                  isScrolled ? "h-8  " : "h-10"
                }`}
              />
            </motion.div>

            {/* Desktop Navigation Menu */}
            <div className={`hidden ${isScrolled ?"h-16 p-2 bg-white rounded-2xl ":""}2 md:flex items-center space-x-1`}>
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  variants={menuItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div
                    onClick={() => navigate(item.path)}
                    className={`px-3 py-2 rounded-md cursor-pointer font-medium ${
                      isScrolled ? "text-sm" : "text-base"
                    } text-gray-700 hover:text-blue-600 transition-all duration-300`}
                  >
                    {item.name}
                  </div>
                  <motion.div
                    className="absolute bottom-1 left-3 right-3 h-0.5 bg-blue-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed top-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl bg-white rounded-lg shadow-xl z-40 md:hidden overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-2 space-y-1">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                className="py-3 px-4 rounded-md hover:bg-gray-50 cursor-pointer"
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className="font-medium text-gray-800">{item.name}</span>
              </motion.div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-100 flex justify-center space-x-6">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-600 hover:text-blue-600"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className={`h-28 transition-all duration-300 ${isScrolled ? "h-20" : ""}`} />
    </>
  );
};

export default Navbar;

// this is perfect


// import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

