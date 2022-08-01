import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function App () {
  const stays = require('../../assets/datas/stays.json')

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#EB5757',
          '--swiper-pagination-color': '#EB5757'
        }}
        spaceBetween={30}
        effect='fade'
        centeredSlides
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className='w-full h-full'
      >
        {stays.map((stay) => {
          return (
            <SwiperSlide className='w-full h-full'>
              <Link to={`/stays/${stay.id}`}>
                <div className='relative'>
                  <img className='w-full h-full object-cover' src={stay.photo} />
                  <div className='absolute right-1 top-1'>
                    <div className='flex items-center text-white'>
                      <AiFillStar className='text-salmon h-full' />
                      {stay.rating}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
