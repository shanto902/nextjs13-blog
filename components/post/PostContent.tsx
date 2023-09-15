import { getReadingTime, getRelativeDate } from "@/lib/helpers";
import { Post } from "@/types/collection";
import { AppWindow, ArrowRight, User } from "lucide-react";

interface PostContentProps {
    post: Post;
    isPagePost?: boolean;
}

const PostContent = ({post, isPagePost = false}: PostContentProps) => {
  return (
    <div>
      
        {/* Tags */}
        <div className=" space-y-2">
        <h2
        className={`${
            isPagePost
            ? "text-2xl md:text-3xl lg:text-4xl font-bold"
            : "@lg:text-2xl text-lg @md:text-xl font-medium underline underline-offset-[12px] decoration-[#0064c6] pb-2"
        } `}
      >
        {post.title}
      </h2>
           
            {/* Title  */}
           
            {/* Description  */}
            <p className="@lg:text-lg text-base leading-snug text-neutral-600">{post.description}</p>
            <div className=" gap-2 text-xs @md:text-sm flex flex-wrap items-center">
         
         <User className="w-4 h-4"/>
         <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
         <AppWindow className="w-4 h-4"/>
         <div>{`${post.category.title}`}</div>
         <AppWindow className="w-4 h-4"/>
         <div>{new Date(post.date_created).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
         </div>
        </div>
        </div>
  )
}

export default PostContent