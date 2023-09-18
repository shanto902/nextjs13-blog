import { Post } from "@/types/collection"
import PostCard from "./PostCard";

interface PostListProps {
    posts: Post[];
    layout?: "vertical" | "horizontal";
    locale: string;


}

const PostList = ({posts , layout = "vertical", locale}: PostListProps) => {
  return (
    <div className="  grid grid-cols-1 md:grid-cols-2 gap-10">{posts.map((post)=> <PostCard locale={locale} layout={layout} key={post.id} post={
        post
    } />)}</div>
  )
}

export default PostList