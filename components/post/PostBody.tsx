"use client";
import parse from "html-react-parser";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "./overlayStyle.css";
import { useState } from "react";

const PostBody = ({ body, locale }: { body: string; locale: string }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setTimeout(function () {
      setIsImageLoaded(true);
    }, 1000);
  };
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;
        return (
          <>
            {!isImageLoaded ? (
              <Image
                className=" w-full object-cover object-center md:p-5  h-auto  "
                src={src}
                alt={alt}
                width={1280}
                height={620}
                onLoad={handleImageLoad}
        
              />
            ) : (
              <Zoom>
                <Image
                  className=" w-full object-cover object-center md:p-5 h-auto "
                  src={src}
                  alt={alt}
                  width={1280}
                  height={620}

                />
              </Zoom>
            )}
          </>
        );
      }
    },
  };

  const getParsedHtml = (body: string) => {
    return parse(body, options);
  };

  return (
    <div className={`${locale === "bn" ? "rich-text " : "rich-text-en"} `}>
      {getParsedHtml(body)}
    </div>
  );
};

export default PostBody;
