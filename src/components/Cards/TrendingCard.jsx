import React from 'react';

const TrendingCard = ({ item }) => {
  return (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-sm border border-gray-200 transition-shadow cursor-pointer">
      <div className="w-12 h-12 rounded-none overflow-hidden bg-gray-100">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-2">
        <h4 className="font-medium text-gray-800 text-sm leading-tight mb-2">
          {item.name}
        </h4>
        <p className="text-xs text-gray-500 mb-2">{item.category}</p>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-blue-600 text-sm">
            ${item.price}
          </span>
          {item.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${item.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;