import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.svg";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";
import LangSwitcher from "../elements/LangSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const MobileDrawer = ({
  locale,
  dictionary,
}: {
  locale: string;
  dictionary: any;
}) => {
  const liStyle = " hover:text-red-700 ";
  return (
    <div className=" lg:hidden flex justify-center items-center  bg-base-100 py-2 w-full relative h-20">
      <Link href={`/${locale}/`}>
        <Image
          className="aspect-square"
          src={logo}
          alt="logo"
          width={60}
          height={60}
        />
      </Link>
      <div className="absolute top-4 right-5">
        <div className="drawer drawer-end w-full ">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="  drawer-content  px-2 py-2 ">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className=" drawer-button cursor-pointer hover:text-red-700 "
            >
              <MenuIcon height={40} width={40} />
            </label>
          </div>
          <div className="drawer-side drawer-end !z-50">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>

            <div className=" overflow-y-scroll list-none text-center p-4 w-80 min-h-full bg-base-100 text-base-content">
              <div className=" grid grid-cols-3 place-items-center">
                <div></div>
                <Image
                  className="mx-auto aspect-square"
                  src={logo}
                  alt="logo"
                  width={60}
                  height={60}
                />
                <label
                  htmlFor="my-drawer"
                  className=" cursor-pointer ml-10  hover:text-red-700 "
                >
                  <X height={40} width={40} />
                </label>
                {/* <input id="my-drawer" type="checkbox" className="drawer-toggle" /> */}
              </div>
              {/* Sidebar content here */}
              <ul
                className={` ${
                  locale === "bn" ? " text-xl " : "text-lg "
                } mt-10 font-bold uppercase flex flex-col justify-center items-stretch gap-4`}
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

              <button className=" btn rounded-md  text-xl text-secondary hover:text-accent bg-accent mt-8 mb-4 ">
                {dictionary.footer.editorialBoard}
              </button>
              <div className=" flex flex-row justify-around gap-5 mt-5">
                <LangSwitcher locale={locale} />
                {/* <ThemeSwitcher /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
