import { Post } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";
import {
  AppWindow,
  Eye,
  EyeIcon,
  PanelRightCloseIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PostBody from "./PostBody";
import PostImage from "./PostImage";

interface PostContentProps {
  post: Post;
  isPagePost?: boolean;
  locale: string;
  formattedCounter?: string;
}

const PostContent = ({
  post,
  isPagePost = false,
  locale,
  formattedCounter,
}: PostContentProps) => {
  return (
    <div>
      {/* Tags */}
      <div className=" space-y-2">
        {/* Title  */}

        <h2
          className={`${
            isPagePost &&
            "text-2xl text-center @md:text-3xl @lg:text-4xl font-bold  "
          } `}
        >
          {!isPagePost ? (
            <Link
              className=" @lg:text-4xl text-2xl @md:text-3xl font-medium underline decoration-red-700  @md:leading-tight line-clamp-2 "
              href={`/${locale}/${post.category.slug}/${post.slug}`}
            >
              {post.title}
            </Link>
          ) : (
            <span> {post.title}</span>
          )}
        </h2>

        {isPagePost && (
          <div className=" gap-2 text-xs @md:text-sm flex flex-wrap items-center justify-center pb-5  ">
            <div className=" flex flex-row items-center gap-2">
              <User className="w-4 h-4" />
              {`${post.author.first_name} ${post.author.last_name}`}
            </div>

            <Link
              className=" flex flex-row items-center gap-2"
              href={`/${locale}/${post.category.slug}`}
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

            <div className=" flex flex-row items-center gap-2">
              <EyeIcon className="w-4 h-4" />
              <span>{formattedCounter}</span>
            </div>
          </div>
        )}

        <div className=" flex flex-col md:flex-row gap-5 ">
          {/* Image  */}
          {isPagePost && <PostImage post={post} />}

          {/* Description  */}
          <div className=" self-center flex-1 ">
            {!isPagePost ? (
              <Link href={`/${locale}/${post.category.slug}/${post.slug}`}>
                <p
                  className={`@lg:text-lg text-base leading-normal ${
                    isPagePost ? "" : "line-clamp-3"
                  }`}
                >
                  {post.description}
                </p>
              </Link>
            ) : post.project_description ? (
              <PostBody locale={locale} body={post.project_description} />
            ) : (
              ""
            )}
          </div>
        </div>
        {/* Quick link  */}
        {!isPagePost && (
          <div className=" gap-2 text-xs @md:text-sm flex flex-wrap items-center pb-5 place-self-start">
            <div className=" flex flex-row items-center gap-2">
              <User className="w-4 h-4" />
              {`${post.author.first_name} ${post.author.last_name}`}
            </div>

            <Link
              className=" flex flex-row items-center gap-2"
              href={`/${locale}/${post.category.slug}`}
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
        )}
      </div>
    </div>
  );
};

export default PostContent;
