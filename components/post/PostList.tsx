import { Post } from "@/types/collection";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
  layout?: "vertical" | "horizontal";
  locale: string;
}

const PostList = ({ posts, layout = "vertical", locale }: PostListProps) => {
  const groupedPosts: { [categorySlug: string]: Post[] } = {};
  posts.forEach((post) => {
    const categorySlug = post.category?.slug || 'uncategorized';

    if (!groupedPosts[categorySlug]) {
      groupedPosts[categorySlug] = [];
    }
    groupedPosts[categorySlug].push(post);
  });

  // Get the last post from each category
  const lastPostsPerCategory = Object.values(groupedPosts).map(
    (categoryPosts) => categoryPosts[categoryPosts.length - 1]
  );

  return (
    <div className="  grid grid-cols-1 md:grid-cols-2 gap-10">
      {lastPostsPerCategory.map((post) => (
        <PostCard locale={locale} layout={layout} key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
