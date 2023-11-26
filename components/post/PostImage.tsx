"use client";
import React, { useState } from "react";
import ourPhoto from "@/assets/our-photo.jpeg";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Zoom from "react-medium-image-zoom";
import Image from "next/image";
import { Post } from "@/types/collection";
const PostImage = ({ post }: { post: Post }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <>
      {isImageLoaded ? (
        <Zoom>
          <Image
            style={{
              objectFit: "cover",
              aspectRatio: "5/4",
              objectPosition: post.image_position
                ? post.image_position
                : "center",
              width: "500px",
              height: "400px",
            }}
            alt={post.title}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
            width={500}
            height={400}
          />
        </Zoom>
      ) : (
        <Image
          style={{
            objectFit: "cover",
            aspectRatio: "5/4",
            objectPosition: post.image_position
              ? post.image_position
              : "center",
            width: "500px",
            height: "400px",
          }}
          alt={post.title}
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
          width={500}
          onLoad={handleImageLoad}
          height={400}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(500, 400)
          )}`}
        />
      )}
    </>
  );
};

export default PostImage;
