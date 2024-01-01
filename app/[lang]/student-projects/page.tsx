import UniversityList from "@/components/elements/UniversityList";
import PaddingContainer from "@/components/layout/PaddingContainer";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { Post, University } from "@/types/collection";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    lang: string;
  };
}) => {
  const locale = params.lang;

  const dictionary = await getDictionary(locale);

  const getStudentsProjectData = async () => {
    try {
      const university = await directus.items("university").readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: [
          "*",
          "translations.*",
          "posts.*",
          "posts.translations.*",
          "posts.author.id",
          "posts.author.first_name",
          "posts.author.last_name",
          "posts.author.translations.first_name",
          "posts.author.translations.last_name",
          "posts.category.id",
          "posts.category.title",
          "posts.category.slug",
          "posts.category.description",
          "posts.category.translations.*",
          "posts.university.*",
        ],
      });

      if (locale === "en") {
        return university?.data;
      } else {
        const localizedUniversity: University[] = (university?.data || []).map(
          (fetchedUniversity) => {
            return {
              ...fetchedUniversity,
              tag_line: fetchedUniversity?.translations[0]?.tag_line,
              posts: (fetchedUniversity?.posts || []).map((post: Post) => {
                return {
                  ...post,
                  title: post?.translations[0]?.title,
                  description: post?.translations[0]?.description,
                  body: post?.translations[0]?.body,
                  category: post?.category
                    ? {
                        ...post?.category,
                        title: post?.category?.translations[0]?.title,
                        description:
                          post?.category?.translations[0]?.description,
                      }
                    : "",
                  author: post?.author
                    ? {
                        first_name: post?.author?.translations[0]?.first_name,
                        last_name: post?.author?.translations[0]?.last_name,
                      }
                    : "",
                  university: post?.university
                    ? {
                        ...post?.university,
                      }
                    : "",
                };
              }),
            };
          },
        );

        return localizedUniversity;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching category");
    }
  };

  const universities = await getStudentsProjectData();
  if (!universities) {
    notFound();
  }
  return (
    <div>
      <PaddingContainer>
        <div className=" border border-red-700 rounded-lg p-4">
          <p>
            {dictionary?.studentProjects?.topDesc}
            <br />
            <br />
            {dictionary?.studentProjects?.botDesc}
          </p>
        </div>
        <div className=" mt-10 flex flex-col gap-10">
          {universities
            ?.slice() // Create a shallow copy of the array to avoid modifying the original array
            .sort((a, b) => {
              const serialA = a.serial_no || 0;
              const serialB = b.serial_no || 0;

              if (serialA !== 0 && serialB !== 0) {
                return serialA - serialB;
              } else if (serialA !== 0) {
                return -1;
              } else if (serialB !== 0) {
                return 1;
              }

              return (
                new Date(a.date_created).getTime() -
                new Date(b.date_created).getTime()
              );
            })
            .map((university: University) =>
              university?.posts && university?.posts.length > 0 ? (
                <UniversityList
                  key={university.id}
                  university={university}
                  locale={locale}
                />
              ) : null,
            )}
        </div>
      </PaddingContainer>
    </div>
  );
};

export default page;
