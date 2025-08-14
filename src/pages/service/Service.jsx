import React, { useState } from 'react';
import { ChevronRight, Briefcase, CreditCard, Newspaper, TrendingUp, Users, MapPin } from 'lucide-react';
import JobOppurtunities from './JobOppurtunities';
import PaymentMediation from './PaymentMediation';
import LatestNews from './LatestNews';
import BuisnessExpansion from './BuisnessExpansion';
import EffortService from './EffortService';
import Directory from './Directory';

const Service = () => {
  const [activeMenu, setActiveMenu] = useState('job-opportunities');

  const menuItems = [
    {
      id: 'job-opportunities',
      title: 'Job Opportunities',
      icon: Briefcase,
      description: 'Explore career opportunities'
    },
    {
      id: 'payment-mediation',
      title: 'Payment Mediation',
      icon: CreditCard,
      description: 'Secure payment processing'
    },
    {
      id: 'latest-news',
      title: 'Latest News',
      icon: Newspaper,
      description: 'Industry news and updates'
    },
    {
      id: 'business-expansion',
      title: 'Business Expansion',
      icon: TrendingUp,
      description: 'Growth solutions'
    },
    {
      id: 'efforts',
      title: 'Efforts',
      icon: Users,
      description: 'Community initiatives'
    },
    {
      id: 'directory',
      title: 'Directory',
      icon: MapPin,
      description: 'Business network'
    }
  ];

  const renderContent = () => {
    switch(activeMenu) {
      case 'job-opportunities':
        return <JobOppurtunities />;
      case 'payment-mediation':
        return <PaymentMediation />;
      case 'latest-news':
        return <LatestNews />;
      case 'business-expansion':
        return <BuisnessExpansion />;
      case 'efforts':
        return <EffortService />;
      case 'directory':
        return <Directory />;
      default:
        return <JobOppurtunities />;
    }
  };

  return (
    <div className="w-full min-h-screen pt-32">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions for your business needs
          </p>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-6 md:gap-0">
      
          <div className="lg:w-64 w-full">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
              <nav className="space-y-1 bg-white p-1 border border-gray-200 ">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeMenu === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveMenu(item.id)}
                      className={`w-full text-left p-3 rounded-md transition-all duration-200 flex items-center gap-3 ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <div className={`p-2 rounded-md transition-colors ${
                        isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-medium truncate ${
                          isActive ? 'text-indigo-700' : 'text-gray-900'
                        }`}>
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight 
                        className={`w-4 h-4 transition-colors flex-shrink-0 ${
                          isActive ? 'text-indigo-500' : 'text-gray-400'
                        }`} 
                      />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

       
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="p-6 lg:p-8">
                <div className="min-h-[600px]">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Service;