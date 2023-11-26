"use client";
import React from "react";
import ourPhoto from "@/assets/our-photo.jpeg";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Zoom from "react-medium-image-zoom";
import Image from "next/image";
import { ErrorBoundary } from "../post/ImageWtithZoom";
const OurPhotoZoom = ({ footer_image }: { footer_image: string }) => {
  return (
    <ErrorBoundary>
      <Zoom>
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${footer_image}?key=optimized`}
          alt="Logo"
          width={1280}
          height={720}
          className=" aspect-vide max-w-[129px]"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(135, 76)
          )}`}
        />
      </Zoom>
    </ErrorBoundary>
  );
};

export default OurPhotoZoom;
