"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import parse from "html-react-parser";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Review } from "@/types/collection";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { shimmer, toBase64 } from "@/utils/shimmer";
import "./styles.css";
import PostBody from "../post/PostBody";
const BookSlider = ({
  reviews,
  locale,
}: {
  reviews: Review[];
  locale: string;
}) => {
  return (
    <div className=" ">
      <Swiper
        pagination={{
          type: "bullets",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper !z-[0]"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className=" px-10 py-10">
              <h3 className="text-center text-2xl font-semibold mb-5">
                {review.title}
              </h3>{" "}
              <Image
                className="mx-auto my-5"
                width={600}
                height={500}
                alt="Advertise Link"
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${review.book_cover}?key=optimized`}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(500, 500),
                )}`}
              />
              <PostBody body={review.review} locale={locale} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookSlider;
