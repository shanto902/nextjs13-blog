import { Post } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { AppWindow, PanelRightCloseIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostContentProps {
  post: Post;
  isPagePost?: boolean;
  locale: string;
}

const PostContent = ({
  post,
  isPagePost = false,
  locale,
}: PostContentProps) => {
  const descriptionText = post.image_side_title;

  // Split the text by '\n' and create an array of lines
  const lines = descriptionText.split("\n");

  // Create a separate JSX element for each line
  const formattedDescription = lines.map((line, index) => (
    <p key={index} className="text-md">
      {line}
    </p>
  ));
  return (
    <div>
      {/* Tags */}
      <div className=" space-y-2">
        {/* Title  */}

        <h2
          className={`${
            isPagePost &&
            "text-xl text-center @md:text-2xl @lg:text-3xl font-bold underline decoration-red-700 "
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
          </div>
        )}

        <div className=" flex flex-col md:flex-row gap-5 md:items-center">
          {/* Image  */}
          {isPagePost && (
            <Image
              className={` object-cover object-center w-[500px]  h-[400px]
          }`}
              alt={post.title}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
              width={500}
              height={400}
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(500, 400),
              )}`}
            />
          )}

          {/* Description  */}
          <div className=" ">
            {!isPagePost ? (
              <Link href={`/${locale}/${post.category.slug}/${post.slug}`}>
                <p
                  className={`@lg:text-lg text-base leading-snug ${
                    isPagePost ? "" : "line-clamp-3"
                  }`}
                >
                  {post.description}
                </p>
              </Link>
            ) : (
              <div>{formattedDescription}</div>
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
