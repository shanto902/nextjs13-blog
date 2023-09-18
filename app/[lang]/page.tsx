import PaddingContainer from "@/components/layout/PaddingContainer";
import Image from "next/image";
import PostList from "@/components/post/PostList";
import coverPhoto from "@/assets/cover-photo.png";
import MainSlider from "@/components/elements/MainSlider";
import directus from "@/lib/directus";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const locale = params.lang;


  const getAllPosts = async () => {
    try {
      const posts = await directus.items("post").readByQuery({
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "author.translations.first_name",
          "author.translations.last_name",
          "category.id",
          "category.title",
          "category.translations.*",
          "translations.*",

        ],
      });
      if (locale === "en") {
        return posts.data;

      }else {
        const localizedPost = posts.data?.map((post)=> {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            author : {
              first_name: post.author.translations[0].first_name,
              last_name: post.author.translations[0].last_name,
            },
            category : {
              ...post.category,
              title:post.category.translations[0].title,
              description:post.category.translations[0].description
            }
          }
        });

        return localizedPost;
      }

    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };


  const posts = await getAllPosts();

  if (!posts) {
    notFound();
  }

  const getAllBanners = async () => {
    try {
    const banners = await directus.items("banner").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
        fields: [
          "*",
          "translations.*",
        ],
      });

      
      if (locale === "en") {
        return banners?.data || [];
      }else {
        const localizedBanner = banners.data?.map((banner)=> {
          return {
            ...banner,
            title: banner.translations[0].title,
            description: banner.translations[0].description,
          }
        });

        return localizedBanner || [];
      }
    } catch (error) {
       console.log(error);
      throw new Error("Error fetching Banners");
    }
  }

  const banners = await getAllBanners();
  


  return (
    <PaddingContainer>
      <Image
        className=" object-cover object-center w-full mb-10"
        src={coverPhoto}
        width={1200}
        height={500}
        alt="Cover Photo"
      />
      <MainSlider banners={banners} />
      <main className=" h-auto space-y-10 mt-10">
        <PostList locale={locale} posts={posts} />
      </main>
    </PaddingContainer>
  );
}
