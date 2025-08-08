import React from 'react';
import InfoCard from '../../components/Cards/InfoCard';

const Info = () => {
  return (
    <div className="w-full py-12 ">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard 
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1ZM10 6a2 2 0 0 1 4 0v1h-4V6Z"/>
                <path d="M12 13v4"/>
                <path d="m8 21 8-8"/>
              </svg>
            }
            title="Free Shipping"
            subtitle1="Free shipping on all US order or"
            subtitle2="order above $200"
          />
          
          <InfoCard 
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                <path d="M8 11h8"/>
                <path d="M8 15h8"/>
              </svg>
            }
            title="24X7 Support"
            subtitle1="Contact us 24 hours a day, 7"
            subtitle2="days a week"
          />
          
          <InfoCard 
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            }
            title="30 Days Return"
            subtitle1="Simply return it within 30 days"
            subtitle2="for an exchange"
          />
          
          <InfoCard 
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            }
            title="Payment Secure"
            subtitle1="Contact us 24 hours a day, 7"
            subtitle2="days a week"
          />
        </div>
      </div>
    </div>
  );
};

export default Info;