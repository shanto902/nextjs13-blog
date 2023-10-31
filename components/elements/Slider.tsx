"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import Image from "next/image";
import { Post } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Link from "next/link";

const Slider = ({
  studentPosts,
  locale,
}: {
  studentPosts: Post[];
  locale: string;
}) => {
  return (
    <Swiper navigation={true} modules={[Navigation]}>
      {studentPosts.map((post) => (
        <SwiperSlide key={post.id}>
          <Link href={`/${locale}/${post.category.slug}/${post.slug}`}>
            <Image
              alt=""
              height={360}
              width={600}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.cover_photo ? post.cover_photo : post.image}?key=optimized`}
              className=" object-cover object-center max-h-[360px] aspect-[5/4]"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(600, 360),
              )}`}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
