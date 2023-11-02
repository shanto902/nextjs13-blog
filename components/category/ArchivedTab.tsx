"use client";
import { Post } from "@/types/collection";
import React from "react";
import ArchiveCard from "../elements/ArchiveCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./style.css";
import type { ReactTabsFunctionComponent, TabProps } from "react-tabs";
import Link from "next/link";
const ArchivedTab = ({
  archivedPosts,
  locale,
  dictionary,
}: {
  archivedPosts: Post[];
  locale: string;
  dictionary: any;
}) => {
  const CustomTab: ReactTabsFunctionComponent<TabProps> = ({
    children,
    ...otherProps
  }) => (
    <Tab
      {...otherProps}
      className={`btn bg-zinc-700 active:bg-red-700 text-base-100 hover:text-accent place-self-center ${
        locale === "bn" ? "text-lg" : "text-md"
      }  w-full md:w-60`}
    >
      <h1>{children}</h1>
    </Tab>
  );

  const filterPostsByCategory = (categorySlug: string) => {
    return archivedPosts.filter((post) => post.category.slug === categorySlug);
  };

  const artsPosts: Post[] = filterPostsByCategory("arts");
  const conceptsPosts: Post[] = filterPostsByCategory("concepts");
  const newsPost: Post[] = filterPostsByCategory("news");
  const personalityPost: Post[] = filterPostsByCategory("personality");
  const dialogue: Post[] = filterPostsByCategory("dialogue");
  const projectsPost: Post[] = filterPostsByCategory("projects");
  const studentProjectsPost: Post[] = filterPostsByCategory("student-projects");
  const environmentPlaningPost: Post[] = filterPostsByCategory(
    "environment-and-planning",
  );
  const heritagePost: Post[] = filterPostsByCategory("heritage");

  CustomTab.tabsRole = "Tab";
  return (
    <div>
      <Tabs>
        <TabList className="grid grid-cols-2 md:grid-cols-3 gap-5 py-10 ">
          <div className=" hidden lg:block"></div>
          <div className=" hidden lg:block"></div>
          <Link
            href={`/${locale}/published-magazine`}
            className={`btn bg-zinc-700 text-base-100 hover:text-accent place-self-center ${
              locale === "bn" ? "text-lg" : "text-md"
            }  w-full md:w-60 order-last lg:order-none`}
          >
            {dictionary.navigation.links.publishedMagazine}
          </Link>
          <CustomTab>{dictionary.navigation.links.news}</CustomTab>
          <CustomTab>{dictionary.navigation.links.concepts}</CustomTab>
          <CustomTab>{dictionary.navigation.links.arts}</CustomTab>
          <CustomTab>{dictionary.navigation.links.heritage}</CustomTab>
          <CustomTab>{dictionary.navigation.links.personality}</CustomTab>
          <CustomTab>{dictionary.navigation.links.dialogue}</CustomTab>
          <CustomTab>{dictionary.navigation.links.projects}</CustomTab>
          <CustomTab>{dictionary.navigation.links.studentProjects}</CustomTab>
          <CustomTab>
            {dictionary.navigation.links.environmentPlaning}
          </CustomTab>
        </TabList>

        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {newsPost && newsPost.length > 0 ? (
              newsPost.map((post: Post) => (
                <ArchiveCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <p className=" col-span-3 py-10 font-bold text-xl">
                {" "}
                {dictionary.archivedPage.noPostText}
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {conceptsPosts && conceptsPosts.length > 0 ? (
              conceptsPosts.map((post: Post) => (
                <ArchiveCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <p className=" col-span-3 py-10 font-bold text-xl">
                {" "}
                {dictionary.archivedPage.noPostText}
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {artsPosts && artsPosts.length > 0 ? (
              artsPosts.map((post: Post) => (
                <ArchiveCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <p className=" col-span-3 py-10 font-bold text-xl">
                {" "}
                {dictionary.archivedPage.noPostText}
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {heritagePost && heritagePost.length > 0 ? (
              heritagePost.map((post: Post) => (
                <ArchiveCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <p className=" col-span-3 py-10 font-bold text-xl">
                {" "}
                {dictionary.archivedPage.noPostText}
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {personalityPost && personalityPost.length > 0 ? (
              personalityPost.map((post: Post) => (
                <ArchiveCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <p className=" col-span-3 py-10 font-bold text-xl">
                {" "}
                {dictionary.archivedPage.noPostText}
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {dialogue && dialogue.length > 0 ? (
              dialogue.map((post: Post) => (
                <ArchiveCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <p className=" col-span-3 py-10 font-bold text-xl">
                {" "}
                {dictionary.archivedPage.noPostText}
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {projectsPost && projectsPost.length > 0 ? (
              projectsPost.map((post: Post) => (
                <ArchiveCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <p className=" col-span-3 py-10 font-bold text-xl">
                {" "}
                {dictionary.archivedPage.noPostText}
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {studentProjectsPost && studentProjectsPost.length > 0 ? (
              studentProjectsPost.map((post: Post) => (
                <ArchiveCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <p className=" col-span-3 py-10 font-bold text-xl">
                {" "}
                {dictionary.archivedPage.noPostText}
              </p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {environmentPlaningPost && environmentPlaningPost.length > 0 ? (
              environmentPlaningPost.map((post: Post) => (
                <ArchiveCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <p className=" col-span-3 py-10 font-bold text-xl">
                {" "}
                {dictionary.archivedPage.noPostText}
              </p>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ArchivedTab;
