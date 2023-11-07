import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./PostContent";
import { shimmer, toBase64 } from "@/utils/shimmer";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
  locale: string;
  className: string;
  isNewsPost?: boolean;

}

const PostCard = async ({
  post,
  layout = "horizontal",
  reverse = false,
  locale,
  className,
  isNewsPost = false,

}: PostProps) => {
  return (
    <div
      className={
        isNewsPost ? `lg:border-l-2 lg:border-r-2 lg:border-t-2 lg:p-5` : ""
      }
    >
      <Link
        className={`@container ${className} ${
          layout === "horizontal"
            ? "grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            : "space-y-2"
        } `}
        href={`/${locale}/${post.category.slug}/${post.slug}`}
      >
        {/* Post Image */}
        <div>
          <Image
            className={` w-full object-cover object-center h-full aspect-[5/4] max-h-[340px] ${
              reverse ? "md:order-last" : ""
            }`}
            alt={post.title}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
            width={580}
            height={340}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(580, 340),
            )}`}
          />
        </div>
      </Link>
      <Link href={`/${locale}/${post.category.slug}`}>
        {" "}
        <div className={`py-2 uppercase text-xl`}> {post.category.title}</div>
      </Link>

      {/* Post Content */}
      <PostContent
        locale={locale}
        post={post}
  
      />
    </div>
  );
};

export default PostCard;
