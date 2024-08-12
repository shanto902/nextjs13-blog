"use client";
import { useState } from "react";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Zoom from "react-medium-image-zoom";
import Image from "next/image";
import { Post } from "@/types/collection";
import { ErrorBoundary } from "./ImageWtithZoom";
const PostImage = ({ post }: { post: Post }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <>
      {isImageLoaded ? (
        <ErrorBoundary>
          <Zoom>
            <Image
              className="max-h-[70vh] object-cover"
              alt={post.title}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
              width={800}
              height={600}
            />
          </Zoom>
        </ErrorBoundary>
      ) : (
        <Image
          className="max-h-[70vh] object-cover"
          alt={post.title}
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
          width={800}
          onLoad={handleImageLoad}
          height={600}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(800, 600)
          )}`}
        />
      )}
    </>
  );
};

export default PostImage;
