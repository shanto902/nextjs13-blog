import { Post, StudentPost } from "@/types/collection";
import PostCard from "./PostCard";
import StudentProjectSlider from "./StudentProjectSlider";

interface PostListProps {
  posts: Post[];
  layout?: "vertical" | "horizontal";
  locale: string;
  studentPosts: StudentPost[];
}

const PostList = ({ posts, layout = "vertical", locale, studentPosts }: PostListProps) => {
  const groupedPosts: { [categorySlug: string]: Post[] } = {};
  const categoryList = ["concepts","arts","heritage","personality","dialogue","projects","environment-and-planning"]; // Specify the desired order

  // Group the posts by category
  posts.forEach((post) => {
    const categorySlug = post.category?.slug || "uncategorized";

    if (!groupedPosts[categorySlug]) {
      groupedPosts[categorySlug] = [];
    }
    groupedPosts[categorySlug].push(post);
  });

  // Create an array of Post objects in the order specified by categoryList
  const orderedPosts: Post[] = categoryList
  .map((categorySlug) => {
    // Return the latest post for the specified category if it exists
    return groupedPosts[categorySlug]?.[groupedPosts[categorySlug].length - 1];
  })
  .filter((post) => post); 


  const newsCategoryPosts = posts.filter((post) => post.category.slug === "news");

// Get the latest post in the "news" category
const latestNewsPost = newsCategoryPosts.reduce((latest, post) => {
  return post.date_created > latest.date_created ? post : latest;
}, newsCategoryPosts[0]); // Use the first post as the initial value


  return (
    <div className="  grid grid-cols-1 md:grid-cols-2 gap-10">
      {orderedPosts.map((post) => (
        <PostCard  key={post.id}  locale={locale} layout={layout}post={post} />
      ))}
    <StudentProjectSlider className=" order-last md:order-none " locale = {locale} studentPosts={studentPosts} />
    <PostCard  key={latestNewsPost.id}  locale={locale} layout={layout}post={latestNewsPost} />
    </div>
  );
};

export default PostList;
