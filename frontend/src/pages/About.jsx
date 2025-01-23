import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from  '../components/NewsLetterBox'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title heading={'ABOUT US'}/>
      </div>

     <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias minima explicabo ipsa minus ducimus, molestiae nulla iusto sapiente, adipisci laudantium eius fugit impedit libero repudiandae fuga beatae facilis eos nihil.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. uia voluptatibus neque. Vitae, expedita labore. Autem ex placeat ad illum ea. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam animi perferendis nostrum soluta vitae impedit dolore veniam ducimus exercitationem asperiores beatae, accusamus, voluptates quaerat aperiam pariatur, debitis nulla eveniet necessitatibus.</p>
            <b className='text-gray-600'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sapiente illo officiis provident, esse explicabo dolorem iste ratione! Pariatur in eum asperiores natus architecto repellendus quae officiis dolorum. Cupiditate, quasi?
            Aut mollitia distinctio, saepe sed iure sequi. Sunt, rem quam nostrum nulla ipsa quis modi tempora repudiandae animi a aliquid suscipit repellendus ducimus pariatur magnam natus sed? Magnam, mollitia natus!</p>
        </div>
     </div>

     <div className='text-4xl mt-2 flex flex-start'>
          <Title heading={'WHY CHOOSE US -----'}/>
     </div>

     <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, praesentium doloremque eius officiis fugiat harum corrupti aspernatur blanditiis distinctio ex maxime soluta, optio unde sapiente eaque nemo a et porro!</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Conveinece</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, praesentium doloremque eius officiis fugiat harum corrupti aspernatur blanditiis distinctio ex maxime soluta, optio unde sapiente eaque nemo a et porro!</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, praesentium doloremque eius officiis fugiat harum corrupti aspernatur blanditiis distinctio ex maxime soluta, optio unde sapiente eaque nemo a et porro!</p>
        </div>

     </div>

     <NewsLetterBox/>

    </div>
  )
}

export default About