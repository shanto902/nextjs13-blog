'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css'

import Image from 'next/image';

const MainSlider = () => {

  
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper ">
        <SwiperSlide><div className=' h-full relative'>
          <div className='absolute bottom-10 right-0 z-10 text-white text-right px-10'>
            <h2 className='text-2xl'>hulahula</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus odio modi fugiat? Illum consectetur, quo rem tenetur fugiat accusantium vitae numquam iste autem aut aliquid dignissimos quasi hic nobis corrupti!</p>
          </div>
        <Image
          alt=''
          height={500}
          width={1200}
          src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHw2fHxOZXclMjBZb3J8ZW58MHx8fHwxNjcwMjUzMzMw&ixlib=rb-4.0.3"
          className="w-full object-cover object-center max-h-[500px] brightness-50"
        /></div></SwiperSlide>
        <SwiperSlide><Image
          alt=''
          height={500}
          width={1200}
          src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHw2fHxOZXclMjBZb3J8ZW58MHx8fHwxNjcwMjUzMzMw&ixlib=rb-4.0.3"
          className="w-full object-cover object-center max-h-[500px]"
        /></SwiperSlide>
 
 
      </Swiper>
  );
};

export default MainSlider;
