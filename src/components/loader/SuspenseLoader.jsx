import React from 'react';

const SuspenseLoader = () => {
  return (
    <div className="min-h-screen  bg-amber-50/10 flex items-center justify-center">
      <div className="relative w-48 h-48">
        
        <img
          src="./loader/loaderouter.png"
          alt="outerlayer"
          className="absolute top-0 left-0 w-full h-full animate-[spin_10s_linear_infinite]"
        />
       
        <img
          src="./loader/loader.png"
          alt="insidelayer"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36"
        />
      </div>
    </div>
  );
};

export default SuspenseLoader;
