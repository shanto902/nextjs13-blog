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
            ? "md:flex-col flex-col-reverse"
            : "flex-col-reverse"
          : ""
      } ${
        categorySlug === "personality" || categorySlug === "dialogue"
          ? (categorySlug === "personality" || categorySlug === "dialogue") &&
            index % 2 === 0
            ? "md:flex-col flex-col-reverse"
            : "flex-col-reverse"
          : ""
      } 
      ${
        categorySlug === "projects" ||
        categorySlug === "environment-and-planning"
          ? (categorySlug === "projects" ||
              categorySlug === "environment-and-planning") &&
            index % 2 === 0
            ? "md:flex-col flex-col-reverse"
            : "flex-col-reverse"
          : ""
      }  `}
    >
      {/* For Container Text Layout  */}
      <div>
        {/* Title Div */}
        <Link
          href={`/${locale}/${post.category.slug}/${post.slug}`}
          className={` ${
            locale === "bn"
              ? "@lg:text-3xl font-bold md:text-2xl text-2xl"
              : "@lg:text-2xl font-semibold md:text-xl text-lg"
          } underline  decoration-red-700 @md:pb-5 leading-relaxed py-4 `}
        >
          {post.title}
        </Link>

        {/* Description Div  */}

        <Link
          href={`/${locale}/${post.category.slug}/${post.slug}`}
          className={` ${
            locale === "bn"
              ? "@lg:text-lg @md:text-md text-base leading-snug"
              : "@lg:text-lg @md:text-sm text-sm leading-2"
          }  line-clamp-3 pt-2`}
        >
          {post.description}
        </Link>
        {/* Origin Text  */}
        <div
          className={`${
            locale === "bn" ? "text-xs @md:text-sm" : " text-[10px] @md:text-xs"
          } gap-2  flex flex-wrap items-center  place-self-start`}
        >
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
