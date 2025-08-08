import React from 'react';

import hero1 from '../../assets/home/img3.jpg';
import hero2 from '../../assets/home/img4.jpg';
import FeatureCard from '../../components/Cards/FeatureCard';

const Featured = () => {
  return (
    <div className="w-full py-8">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeatureCard 
            image={hero1}
            discount="70% Off"
            title1="Tasty Snack"
            title2="& Fastfood"
            subtitle1="The Flavor Of"
            subtitle2="Something Special"
          />
          
          <FeatureCard 
            image={hero2}
            discount="50% Off"
            title1="Fresh Fruits"
            title2="& Veggies"
            subtitle1="A Healthy Meal For"
            subtitle2="Every One"
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;