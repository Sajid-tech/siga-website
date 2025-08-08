import React, { useState, useMemo } from 'react';
import { Star, StarHalf, ShoppingCart, Eye, ChevronDown, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../../components/Cards/ProductCard';
import ProductViewCard from '../../components/Cards/ProductViewCard';

const CategoriesFilterProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [selectedTags, setSelectedTags] = useState(['Clothes', 'Fruits', 'Snacks', 'Dairy', 'Seafood', 'Fastfood', 'Toys', 'Perfume', 'Jewelry', 'Bags']);
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedRating, setSelectedRating] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Sample product data
  const products = [
    {
      id: 1,
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/6_1.jpg",
          hoverImage: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/6_2.jpg",
      title: 'Dates Value Pack Pouch',
      category: 'Dried Fruits',
      price: '78.00',
      originalPrice: '85.00',
      rating: 4.5,
      weight: '500g',
      onSale: true,
      isNew: false
    },
    {
      id: 2,
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/3_1.jpg",
      hoverImage: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/3_2.jpg",
      title: 'Crunchy Triangle Chips Snacks',
      category: 'Chips & Fries',
      price: '59.00',
      originalPrice: '67.00',
      rating: 4.0,
      weight: '200g',
      onSale: true,
      isNew: false
    },
    {
      id: 3,
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/9_1.jpg",
      hoverImage: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/9_2.jpg",
      title: 'Californian Almonds Value Pack',
      category: 'Dried Fruits',
      price: '58.00',
      originalPrice: '65.00',
      rating: 4.5,
      weight: '500g',
      onSale: true,
      isNew: false
    },
    {
      id: 4,
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/9_1.jpg",
      hoverImage: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/9_2.jpg",
      title: 'Banana Chips Snacks & Spices',
      category: 'Foods',
      price: '45.00',
      originalPrice: '50.00',
      rating: 4.0,
      weight: '250g',
      onSale: false,
      isNew: true
    },
    {
      id: 5,
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/3_1.jpg",
      hoverImage: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/3_2.jpg",
      title: 'Berry & Graps Mix Snack',
      category: 'Snacks',
      price: '25.00',
      originalPrice: '35.00',
      rating: 4.5,
      weight: '300g',
      onSale: false,
      isNew: true
    },
    {
      id: 6,
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/3_1.jpg",
          hoverImage: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/3_2.jpg",
      title: 'Mixed Nuts Seeds & Berries Pack',
      category: 'Dried Fruits',
      price: '45.00',
      originalPrice: '55.00',
      rating: 4.0,
      weight: '400g',
      onSale: true,
      isNew: false
    },
    {
      id: 7,
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/9_1.jpg",
      hoverImage: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/9_2.jpg",
      title: 'Mixed Nuts & Almonds Dry Fruits',
      category: 'Foods',
      price: '49.00',
      originalPrice: '65.00',
      rating: 3.5,
      weight: '350g',
      onSale: true,
      isNew: false
    },
    {
      id: 8,
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/2_1.jpg",
      hoverImage: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/2_2.jpg",
      title: 'Smoked Honey Spiced Nuts',
      category: 'Snacks',
      price: '32.00',
      originalPrice: '45.00',
      rating: 4.0,
      weight: '300g',
      onSale: false,
      isNew: false
    },
    {
      id: 9,
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/1_1.jpg",
      hoverImage: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/1_2.jpg",
      title: 'Premium Cashew Nuts',
      category: 'Dried Fruits',
      price: '89.00',
      originalPrice: '95.00',
      rating: 4.8,
      weight: '500g',
      onSale: true,
      isNew: false
    },
    {
      id: 10,
      image: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/6_1.jpg",
          hoverImage: "https://maraviyainfotech.com/projects/grabit-react/assets/img/product-images/6_2.jpg",
      title: 'Organic Trail Mix',
      category: 'Snacks',
      price: '42.00',
      originalPrice: '50.00',
      rating: 4.2,
      weight: '300g',
      onSale: false,
      isNew: true
    }
  ];


  const categories = [
    { name: 'Dried Fruits', icon: '🍎', selected: false },
    { name: 'Chips & Fries', icon: '🍟', selected: false },
    { name: 'Foods', icon: '🍲', selected: false },
    { name: 'Snacks', icon: '🍿', selected: false }
  ];

  const weights = ['200g', '250g', '300g', '350g', '400g', '500g'];

  const handleTagRemove = (tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const clearAllTags = () => {
    setSelectedTags([]);
  };

  const handleProductView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
   
      const categoryMatch = selectedCategories.length === 0 || 
        selectedCategories.some(category => product.category.includes(category));
      
     
      const weightMatch = selectedWeights.length === 0 || 
        selectedWeights.some(weight => product.weight.includes(weight));
      
    
      const price = parseFloat(product.price);
      const priceMatch = price >= priceRange[0] && price <= priceRange[1];
      
     
      const searchMatch = !searchTerm || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
     
      const ratingMatch = selectedRating === 'all' || 
        (selectedRating === '4+' && product.rating >= 4) ||
        (selectedRating === '3+' && product.rating >= 3) ||
        (selectedRating === '2+' && product.rating >= 2);
      
      return categoryMatch && weightMatch && priceMatch && searchMatch && ratingMatch;
    });

  
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [products, selectedCategories, selectedWeights, priceRange, searchTerm, selectedRating, sortBy]);

  
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedWeights, priceRange, searchTerm, selectedRating, sortBy]);

  return (
    <div className="w-full py-8">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className=" w-80 space-y-6">
          
            <div className="bg-white rounded-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Category</h3>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
              <hr className="mb-4 text-gray-200"/>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`category-${index}`}
                      checked={selectedCategories.includes(category.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories(prev => [...prev, category.name]);
                        } else {
                          setSelectedCategories(prev => prev.filter(c => c !== category.name));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`category-${index}`} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

           
            <div className="bg-white rounded-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Weight</h3>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
              <hr className="mb-4 text-gray-200"/>
              <div className="space-y-3">
                {weights.map((weight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`weight-${index}`}
                      checked={selectedWeights.includes(weight)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedWeights(prev => [...prev, weight]);
                        } else {
                          setSelectedWeights(prev => prev.filter(w => w !== weight));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`weight-${index}`} className="text-sm text-gray-700 cursor-pointer">
                      {weight}
                    </label>
                  </div>
                ))}
              </div>
            </div>

          
            <div className="bg-white rounded-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Price</h3>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
              <hr className="mb-4 text-gray-200"/>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">From</span>
                  <span className="text-sm text-gray-600">To</span>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value || 0), priceRange[1]])}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-400">—</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value || 250)])}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="250"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right  - Products */}
          <div className="flex-1">
       
            <div className="bg-white rounded-md border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                
                  <div className="flex items-center space-x-2">
                    {selectedTags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          onClick={() => handleTagRemove(tag)}
                          className="ml-1 hover:text-blue-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedTags.length > 0 && (
                      <button
                        onClick={clearAllTags}
                        className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                 
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowSearch(!showSearch)}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Search className="w-4 h-4 text-gray-600" />
                    </button>
                    {showSearch && (
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
                        autoFocus
                      />
                    )}
                  </div>
                  
              
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Ratings</option>
                    <option value="4+">4+ Stars</option>
                    <option value="3+">3+ Stars</option>
                    <option value="2+">2+ Stars</option>
                  </select>
                  
                 
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="default">Sort by</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentProducts.map((product) => (
                <ProductCard
                key={product.id}
                image={product.image}
                hoverImage={product.hoverImage}
                title={product.title}
                category={product.category}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                onSale={product.onSale}
                isNew={product.isNew}
                weight={product.weight}
                onViewProduct={() => handleProductView(product)}
              />
              ))}
            </div>

           
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

           
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedProduct && (
    <ProductViewCard 
      isOpen={isModalOpen} 
      onClose={handleCloseModal}
      product={selectedProduct}
    />
  )}
    </div>
  );
};

export default CategoriesFilterProduct;