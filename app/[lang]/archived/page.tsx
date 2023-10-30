import ArchivedTab from "@/components/category/ArchivedTab";
import ArchiveCard from "@/components/elements/ArchiveCard";
import PaddingContainer from "@/components/layout/PaddingContainer";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { Post } from "@/types/collection";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const page = async ({
  params,
}: {
  params: {
    lang: string;
  };
}) => {
  const locale = params.lang;

  const getArchivedPost = async () => {
    try {
      const posts = await directus.items("post").readByQuery({
        filter: {
          status: {
            _eq: "archived",
          },
        },
        fields: [
          "id",
          "title",
          "image",
          "date_created",
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
            author: {
              first_name: post.author.translations[0].first_name,
              last_name: post.author.translations[0].last_name,
            },
            category: {
              ...post.category,
              title: post.category.translations[0].title,
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

  const archivedPosts = await getArchivedPost();

  if (!archivedPosts) {
    notFound();
  }

  const categoryList = [
    "concepts",
    "arts",
    "heritage",
    "personality",
    "dialogue",
    "projects",
    "environment-and-planning",
  ];
  const dictionary = await getDictionary(locale);

  return (
    <div className=" min-h-[50vh]">
      <PaddingContainer>
        <ArchivedTab
          archivedPosts={archivedPosts}
          locale={locale}
          dictionary={dictionary}
        />
      </PaddingContainer>
    </div>
  );
};

export default page;
