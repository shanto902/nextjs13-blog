"use client";
import React from "react";
import ourPhoto from "@/assets/our-photo.jpeg";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Zoom from "react-medium-image-zoom";
import Image from "next/image";
const OurPhotoZoom = () => {
  return (
    <Zoom>
      <Image
        src={ourPhoto}
        alt="Logo"
        width={1280}
        height={720}
        className=" aspect-vide max-w-[129px]"
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(135, 76))}`}
      />
    </Zoom>
  );
};

export default OurPhotoZoom;
