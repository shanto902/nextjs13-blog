'use client'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import Image from 'next/image';
import { StudentPost } from '@/types/collection';

const Slider = ({studentPosts}: {studentPosts:StudentPost[]}) => {
    console.log(studentPosts)
  return (
    <Swiper navigation={true} modules={[Navigation]} >
    {studentPosts.map((post) => (
      <SwiperSlide key={post.id}>
          <Image
            alt=""
            height={360}
            width={600}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
            className=" object-cover object-center max-h-[360px]"
          />
      </SwiperSlide>
    ))}
  </Swiper>
  )
}

export default Slider