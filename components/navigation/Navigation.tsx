import Link from "next/link";
import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import SearchComponent from "./SearchComponent";
import MobileDrawer from "./MobileDrawer";
import { getDictionary } from "@/lib/getDictionary";
import HeaderLogo from "./HeaderLogo";
import SideLogo from "./SideLogo";
import directus from "@/lib/directus";

const Navigation = async ({ locale }: { locale: string }) => {
  const getAllPosts = async () => {
    try {
      const posts = await directus.items("post").readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: [
          "id",
          "slug",
          "title",
          "image",
          "left_add",
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
        const localizedPost = posts.data?.map((post) => {
          return {
            ...post,
            title: post.translations[0].title,
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

  const posts = await getAllPosts();

  const dictionary = await getDictionary(locale);

  const liStyle = "hover:text-red-800 flex-shrink-0";

  return (
    <>
      <HeaderLogo locale={locale} />

      <div className=" sticky z-40 top-0 left-0 right-0 bg-base-100">
        <PaddingContainer>
          <div className="mr-10">
            <SideLogo locale={locale} dictionary={dictionary} posts ={posts || []} />
          </div>
          <div className=" lg:block hidden">
            <div className=" flex items-center justify-between gap-2 py-5">
              {/* Category Links */}
              <nav className=" w-full">
                <ul
                  className={`flex flex-row items-center uppercase justify-between  overflow-hidden w-full mr-2 font-bold${
                    locale === "en" ? " text-[12px]" : " text-[15px]"
                  }`}
                >
                  <li className={liStyle}>
                    <Link href={`/${locale}/news`}>
                      {dictionary.navigation.links.news}
                    </Link>
                  </li>
                  <li className={liStyle}>
                    <Link href={`/${locale}/concepts`}>
                      {dictionary.navigation.links.concepts}
                    </Link>
                  </li>
                  <li className={liStyle}>
                    <Link href={`/${locale}/arts`}>
                      {dictionary.navigation.links.arts}
                    </Link>
                  </li>
                  <li className={liStyle}>
                    <Link href={`/${locale}/heritage`}>
                      {dictionary.navigation.links.heritage}
                    </Link>
                  </li>
                  <li className={liStyle}>
                    <Link href={`/${locale}/personality`}>
                      {dictionary.navigation.links.personality}
                    </Link>
                  </li>
                  <li className={liStyle}>
                    <Link href={`/${locale}/dialogue`}>
                      {dictionary.navigation.links.dialogue}
                    </Link>
                  </li>
                  <li className={liStyle}>
                    <Link href={`/${locale}/projects`}>
                      {dictionary.navigation.links.projects}
                    </Link>
                  </li>
                  <li className={liStyle}>
                    <Link href={`/${locale}/student-projects`}>
                      {dictionary.navigation.links.studentProjects}
                    </Link>
                  </li>
                  <li className={liStyle}>
                    <Link href={`/${locale}/archived`}>
                      {dictionary.navigation.links.archived}
                    </Link>
                  </li>
                  <li className={liStyle}>
                    <Link href={`/${locale}/environment-and-planning`}>
                      {dictionary.navigation.links.environmentPlaning}
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Search  */}
              <SearchComponent locale={locale} posts={posts || []} />
            </div>
            <hr className=" border-2 " />
          </div>
        </PaddingContainer>

        <div>
          <MobileDrawer locale={locale} />
        </div>
      </div>
    </>
  );
};

export default Navigation;
