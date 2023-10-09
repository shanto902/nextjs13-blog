import { Post } from "@/types/collection";
import { AppWindow, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from 'date-fns';
interface LayoutProps {
  post: Post;
  locale: string;
  customLayout: number;
}

const LayoutComponent = ({ post, locale, customLayout }: LayoutProps) => {

    const formattedDate = (dateString : string) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy'); // Format: 15 September 2023
      };
      
  return (
    <div
      key={post.id}
      className={` flex space-y-4 ${
        customLayout === 0
          ? " col-span-2 flex-col "
          : customLayout === 1
          ? "flex-col-reverse "
          : customLayout === 2
          ? "flex-col p-12"
          : customLayout === 3
          ? "flex-col-reverse mr-36"
          : customLayout === 4
          ? "flex-col-reverse "
          : customLayout === 5
          ? "flex-row-reverse justify-center gap-20"
          : customLayout === 6
          ? "flex-col-reverse "
          : customLayout === 7
          ? "flex-col p-12"
          : ""
      }`}
    >
      {/* For Container Text Layout  */}
      <div
        className={`${
          customLayout === 0
            ? ""
            : customLayout === 1
            ? " flex flex-col justify-start items-center px-16"
            : customLayout === 5
            ? " flex-1 "
            : ""
        }`}
      >
        {/* Title Div */}
        <h3
          className={`${
            customLayout === 0
              ? " text-3xl"
              : customLayout === 1
              ? " text-5xl underline-3 "
              : customLayout === 2
              ? " text-3xl"
              : customLayout === 3
              ? " text-3xl"
              : customLayout === 5
              ? " text-5xl underline-3 mt-6"
              : customLayout === 4
              ? " text-3xl "
              : customLayout === 6
              ? " text-3xl " 
              :  customLayout === 7
              ? " text-3xl " : ""
          } underline underline-offset-[12px] decoration-[#0064c6] pb-5 leading-relaxed py-4`}
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
              ? " "
              : ""
          } text-xl leading-snug line-clamp-6`}
        >
          {post.description}
        </p>

        {/* Origin Text  */}

        <div className=" gap-2 text-xs @md:text-sm flex flex-wrap items-center py-5 place-self-start">
          <User className="w-4 h-4" />
          <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
          <AppWindow className="w-4 h-4" />
          <div>{`${post.category.title}`}</div>
          <AppWindow className="w-4 h-4" />
          <div>
          {formattedDate(post.date_created)}
          </div>
        </div>
      </div>
      <Link href={`http://localhost:3000/${locale}/post/${post.slug}`}>
        <Image
          className={`${
            customLayout === 0
              ? " max-h-[540px] max-w-[850px]"
              : customLayout === 1
              ? "  max-h-[400px] max-w-[620px]"
              : customLayout === 2
              ? "max-h-[280px] max-w-[450px]"
              : customLayout === 3
              ? "max-h-[300px] max-w-[450px]"
              : customLayout === 4
              ? "max-h-[390px] max-w-[600px]"
              : customLayout === 5
              ? "max-h-[380px] max-w-[580px] "
              : ""
          }  object-cover object-center`}
          width={1000}
          height={1000}
          alt={post.title}
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
        ></Image>
      </Link>
    </div>
  );
};

export default LayoutComponent;
