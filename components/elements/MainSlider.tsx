"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import Image from "next/image";
import { Banner } from "@/types/collection";

type MainSliderProps = {
  banners: Banner[];
};

const MainSlider = ({ banners }: MainSliderProps) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper ">
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className=" h-full relative">
            <div className="absolute bottom-10 right-0 z-10 text-white text-right px-10">
              <h2 className="text-2xl">{banner.title}</h2>
              <p>{banner.description}</p>
            </div>
            <Image
              alt=""
              height={500}
              width={1200}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${banner.image}?key=optimized`}
              className="w-full object-cover object-center max-h-[500px] brightness-50"
              placeholder="blur"
              blurDataURL={banner.blurImg}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
