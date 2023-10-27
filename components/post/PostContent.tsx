import { Post } from "@/types/collection";
import { AppWindow, User } from "lucide-react";
import Image from "next/image";

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
            isPagePost
              ? "text-xl text-center  @md:text-2xl @lg:text-3xl font-bold underline underline-offset-auto   decoration-[#0064c6] "
              : "@lg:text-2xl text-lg @md:text-xl font-medium underline underline-offset-auto decoration-[#0064c6] pb-2 @md:leading-tight "
          } `}
        >
          {post.title}
        </h2>

        {isPagePost && (
          <div
            className={`${
              isPagePost ? "justify-center" : ""
            } gap-2 text-xs @md:text-sm flex flex-wrap items-center  pb-5`}
          >
            <User className="w-4 h-4" />
            <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
            <AppWindow className="w-4 h-4" />
            <div>{`${post.category.title}`}</div>
            <AppWindow className="w-4 h-4" />
            <div>
              {new Date(post.date_created).toLocaleDateString(`${locale}`, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        )}

        <div className=" flex flex-col md:flex-row gap-3 md:items-center">
          {isPagePost && (
            <Image
              className={`flex-1 w-full object-cover object-center h-full max-h-[400px]
          }`}
              alt={post.title}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
              width={600}
              height={400}
            />
          )}
          {/* Description  */}
          <div>
            {!isPagePost ? (
              <p
                className={`@lg:text-lg text-base leading-snug flex-1 ${
                  isPagePost ? "" : "line-clamp-3"
                }`}
              >
                {post.description}
              </p>
            ) : (
              <div>{formattedDescription}</div>
            )}
          </div>
        </div>
        {!isPagePost && (
          <div
            className={`${
              isPagePost ? "justify-center" : ""
            } gap-2 text-xs @md:text-sm flex flex-wrap items-center  pb-5`}
          >
            <User className="w-4 h-4" />
            <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
            <AppWindow className="w-4 h-4" />
            <div>{`${post.category.title}`}</div>
            <AppWindow className="w-4 h-4" />
            <div>
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
