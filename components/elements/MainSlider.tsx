"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import Image from "next/image";
import { Banner } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Link from "next/link";

type MainSliderProps = {
  banners: Banner[];
  locale: string;
};

const MainSlider = ({ banners, locale }: MainSliderProps) => {
  return (
    <Swiper
      autoplay={true}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper !z-[0]"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <Link
            href={`/${locale}/${banner.link}`}
            className=" h-full relative "
          >
            <div className="absolute w-full right-0 z-10 bg-gradient-to-b from-transparent opacity-80 to-black h-full text-black text-right px-10">
              <div className=" flex flex-col gap-3 justify-end items-end h-full md:py-10 py-5 text-white">
                <h2 className="xl:text-3xl lg:text-2xl md:text-xl text-base ">
                  {banner.title}
                </h2>
                <p className=" xl:text-xl lg:text-lg md:text-md text-sm">
                  {banner.description}
                </p>
              </div>
            </div>
            <Image
              alt="Banner"
              height={675}
              width={1200}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${banner.image}?key=optimized`}
              className="w-full object-cover object-center md:aspect-video aspect-[5/4]"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(1200, 675),
              )}`}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
