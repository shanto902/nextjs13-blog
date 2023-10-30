"use client";
import { Post } from "@/types/collection";
import React from "react";
import ArchiveCard from "../elements/ArchiveCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./style.css";
import type { ReactTabsFunctionComponent, TabProps } from "react-tabs";
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
      className={`btn bg-accent text-base-100 hover:text-accent place-self-center ${
        locale === "bn" ? "text-lg" : "text-md"
      }  w-60`}
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
        <TabList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 ">
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
            {newsPost
              ? newsPost.map((post: Post) => (
                  <ArchiveCard
                    key={post.id}
                    post={post}
                    locale={locale}
                    dictionary={dictionary}
                  />
                ))
              : " Noting "}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {conceptsPosts.map((post: Post) => (
              <ArchiveCard
                key={post.id}
                post={post}
                locale={locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {artsPosts.map((post: Post) => (
              <ArchiveCard
                key={post.id}
                post={post}
                locale={locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          {heritagePost.map((post: Post) => (
            <ArchiveCard
              key={post.id}
              post={post}
              locale={locale}
              dictionary={dictionary}
            />
          ))}
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {personalityPost.map((post: Post) => (
              <ArchiveCard
                key={post.id}
                post={post}
                locale={locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {dialogue.map((post: Post) => (
              <ArchiveCard
                key={post.id}
                post={post}
                locale={locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {projectsPost.map((post: Post) => (
              <ArchiveCard
                key={post.id}
                post={post}
                locale={locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {studentProjectsPost.map((post: Post) => (
              <ArchiveCard
                key={post.id}
                post={post}
                locale={locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {environmentPlaningPost.map((post: Post) => (
              <ArchiveCard
                key={post.id}
                post={post}
                locale={locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ArchivedTab;
