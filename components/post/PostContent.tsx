import { getReadingTime, getRelativeDate } from "@/lib/helpers";
import { Post } from "@/types/collection";
import { ArrowRight } from "lucide-react";

interface PostContentProps {
    post: Post;
    isPagePost?: boolean;
}

const PostContent = ({post, isPagePost = false}: PostContentProps) => {
  return (
    <div>
        {/* Tags */}
        <div className=" space-y-2">
            <div className=" gap-2 text-xs @md:text-sm flex flex-wrap items-center">
            <div className={`font-medium ${post.category.title === "Cities"? "text-emerald-600": "text-indigo-600"}`}>    {post.category.title}</div>
            <div className=" w-2 h-2 rounded-full bg-neutral-200"></div>
            <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
            <div className=" w-2 h-2 rounded-full bg-neutral-200"></div>
            <div>{getReadingTime(post.body)}</div>
            <div className=" w-2 h-2 rounded-full bg-neutral-200"></div>
            <div>{getRelativeDate(post.date_created)}</div>
            </div>
            {/* Title  */}
            <h2
        className={`${
            isPagePost
            ? "text-2xl md:text-3xl lg:text-4xl font-bold"
            : "@lg:text-3xl text-xl @md:text-2xl font-medium"
        } `}
      >
        {post.title}
      </h2>
            {/* Description  */}
            <p className="@lg:text-lg text-base leading-snug text-neutral-600">{post.description}</p>
            {/* Read More  */}
            {!isPagePost && <div className=" flex items-center gap-2 pt-3">Read More <ArrowRight size={14}/></div>}
        </div>
        </div>
  )
}

export default PostContent