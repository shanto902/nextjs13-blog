import { Post } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { AppWindow, PanelRightCloseIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LayoutProps {
  post: Post;
  locale: string;
  categorySlug: string;
  index: number;
}

const LayoutComponent = ({
  post,
  locale,
  categorySlug,
  index,
}: LayoutProps) => {
  return (
    <div
      key={post.id}
      className={`@container flex space-y-2  gap-4 justify-between
      ${
        categorySlug === "news" || categorySlug === "concepts"
          ? "flex-col-reverse"
          : ""
      } ${
        categorySlug === "arts" || categorySlug === "heritage"
          ? (categorySlug === "arts" || categorySlug === "heritage") &&
            index % 2 === 1
            ? "flex-col"
            : "flex-col-reverse"
          : ""
      } ${
        categorySlug === "personality" || categorySlug === "dialogue"
          ? (categorySlug === "personality" || categorySlug === "dialogue") &&
            index % 2 === 0
            ? "flex-col"
            : "flex-col-reverse"
          : ""
      } 
      ${
        categorySlug === "projects" ||
        categorySlug === "environment-and-planning"
          ? (categorySlug === "projects" ||
              categorySlug === "environment-and-planning") &&
            index % 2 === 0
            ? "flex-col"
            : "flex-col-reverse"
          : ""
      }  `}
    >
      {/* For Container Text Layout  */}
      <div>
        {/* Title Div */}
        <Link
          href={`/${locale}/${post.category.slug}/${post.slug}`}
          className={` underline  decoration-red-700 @md:pb-5 leading-relaxed py-4 text-xl`}
        >
          {post.title}
        </Link>

        {/* Description Div  */}

        <Link
          href={`/${locale}/${post.category.slug}/${post.slug}`}
          className={` @lg:text-lg @md:text-md text-base leading-snug line-clamp-6`}
        >
          {post.description}
        </Link>
        {/* Origin Text  */}
        <div className=" gap-2 text-xs @md:text-sm flex flex-wrap items-center py-5 place-self-start">
          <div className=" flex flex-row items-center gap-2">
            <User className="w-4 h-4" />
            {`${post.author.first_name} ${post.author.last_name}`}
          </div>

          <Link
            href={`/${locale}/${post.category.slug}`}
            className=" flex flex-row items-center gap-2"
          >
            <PanelRightCloseIcon className="w-4 h-4" />
            {`${post.category.title}`}
          </Link>

          <div className=" flex flex-row items-center gap-2">
            {" "}
            <AppWindow className="w-4 h-4" />
            {new Date(post.date_created).toLocaleDateString(`${locale}`, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
      <div>
        <Link href={`/${locale}/${post.category.slug}/${post.slug}`}>
          <Image
            className={`
          w-full aspect-[5/4] object-cover object-center h-full`}
            width={850}
            height={600}
            alt={post.title}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(850, 600),
            )}`}
          ></Image>
        </Link>
      </div>
    </div>
  );
};

export default LayoutComponent;
