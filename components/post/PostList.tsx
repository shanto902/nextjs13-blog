import { Post, StudentPost, University } from "@/types/collection";
import PostCard from "./PostCard";
import StudentProjectSlider from "./StudentProjectSlider";
import StudentProjectCard from "../elements/StudentProjectCard";

interface PostListProps {
  posts: Post[];
  layout?: "vertical" | "horizontal";
  locale: string;
  universities: University[];
  studentProjects: StudentPost[];
}

const PostList = ({
  posts,
  layout = "vertical",
  locale,
  universities,
  studentProjects,
}: PostListProps) => {
  const groupedPosts: { [categorySlug: string]: Post[] } = {};
  const categoryList = [
    "concepts",
    "arts",
    "heritage",
    "personality",
    "dialogue",
    "projects",
    "environment-and-planning",
  ]; // Specify the desired order

  const sortedPosts = studentProjects.sort(
    (a, b) =>
      new Date(b.date_created).getTime() - new Date(a.date_created).getTime(),
  );

  const latestThreePosts = sortedPosts.slice(0, 3);

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
      return groupedPosts[categorySlug]?.[
        groupedPosts[categorySlug].length - 1
      ];
    })
    .filter((post) => post);

  const newsCategoryPosts = posts.filter(
    (post) => post.category.slug === "news",
  );
  const mainSliderUniversity = universities.find(
    (university) => university.is_main_slider,
  );

  const studentPosts = mainSliderUniversity ? mainSliderUniversity.posts : [];

  // Get the latest post in the "news" category
  const latestNewsPost = newsCategoryPosts.reduce((latest, post) => {
    return post.date_created > latest.date_created ? post : latest;
  }, newsCategoryPosts[0]); // Use the first post as the initial value

  return (
    <div className="  grid grid-cols-1 md:grid-cols-2 gap-10">
      {orderedPosts.map((post, index) => (
        <PostCard
          key={post.id}
          className={`order-${index + 1}`}
          locale={locale}
          layout={layout}
          post={post}
        />
      ))}
      <StudentProjectSlider
        className=" order-8 md:order-none "
        locale={locale}
        studentPosts={studentPosts}
      />
      <PostCard
        key={latestNewsPost.id}
        locale={locale}
        layout={layout}
        post={latestNewsPost}
        className={`order-9`}
      />
      {latestThreePosts ? (
        <StudentProjectCard
          latestThreePosts={latestThreePosts}
          locale={locale}
        />
      ) : (
        <h2>No Post to Show</h2>
      )}
    </div>
  );
};

export default PostList;
