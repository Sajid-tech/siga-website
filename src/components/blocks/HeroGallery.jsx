import React from 'react'

import { PhotoGallery } from '../ui/photo-gallery';
import { ShuffleHero } from '../ui/shuffle-grid';



 const  HeroGallery = () => {
  return (

    <div className="w-full py-12 ">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
      <PhotoGallery  /> 
      <ShuffleHero/>
       </div>
       </div>
  )
}
export  default HeroGallery
