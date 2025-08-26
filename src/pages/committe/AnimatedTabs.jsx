/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AnimatedTabs = ({ 
  tabs = [], 
  defaultTab, 
  onTabChange, 
  className 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  useEffect(() => {
    if (defaultTab && defaultTab !== activeTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full flex flex-col gap-y-2", className)}>
      {/* Tab buttons */}
      <div className="flex gap-2 flex-wrap bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-md border border-blue-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-lg outline-none transition-colors hover:cursor-pointer",
              activeTab === tab.id 
                ? "text-blue-800" 
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-blue-100/80 shadow-inner rounded-lg border border-blue-200"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6 bg-white/90 backdrop-blur-sm shadow-sm rounded-xl  border border-blue-200 min-h-60 h-full">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  x: -10,
                  filter: "blur(10px)",
                }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  x: -10,
                  filter: "blur(10px)",
                }}
                transition={{
                  duration: 0.5,
                  ease: "circInOut",
                  type: "spring",
                }}
                className="h-full"
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };