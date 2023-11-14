import { Post } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";
import {
  AppWindow,
  Eye,
  EyeIcon,
  PanelRightCloseIcon,
  User,
} from "lucide-react";
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
            `${
              locale === "bn"
                ? "text-2xl text-center @md:text-3xl @lg:text-4xl font-bold"
                : "text-xl text-center @md:text-2xl @lg:text-3xl font-bold"
            }  `
          } `}
        >
          {!isPagePost ? (
            <Link
              className={`${
                locale === "bn"
                  ? "@lg:text-5xl @md:text-4xl  text-3xl underline-offset-[9px] pb-[5px]"
                  : "@lg:text-3xl @md:text-2xl  text-xl underline-offset-[8px] pb-[5px]"
              } font-semibold underline  decoration-red-700  @md:leading-loose line-clamp-2 "`}
              href={`/${locale}/${post.category.slug}/${post.slug}`}
            >
              {post.title}
            </Link>
          ) : (
            <span> {post.title}</span>
          )}
        </h2>

        {isPagePost && (
          <div
            className={`${
              locale === "bn"
                ? "text-sm @md:text-base"
                : "text-xs @md:text-sm pt-[5px] pb-[22px]"
            }   gap-2 flex flex-wrap items-center justify-center pb-5  `}
          >
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
                  className={`${
                    locale === "bn"
                      ? "@lg:text-lg text-base"
                      : "@lg:text-base text-sm"
                  } leading-normal ${isPagePost ? "" : "line-clamp-3"}`}
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
          <div
            className={`${
              locale === "bn"
                ? "text-xs @md:text-sm"
                : "text-[10px]  @md:text-sm"
            } gap-2  flex flex-wrap leading-snug items-center pb-5 place-self-start`}
          >
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
