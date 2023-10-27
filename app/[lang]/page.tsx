import PaddingContainer from "@/components/layout/PaddingContainer";
import Image from "next/image";
import PostList from "@/components/post/PostList";
import coverPhoto from "@/assets/cover-photo.png";
import MainSlider from "@/components/elements/MainSlider";
import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import magazineImage from "@/assets/magpic.png";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";
import { Banner, Post } from "@/types/collection";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getBlurData } from "@/utils/blur-data-generator";

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
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "author.translations.first_name",
          "author.translations.last_name",
          "category.slug",
          "category.id",
          "category.title",
          "category.translations.*",
          "translations.*",
        ],
      });
      if (locale === "en") {
        return posts.data;
      } else {
        const localizedPost = posts.data?.map((post: Post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            author: {
              first_name: post.author.translations[0].first_name,
              last_name: post.author.translations[0].last_name,
            },
            category: {
              ...post.category,
              title: post.category.translations[0].title,
              description: post.category.translations[0].description,
            },
          };
        });

        return localizedPost;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };

  const posts = await getAllPosts();

  

  const getAllStudentPosts = async () => {
    try {
      const posts = await directus.items("studentProjects").readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: [
          "*",
          "university.*",
          "category.slug",
          "category.id",
          "category.title",
          "category.translations.*",
          "translations.*",
        ],
      });
      if (locale === "en") {
        return posts.data;
      } else {
        const localizedPost = posts.data?.map((post: Post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: post.category.translations[0].title,
              description: post.category.translations[0].description,
            },
          };
        });

        return localizedPost;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };

  const studentPosts = await getAllStudentPosts();

  const dictionary = await getDictionary(locale);

  const getAllBanners = async () => {
    try {
      const banners = await directus.items("banner").readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return banners?.data || [];
      } else {
        const localizedBanner = banners.data?.map((banner: Banner) => {
          return {
            ...banner,
            title: banner.translations[0].title,
            description: banner.translations[0].description,
          };
        });

        return localizedBanner || [];
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching Banners");
    }
  };

  const processedPosts = await Promise.all(
    posts.map(async (post: Post) => {
      const { base64 } = await getBlurData(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`,
      );
      return {
        ...post,
        blurImg: base64,
        author: {
          ...post.author,
        },
        category: {
          ...post.category,
        },
      };
    }),
  );

  if (!posts) {
    notFound();
  }

  const banners = await getAllBanners();

  const processedBanners = await Promise.all(
    banners.map(async (banner: Banner) => {
      const { base64 } = await getBlurData(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${banner.image}?key=optimized`,
      );
      return { ...banner, blurImg: base64 };
    }),
  );

  return (
    <PaddingContainer>
      <Suspense fallback={<Skeleton height={500} />}>
        <Image
          className=" object-cover object-center w-full mb-10"
          src={coverPhoto}
          width={1200}
          height={500}
          alt="Cover Photo"
        />
      </Suspense>

      <MainSlider banners={processedBanners} />

      <main className=" h-auto space-y-10 mt-10">
        <PostList
          locale={locale}
          posts={processedPosts}
          studentPosts={studentPosts || []}
        />
        <div className=" flex flex-col md:flex-row gap-10">
          <div className=" flex-1 relative">
            <Image src={magazineImage} alt={"Magazine Picture"} />
            <div className="  absolute top-10 right-0 flex flex-col gap-5 items-end">
              <h2 className="text-xl">{dictionary.magazineHome.title}</h2>
              <Link
                href={`/${locale}/published-magazine`}
                className=" btn btn-outline w-fit"
              >
                {dictionary.magazineHome.published}
              </Link>
              <Link
                href={`/${locale}/archived`}
                className=" btn btn-outline w-fit"
              >
                {dictionary.magazineHome.website}
              </Link>
            </div>
          </div>
          <div className=" flex-1"></div>
        </div>
      </main>
    </PaddingContainer>
  );
}
