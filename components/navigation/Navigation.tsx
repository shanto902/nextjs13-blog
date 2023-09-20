import Link from "next/link";
import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import SearchComponent from "./SearchComponent";
import MobileDrawer from "./MobileDrawer";
import { getDictionary } from "@/lib/getDictionary";
import Image from "next/image";
import logo from "@/assets/logo.svg";
const Navigation = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);

  const liStyle = "hover:text-red-800 flex-shrink-0";

  return (
    <>
      <Link href={`/${locale}/`}>
        {" "}
        <Image
          className="mx-auto pt-8 hidden xl:block"
          src={logo}
          alt="logo"
          width={80}
          height={80}
        />
      </Link>
      <div className=" sticky z-40 top-0 left-0 right-0 bg-white">
        <PaddingContainer>
          <div className=" xl:block hidden">
            <hr className=" border-neutral-400 mt-4" />
            <div className=" flex items-center justify-between py-5">
              {/* Category Links */}
              <nav>
                <ul
                  className={`flex items-center  text-black flex-nowrap whitespace-nowrap uppercase  overflow-hidden w-auto mr-2 ${
                    locale === "en"
                      ? " text-[13px] gap-2 font-bold "
                      : " text-[20px] gap-4 font-semibold"
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
                    <Link href={`/${locale}/technology`}>
                      {dictionary.navigation.links.technology}
                    </Link>
                  </li>
                  <li className={liStyle}>
                    <Link href={`/${locale}/archive`}>
                      {dictionary.navigation.links.archive}
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
              <SearchComponent locale={locale} />
            </div>
            <hr className=" border-2 border-black" />
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
