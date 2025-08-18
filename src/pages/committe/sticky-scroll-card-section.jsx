// sticky-scroll-card-section.jsx

import React, { useState, useEffect, useRef } from 'react';

// --- Data for the feature cards ---
const features = [
  {
    title: "Managing Committee 2022-24",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit accusantium consequatur sunt voluptate iusto distinctio. Dolor quisquam voluptatibus distinctio eligendi labore eius optio nobis, in ipsa odio illo, accusamus veritatis.",
    imageUrl:
      "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
    bgColor: "bg-yellow-200 dark:bg-yellow-800",
    textColor: "text-gray-700 dark:text-gray-200",
  },
  {
    title: "Managing Committee 2022-24",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit accusantium consequatur sunt voluptate iusto distinctio. Dolor quisquam voluptatibus distinctio eligendi labore eius optio nobis, in ipsa odio illo, accusamus veritatis.",
    imageUrl:
      "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
    bgColor: "bg-red-200 dark:bg-red-800",
    textColor: "text-gray-700 dark:text-gray-200",
  },
  {
    title: "Managing Committee 2022-24",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit accusantium consequatur sunt voluptate iusto distinctio. Dolor quisquam voluptatibus distinctio eligendi labore eius optio nobis, in ipsa odio illo, accusamus veritatis.",
    imageUrl:
      "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
    bgColor: "bg-green-200 dark:bg-green-800",
    textColor: "text-gray-700 dark:text-gray-200",
  },
  {
    title: "Managing Committee 2022-24",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit accusantium consequatur sunt voluptate iusto distinctio. Dolor quisquam voluptatibus distinctio eligendi labore eius optio nobis, in ipsa odio illo, accusamus veritatis.",
    imageUrl:
      "https://southindiagarmentsassociation.com/assets/images/committee/ANURAG_SINGHLA_.jpg",
    bgColor: "bg-yellow-200 dark:bg-yellow-800",
    textColor: "text-gray-700 dark:text-gray-200",
  },
  
  
];


const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
};

// --- Header Component ---
// const AnimatedHeader = () => {
//   const [headerRef, headerInView] = useScrollAnimation();
//   const [pRef, pInView] = useScrollAnimation();

//   return (
//     <div className="text-center max-w-3xl mx-auto mb-16">
//       <h2
//         ref={headerRef}
//         className={`text-4xl md:text-5xl font-bold transition-all duration-700 ease-out text-gray-900 dark:text-white ${
//           headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//       >
//         Uncover Insights, Expose Nothing
//       </h2>
//       <p
//         ref={pRef}
//         className={`text-lg text-gray-600 dark:text-gray-300 mt-4 transition-all duration-700 ease-out delay-200 ${
//           pInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//       >
//         We aim to make on-device AI friction-free and production-ready
//       </p>
//     </div>
//   );
// };

// --- Main Component ---
export default function StickyFeatureSection() {
  return (
    <div className=" font-sans">
     
        <div className="max-w-[85rem] mx-auto">
          <section className=" flex flex-col items-center">
            {/* <AnimatedHeader /> */}

            <div className="w-full">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.bgColor} grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-16 sticky`}
                  style={{ top: "100px" }}
                >
                  {/* Card Content */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      {feature.title} 
                    </h3>
                    <p className={feature.textColor}>{feature.description}</p>
                  </div>

                  {/* Card Image */}
                  <div className="image-wrapper mt-8 md:mt-0">
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      loading="lazy"
                      className="w-auto h-auto rounded-lg shadow-lg object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
    
    </div>
  );
}
