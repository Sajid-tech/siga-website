import React, { useState } from "react";
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
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useCompanyData } from "../../hooks/useCompanyData";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { supportPhone, supportWhatsapp } = useCompanyData();
  const location = useLocation();

  
  const { scrollY } = useScroll();
  


  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(10px)", "blur(0px)"]);
  const backgroundColor = useTransform(
    scrollY, 
    [0, 100], 
    ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0)"]
  );
  const boxShadow = useTransform(
    scrollY, 
    [0, 100], 
    ["0 4px 20px rgba(0, 0, 0, 0.08)", "0 0px 0px rgba(0, 0, 0, 0)"]
  );
  const contactBarOpacity = useTransform(scrollY, [0, 50], [1, 0]);
  const contactBarHeight = useTransform(scrollY, [0, 50], ["auto", "0px"]);
  const logoHeight = useTransform(scrollY, [0, 100], ["2.5rem", "2rem"]);
  const navbarHeight = useTransform(scrollY, [0, 100], ["7rem", "5rem"]);

  const navbarVariants = {
    hidden: { 
      y: -20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
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
    { name: "Event", path: "/event" },
    { name: "Gallery", path: "/gallery" },
    { name: "Member", path: "/member" },
    { name: "Service", path: "/service" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-xl overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        style={{
          width: "calc(100% - 2rem)",
          maxWidth: "85rem",
          backdropFilter: backdropBlur,
          backgroundColor: backgroundColor,
          boxShadow: boxShadow,
          height: navbarHeight
        }}
      >
        {/* Top Contact Bar - Animated with scroll */}
        <motion.div 
          className="bg-gray-100 border-b border-gray-200 px-6 py-2"
          style={{
            opacity: contactBarOpacity,
            height: contactBarHeight,
            overflow: "hidden"
          }}
        >
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
        </motion.div>

        {/* Main Navigation */}
        <div className="bg-opacity-90 px-6 flex-1 flex items-center">
          <div className="flex items-center justify-between w-full h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0 flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              style={{
                height: useTransform(scrollY, [50, 100], ["auto", "4rem"]),
                padding: useTransform(scrollY, [50, 100], ["0px", "8px"]),
                backgroundColor: useTransform(scrollY, [50, 100], ["transparent", "rgba(255, 255, 255, 1)"]),
                borderRadius: useTransform(scrollY, [50, 100], ["0px", "16px"])
              }}
            >
              <motion.img
                src="https://southindiagarmentsassociation.com/assets/images/logo.png"
                alt="Logo"
                className="transition-all duration-300"
                style={{
                  height: logoHeight
                }}
              />
            </motion.div>

            {/* Desktop Navigation Menu */}
            <motion.div 
              className="hidden md:flex items-center space-x-1"
              style={{
                height: useTransform(scrollY, [50, 100], ["auto", "4rem"]),
                padding: useTransform(scrollY, [50, 100], ["0px", "8px"]),
                backgroundColor: useTransform(scrollY, [50, 100], ["transparent", "rgba(255, 255, 255, 1)"]),
                borderRadius: useTransform(scrollY, [50, 100], ["0px", "16px"])
              }}
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  variants={menuItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.div
                    onClick={() => navigate(item.path)}
                    className="px-3 py-2 rounded-md cursor-pointer font-medium text-gray-700 hover:text-blue-600 transition-all duration-300"
                    style={{
                      fontSize: useTransform(scrollY, [0, 100], ["1rem", "0.875rem"])
                    }}
                  >
                    {item.name}
                  </motion.div>
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute bottom-1 left-3 right-3 h-0.5 bg-blue-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl bg-white rounded-lg shadow-xl z-40 md:hidden overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="py-3 px-4 rounded-md hover:bg-gray-50 cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className={`font-medium ${
                    location.pathname === item.path ? "text-blue-600" : "text-gray-800"
                  }`}>
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="px-4 py-3 border-t border-gray-100 flex justify-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <motion.div 
        style={{
          height: navbarHeight
        }}
      />
    </>
  );
};

export default Navbar;