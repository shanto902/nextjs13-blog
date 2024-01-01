import CategoryPostList from "@/components/category/CategoryPostList";
import PaddingContainer from "@/components/layout/PaddingContainer";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { Category, Post } from "@/types/collection";
import { notFound } from "next/navigation";
import { title } from "process";
import React, { cache } from "react";

const getCategoryData = cache(async (categorySlug: string, locale: string) => {
  try {
    const category = await directus.items("category").readByQuery({
      filter: {
        slug: {
          _eq: categorySlug,
        },
      },

      fields: [
        "*",
        "translations.*",
        "posts.id",
        "posts.slug",
        "posts.title",
        "posts.status",
        "posts.date_created",
        "posts.description",
        "posts.image",
        "posts.serial_no",
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
        title: fetchedCategory?.translations[0]?.title,
        description: fetchedCategory?.translations[0]?.description,
        posts: fetchedCategory?.posts.map((post: any) => {
          return {
            ...post,
            title: post?.translations[0]?.title,
            description: post?.translations[0]?.description,
            category: {
              ...post.category,
              title: fetchedCategory?.translations[0]?.title,
              description: fetchedCategory?.translations[0]?.description,
            },
            author: {
              first_name: post?.author?.translations[0].first_name,
              last_name: post?.author?.translations[0].last_name,
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
});

export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: { category: string; lang: string };
}) => {
  const categoryData = await getCategoryData(category, lang);

  return {
    title: ` ${categoryData?.title}`,
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
      siteName: categoryData?.title,
      /* images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}/opengraph-image.png`,
          width: 1200,
          height: 628,
        },
      ], */
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        "bn-BD": `${process.env.NEXT_PUBLIC_SITE_URL}/bn/${category}`,
      },
    },
  };
};

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
      (category: Category) => category?.slug !== "student-projects",
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
  const categorySlug = params.category;

  const category = await getCategoryData(categorySlug, locale);

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
        <CategoryPostList
          categorySlug={categorySlug}
          locale={locale}
          posts={typeCorrectedData.posts}
        />
      </PaddingContainer>
    </div>
  );
};

export default CategoryPage;
