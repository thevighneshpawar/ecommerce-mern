import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/frontend_assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t'>

        <Title heading={'CONTACT US'}/>

      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img src={assets.contact_img} alt="" className=' w-full md:max-w-[400px]'/>
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'> Our Store</p>
            <p className='text-gray-500'>dummy address lkd,usa <br />,washington</p>
            <p className='text-gray-500'>Tel : +093939292 <br /> Email : Email@email.com</p>
            <p className='font-semibold text-xl text-gray-600'>Careers at forever</p>
            <p className='text-gray-500'>Learn more about our teams and job openings.</p>

            <button className='border border-black px-8 py-4 text-sm hover:bg-black
             hover:text-white transition-all duration-500'>Explore Jobs </button>

          </div>
      </div>

      <NewsLetterBox/>

    </div>
  )
}

export default Contact