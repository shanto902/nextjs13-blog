import { Post } from "@/types/collection";
import { AppWindow, PanelRightCloseIcon, User } from "lucide-react";
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
    <Link
      href={`/${locale}/${post.category.slug}/${post.slug}`}
      key={post.id}
      className={`@container flex justify-center space-y-2 ${
        customLayout === 0
          ? "md:flex-col  "
          : customLayout === 1
          ? " "
          : customLayout === 2
          ? "md:flex-col md:p-12 "
          : customLayout === 3
          ? " md:mr-24"
          : customLayout === 4
          ? " "
          : customLayout === 5
          ? "md:selection:flex-row-reverse md:justify-center md:gap-20"
          : customLayout === 6
          ? " "
          : customLayout === 7
          ? "md:flex-col md:p-12"
          : ""
      }  flex-col-reverse `}
    >
      {/* For Container Text Layout  */}
      <div
        className={`${
          customLayout === 0
            ? ""
            : customLayout === 1
            ? " md:flex md:flex-col md:justify-start md:items-center md:px-16"
            : customLayout === 5
            ? " md:flex-1 "
            : ""
        }`}
      >
        {/* Title Div */}
        <h3
          className={`${
            customLayout === 0
              ? "@lg:text-2xl @md:text-xl"
              : customLayout === 1
              ? " @lg:text-3xl @md:text-2xl"
              : customLayout === 2
              ? " @lg:text-2xl @md:text-xl"
              : customLayout === 3
              ? " @lg:text-2xl @md:text-xl"
              : customLayout === 5
              ? " @lg:text-3xl @md:text-2xl"
              : customLayout === 4
              ? " @lg:text-2xl @md:text-xl "
              : customLayout === 6
              ? " @lg:text-2xl @md:text-xl"
              : customLayout === 7
              ? " @lg:text-2xl @md:text-xl "
              : ""
          } underline  decoration-[#0064c6] @md:pb-5 leading-relaxed py-4 text-xl`}
        >
          {" "}
          {post.title}
        </h3>

        {/* Description Div  */}

        <p
          className={` @lg:text-lg @md:text-md text-base leading-snug line-clamp-6`}
        >
          {post.description}
        </p>

        {/* Origin Text  */}

        <div className=" gap-2 text-xs @md:text-sm flex flex-wrap items-center py-5 place-self-start">
         
        <div className=" flex flex-row items-center gap-2"><User className="w-4 h-4" />{`${post.author.first_name} ${post.author.last_name}`}</div>
        
        <div className=" flex flex-row items-center gap-2"><PanelRightCloseIcon className="w-4 h-4" />{`${post.category.title}`}</div>
        
        <div className=" flex flex-row items-center gap-2"> <AppWindow className="w-4 h-4" />
          {new Date(post.date_created).toLocaleDateString(`${locale}`, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        </div>

</div>
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
        }  w-full object-cover object-center h-full`}
        width={1000}
        height={1000}
        alt={post.title}
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
      ></Image>
    </Link>
  );
};

export default LayoutComponent;
