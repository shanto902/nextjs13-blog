"use client";
import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import SideLogo from "./SideLogo";
import { Post } from "@/types/collection";

import SearchComponent from "./SearchComponent";
import MobileDrawer from "./MobileDrawer";
import Link from "next/link";
import Headroom from "react-headroom";

const StickeyHeader = ({
  locale,
  dictionary,
  posts,
}: {
  locale: string;
  dictionary: any;
  posts: Post[];
}) => {
  const liStyle = "hover:text-red-800 flex-shrink-0 cursor-pointer";

  return (
    <Headroom>
      <div className="bg-base-100">
        <PaddingContainer>
          <div className="mr-10">
            <SideLogo
              locale={locale}
              dictionary={dictionary}
              posts={posts || []}
            />
          </div>
          <div className=" lg:block hidden">
            <div className=" flex items-center justify-between gap-2 py-5">
              {/* Category Links */}
              <nav className=" w-full">
                <ul
                  className={`flex flex-row items-center uppercase justify-between  overflow-hidden w-full mr-2  ${
                    locale === "en"
                      ? " text-[12px] font-bold"
                      : " text-[16px] font-semibold"
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
          <MobileDrawer locale={locale} dictionary={dictionary} />
        </div>
      </div>
    </Headroom>
  );
};

export default StickeyHeader;
