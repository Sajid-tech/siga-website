import React from 'react';
import loaderOuter from '../../assets/images/loaderouter.png';
import loaderNew from '../../assets/images/loader-new.png';


const SuspenseLoader = () => {
  return (
    <div className="min-h-screen  bg-amber-50/10 flex items-center justify-center">
      <div className="relative w-56 h-56">
        
        <img
                 src={loaderOuter}
          alt="outerlayer"
          className="absolute top-0 left-0 w-full h-full animate-[spin_10s_linear_infinite]"
        />
       
        <img
                  src={loaderNew}
          alt="insidelayer"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
        />
      </div>
    </div>
  );
};

export default SuspenseLoader;
