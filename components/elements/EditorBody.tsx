"use client";
import parse from "html-react-parser";
import Image from "next/image";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { useState } from "react";

const EditorBody = ({ body, locale }: { body: string; locale: string }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;
        return (
          <Image
            className=" w-full object-cover object-center h-auto max-h-[300px] md:max-h-[600px] "
            src={src}
            alt={alt}
            width={1280}
            height={620}
            onLoad={handleImageLoad}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(1280, 620),
            )}`}
          />
        );
      }
    },
  };

  const getParsedHtml = (body: string) => {
    return parse(body, options);
  };

  return <div className=" rich-text">{getParsedHtml(body)}</div>;
};

export default EditorBody;
