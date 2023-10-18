import { Post } from "@/types/collection";
import PostContent from "./PostContent";
import Image from "next/image";

interface PostHeroProps {
  post: Post;
  locale: string;
}

const PostHero = ({ post, locale }: PostHeroProps) => {
  return (
    <div>
      <PostContent locale={locale} isPagePost post={post} />
    </div>
  );
};

export default PostHero;
