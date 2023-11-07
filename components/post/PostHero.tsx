import { Post } from "@/types/collection";
import PostContent from "./PostContent";
import Image from "next/image";

interface PostHeroProps {
  post: Post;
  locale: string;
  formattedCounter:string;
}

const PostHero = ({ post, locale, formattedCounter }: PostHeroProps) => {
  return (
    <div>
      <PostContent locale={locale} isPagePost post={post}  formattedCounter={formattedCounter} />
    </div>
  );
};

export default PostHero;
