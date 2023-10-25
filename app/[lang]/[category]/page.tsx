import CategoryPostList from "@/components/category/CategoryPostList";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostList from "@/components/post/PostList";
import directus from "@/lib/directus";
import { Category, Post } from "@/types/collection";
import { notFound } from "next/navigation";
import React from "react";

export const generateStaticParams = async () => {
  try {
    const categories = await directus.items("category").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const filteredCategories = categories?.data?.filter(
      (category) => category.slug !== "student-projects",
    );

    const params = filteredCategories?.map((category: { slug: string }) => {
      return {
        category: category.slug as string,
        lang: "en",
      };
    });

    const localizedParams = filteredCategories?.map(
      (category: { slug: string }) => {
        return {
          category: category.slug as string,
          lang: "bn",
        };
      },
    );

    const allParams = params?.concat(localizedParams ?? []);
    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching categories");
  }
};

const CategoryPage = async ({
  params,
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  const locale = params.lang;

  const getCategoryData = async () => {
    try {
      const category = await directus.items("category").readByQuery({
        filter: {
          slug: {
            _eq: params.category,
          },
        },

        fields: [
          "*",
          "translations.*",
          "posts.*",
          "posts.author.id",
          "posts.author.first_name",
          "posts.author.last_name",
          "posts.category.id",
          "posts.category.title",
          "posts.category.slug",
          "posts.translations.*",
          "posts.author.translations.first_name",
          "posts.author.translations.last_name",
        ],
      });

      if (locale === "en") {
        return category?.data?.[0];
      } else {
        const fetchedCategory = category?.data?.[0];
        const localizedCategory = {
          ...fetchedCategory,
          title: fetchedCategory.translations[0].title,
          description: fetchedCategory.translations[0].description,
          posts: fetchedCategory.posts.map((post: any) => {
            return {
              ...post,
              title: post.translations[0].title,
              description: post.translations[0].description,
              body: post.translations[0].body,
              category: {
                ...post.category,
                title: fetchedCategory.translations[0].title,
                description: fetchedCategory.translations[0].description,
              },
              author: {
                first_name: post.author.translations[0].first_name,
                last_name: post.author.translations[0].last_name,
              },
            };
          }),
        };
        return localizedCategory;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching category");
    }
  };

  const category = await getCategoryData();

  if (!category) {
    notFound();
  }

  const typeCorrectedData = category as unknown as {
    id: string;
    title: string;
    description: string;
    slug: string;
    posts: Post[];
  };

  return (
    <div className=" min-h-[50vh]">
      <PaddingContainer>
        {/* <PostList locale={locale} posts={typeCorrectedData.posts} /> */}
        <CategoryPostList
          locale={locale}
          posts={typeCorrectedData.posts.reverse()}
        />
      </PaddingContainer>
    </div>
  );
};

export default CategoryPage;
