import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface LayoutProps {
  post: Post;
  locale: string;
  customLayout: number;
}

const LayoutComponent = ({ post, locale, customLayout }: LayoutProps) => {
  return (
    <div
      key={post.id}
      className={` flex space-y-4 ${
        customLayout === 0
          ? " col-span-2 flex-col "
          : customLayout === 1
          ? "flex-col-reverse"
          : customLayout === 2
          ? "flex-col"
          : ""
      }`}
    >
      {/* For Container Text Layout  */}
      <div
        className={`${
          customLayout === 0
            ? ""
            : customLayout === 1
            ? " flex flex-col items-center"
            : ""
        }`}
      >
        {/* Title Div */}
        <h3
          className={`${
            customLayout === 0
              ? " text-3xl underline-2"
              : customLayout === 1
              ? " text-4xl underline-3 leading-relaxed max-w-[440px]"
              : ""
          } underline underline-offset-[12px] decoration-[#0064c6] pb-5`}
        >
          {" "}
          {post.title}
        </h3>

        {/* Description Div  */}

        <p
          className={`${
            customLayout === 0
              ? " max-w-[840px]"
              : customLayout === 1
              ? "max-w-[440px]"
              : ""
          } text-xl leading-snug`}
        >
          {post.description}
        </p>

        {/* Origin Text  */}

        <div>
          {post.author.first_name} {post.author.last_name}
        </div>
      </div>
      <Link href={`http://localhost:3000/${locale}/post/${post.slug}`}>
        <Image
          className={`${
            customLayout === 0
              ? " max-h-[540px]"
              : customLayout === 1
              ? "  max-h-[400px]"
              : ""
          }  object-cover object-center`}
          width={840}
          height={550}
          alt={post.title}
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
        ></Image>
      </Link>
    </div>
  );
};

export default LayoutComponent;
