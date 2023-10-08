import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./PostContent";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
  locale: string;
}

const PostCard = async ({
  post,
  layout = "horizontal",
  reverse = false,
  locale,
}: PostProps) => {
  return (
    <Link
      className={`@container ${
        layout === "horizontal"
          ? "grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          : "space-y-2"
      } `}
      href={`http://localhost:3000/${locale}/post/${post.slug}`}
    >
      {/* Post Image */}
      <div>
        <Image
          className={` w-full object-cover object-center h-full max-h-[340px] ${
            reverse ? "md:order-last" : ""
          }`}
          alt={post.title}
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
          width={580}
          height={340}
        />
        <div className={`py-2 uppercase text-neutral-500`}>
          {" "}
          {post.category.title}
        </div>
      </div>
      {/* Post Content */}
      <PostContent locale={locale} post={post} />
    </Link>
  );
};

export default PostCard;
