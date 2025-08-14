import React, { useEffect, useRef } from 'react';

const VerticalDottedText = () => {
  const text = "SIGA";
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
 
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lettersRef.current.forEach((letter, index) => {
            letter.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
            letter.style.opacity = 1;
            letter.style.transform = 'translateY(0)';
            
            if (dotsRef.current[index]) {
              dotsRef.current[index].style.transition = `opacity 0.3s ease ${index * 0.1 + 0.2}s`;
              dotsRef.current[index].style.opacity = 0.6;
            }
          });
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className=" hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
    >
      <div className="flex flex-col items-center space-y-4">
        {text.split('').map((char, index) => (
          <div key={index} className="flex flex-col items-center">
          
            <span 
              ref={el => lettersRef.current[index] = el}
              className="text-xs font-light text-gray-600 tracking-widest transition-all duration-300 hover:text-blue-400 hover:scale-110"
              style={{
                opacity: 0,
                transform: 'translateY(10px)',
                willChange: 'transform, opacity'
              }}
            >
              {char === ' ' ? '' : char}
            </span>
            
        
            {index < text.length - 1 && char !== ' ' && (
              <div 
                ref={el => dotsRef.current[index] = el}
                className="w-1 h-1 bg-gray-300 rounded-full mt-2 transition-all duration-500 hover:bg-blue-400 hover:scale-150"
                style={{
                  opacity: 0,
                  willChange: 'transform, opacity, background-color'
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalDottedText;