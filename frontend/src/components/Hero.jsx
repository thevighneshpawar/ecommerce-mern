import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center border border-gray-400 max-w-7xl mx-auto">

      <div className='w-full sm:w-1/2 px-4 sm:px-16 py-10 sm:py-16'>
        <div className='text-[#414141] text-center sm:text-left space-y-4 sm:space-y-6'>

          <div className='flex items-center gap-2 sm:gap-4 justify-center sm:justify-start'>
            <div className='w-8 md:w-11 h-[2px] bg-[#414141]'></div>
            <p className='font-medium text-sm md:text-base tracking-wider'>OUR BESTSELLERS</p>
          </div>

          <h1 className='prata-regular text-3xl sm:text-4xl lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          
          <div className='flex items-center gap-2 sm:gap-4 justify-center sm:justify-start'>
            <p className='font-semibold text-sm md:text-base tracking-wider hover:text-primary cursor-pointer transition-colors'>
              SHOP NOW
            </p>
            <div className='w-8 md:w-11 h-[2px] bg-[#414141]'></div>
          </div>
        </div>
      </div>

      <div className='w-full sm:w-1/2'>
        <img 
          className='w-full h-full object-cover' 
          src={assets.hero_img} 
          alt="Latest fashion arrivals"
        />
      </div>

    </div>
  );
};

export default Hero;
