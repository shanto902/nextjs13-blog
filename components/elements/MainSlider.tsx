"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import Image from "next/image";
import { Banner } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";

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
              <h2 className="xl:text-2xl lg:text-xl md:text-lg text-base">
                {banner.title}
              </h2>
              <p className=" xl:text-xl lg:text-xl md:text-lg text-sm">
                {banner.description}
              </p>
            </div>
            <Image
              alt=""
              height={675}
              width={1200}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${banner.image}?key=optimized`}
              className="w-full object-cover object-center md:aspect-video aspect-[5/4] brightness-50"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(1200, 675),
              )}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
