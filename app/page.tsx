import PaddingContainer from "@/components/layout/PaddingContainer";
import PostCard from "@/components/post/PostCard";
import Image from "next/image";
import { DUMMY_POSTS } from "@/DUMMY_DATA";
import PostList from "@/components/post/PostList";
import CTACard from "@/components/elements/CTACard";
import coverPhoto from "@/assets/cover-photo.png";
import MainSlider from "@/components/elements/MainSlider";
import directus from "@/lib/directus";
import { notFound } from "next/navigation";

export default async function Home() {
  const getAllPosts = async () => {
    try {
      const posts = await directus.items("post").readByQuery({
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "category.id",
          "category.title",
        ],
      });
      return posts.data
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }

  };

  const posts = await getAllPosts();

  if(!posts){
    notFound();
  }





  return (
    <PaddingContainer>
      <Image
        className=" object-cover object-center w-full mb-10"
        src={coverPhoto}
        width={1200}
        height={500}
        alt="Cover Photo"
      />
      <MainSlider />
      <main className=" h-auto space-y-10 mt-10">
        <PostList posts={posts} />
      </main>
    </PaddingContainer>
  );
}
