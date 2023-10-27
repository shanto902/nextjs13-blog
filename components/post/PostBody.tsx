"use client";
import parse from "html-react-parser";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "./overlayStyle.css";
import { getBlurData } from "@/utils/blur-data-generator";

const PostBody = ({ body, locale }: { body: string; locale: string }) => {
  const fetchAndProcessData = async (imageUrl: string) => {
    try {
      const { base64 } = await getBlurData(imageUrl);
      // Process the base64 data here or return it
      return base64;
    } catch (error) {
      console.error("Error fetching and processing data:", error);
      // Handle the error appropriately
      return null;
    }
  };

  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;
        return (
          <Zoom>
            <Image
              className=" w-full object-cover object-center h-auto max-h-[300px] md:max-h-[600px] "
              src={src}
              alt={alt}
              width={1280}
              height={620}
              placeholder="blur"
              blurDataURL={src && fetchAndProcessData(src)}
            />
          </Zoom>
        );
      }
    },
  };

  const getParsedHtml = (body: string) => {
    return parse(body, options);
  };

  return <div className=" rich-text">{getParsedHtml(body)}</div>;
};

export default PostBody;
