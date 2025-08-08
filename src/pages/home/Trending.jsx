import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import trending from '../../assets/home/trending.jpg';
import TrendingCard from '../../components/Cards/TrendingCard';


const Trending = () => {
     const [currentIndexTrending, setCurrentIndexTrending] = useState(0);
      const [currentIndexTopRated, setCurrentIndexTopRated] = useState(0);
      const [currentIndexTopSelling, setCurrentIndexTopSelling] = useState(0);
  const trendingItems = [
    {
      id: 1,
      name: "Healthy Nutmix, 200g Pa...",
      category: "Driedfruit",
      price: "45.00",
      originalPrice: "52.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/10_1.jpg"
    },
    {
      id: 2,
      name: "Organic Fresh Tomato",
      category: "Vegetables",
      price: "30.00",
      originalPrice: "35.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/11_1.jpg"
    },
    {
        id: 3,
        name: "Coffee With Chocolate C...",
        category: "Coffee",
        price: "65.00",
        originalPrice: "82.00",
        image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/19_1.jpg"
      },
    {
      id: 4,
      name: "Fresh Lichi",
      category: "Coffee",
      price: "65.00",
      originalPrice: "82.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/25_1.jpg"
    },
    {
      id: 5,
      name: "Berry & Graps Mix Snack",
      category: "Coffee",
      price: "65.00",
      originalPrice: "82.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/5_1.jpg"
    },
    {
      id: 6,
      name: "Fruits",
      category: "Coffee",
      price: "65.00",
      originalPrice: "82.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/29_1.jpg"
    }
  ];

  const topRatedItems = [
    {
      id: 1,
      name: "Ginger - Organic",
      category: "Vegetables",
      price: "65.00",
      originalPrice: "82.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/17_1.jpg"
    },
    {
      id: 2,
      name: "Dates Value Pouch Date...",
      category: "Driedfruit",
      price: "78.00",
      originalPrice: "85.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/2_2.jpg"
    },
    {
      id: 3,
      name: "Blue Berry",
      category: "Fruits",
      price: "30.00",
      originalPrice: "35.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/23_1.jpg"
    },
    {
        id: 4,
        name: "Fresh Lichi",
        category: "Coffee",
        price: "65.00",
        originalPrice: "82.00",
        image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/25_1.jpg"
      },
      {
        id: 5,
        name: "Berry & Graps Mix Snack",
        category: "Coffee",
        price: "65.00",
        originalPrice: "82.00",
        image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/5_1.jpg"
      },
      {
        id: 6,
        name: "Fruits",
        category: "Coffee",
        price: "65.00",
        originalPrice: "82.00",
        image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/29_1.jpg"
      }
  ];

  const topSellingItems = [
    {
      id: 1,
      name: "Lemon - Seedless",
      category: "Vegetables",
      price: "45.00",
      originalPrice: "52.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/18_1.jpg"
    },
    {
      id: 2,
      name: "Mango - Kesar",
      category: "Fruits",
      price: "65.00",
      originalPrice: "82.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/28_1.jpg"
    },
    {
      id: 3,
      name: "Mixed Nuts & Almonds D...",
      category: "Driedfruit",
      price: "11.00",
      originalPrice: "19.00",
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/7_2.jpg"
    },
    {
        id: 4,
        name: "Fresh Lichi",
        category: "Coffee",
        price: "65.00",
        originalPrice: "82.00",
        image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/25_1.jpg"
      },
      {
        id: 5,
        name: "Berry & Graps Mix Snack",
        category: "Coffee",
        price: "65.00",
        originalPrice: "82.00",
        image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/5_1.jpg"
      },
      {
        id: 6,
        name: "Fruits",
        category: "Coffee",
        price: "65.00",
        originalPrice: "82.00",
        image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/29_1.jpg"
      }
  ];
  const handleNext = (setCurrentIndex, items) => {
    setCurrentIndex(prevIndex => 
      prevIndex + 3 >= items.length ? 0 : prevIndex + 3
    );
  };

  const handlePrev = (setCurrentIndex, items) => {
    setCurrentIndex(prevIndex => 
      prevIndex - 3 < 0 ? items.length - (items.length % 3 || 3) : prevIndex - 3
    );
  };

  const getVisibleItems = (items, currentIndex) => {
    return items.slice(currentIndex, currentIndex + 3);
  };
  return (
    <div className="w-full py-12">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Image Card */}
          <div className="lg:col-span-1">
            <div className="relative  rounded-sm p-6 h-full min-h-[400px] overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Our Top Most Products Check It Now
                </h2>
                <button className="bg-blue-900 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-sm font-medium transition-colors">
                  Shop Now
                </button>
              </div>
              <div className="absolute bottom-0 right-0 w-full h-full">
                <img 
                  src={trending}
                  alt="Trending products"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
          </div>

          {/* Right Content - 3 Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
           
            <div className=" rounded-sm ">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Trending <span className="text-blue-900">Items</span>
                </h3>
                <div className="flex space-x-1">
                                  <button 
                                    className="p-1 hover:bg-gray-200 rounded"
                                    onClick={() => handlePrev(setCurrentIndexTrending, trendingItems)}
                                  >
                                    <ChevronLeft size={18} className="text-gray-600" />
                                  </button>
                                  <button 
                                    className="p-1 hover:bg-gray-200 rounded"
                                    onClick={() => handleNext(setCurrentIndexTrending, trendingItems)}
                                  >
                                    <ChevronRight size={18} className="text-gray-600" />
                                  </button>
                                </div>
              </div>
              <div className="space-y-4 ">
                 {getVisibleItems(trendingItems, currentIndexTrending).map(item => (
                                  <TrendingCard key={item.id} item={item} />
                                ))}
              </div>
            </div>
            <div className=" rounded-sm ">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                Top <span className="text-blue-900">Rated</span>
                </h3>
                <div className="flex space-x-1">
                                  <button 
                                    className="p-1 hover:bg-gray-200 rounded"
                                    onClick={() => handlePrev(setCurrentIndexTopRated, topRatedItems)}
                                  >
                                    <ChevronLeft size={18} className="text-gray-600" />
                                  </button>
                                  <button 
                                    className="p-1 hover:bg-gray-200 rounded"
                                    onClick={() => handleNext(setCurrentIndexTopRated, topRatedItems)}
                                  >
                                    <ChevronRight size={18} className="text-gray-600" />
                                  </button>
                                </div>
              </div>
              <div className="space-y-4 ">
                 {getVisibleItems(topRatedItems, currentIndexTopRated).map(item => (
                                 <TrendingCard key={item.id} item={item} />
                               ))}
              </div>
            </div>
            <div className=" rounded-sm ">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                Top <span className="text-blue-900">Selling</span>
                </h3>
                <div className="flex space-x-1">
                                  <button 
                                    className="p-1 hover:bg-gray-200 rounded"
                                    onClick={() => handlePrev(setCurrentIndexTopSelling, topSellingItems)}
                                  >
                                    <ChevronLeft size={18} className="text-gray-600" />
                                  </button>
                                  <button 
                                    className="p-1 hover:bg-gray-200 rounded"
                                    onClick={() => handleNext(setCurrentIndexTopSelling, topSellingItems)}
                                  >
                                    <ChevronRight size={18} className="text-gray-600" />
                                  </button>
                                </div>
              </div>
              <div className="space-y-4 ">
                {getVisibleItems(topSellingItems, currentIndexTopSelling).map(item => (
                                 <TrendingCard key={item.id} item={item} />
                               ))}
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;