import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.svg";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";

const MobileDrawer = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);

  const liStyle = "";
  return (
    <div className=" xl:hidden flex justify-center items-center  bg-primary py-2 w-full relative h-20">
      <Link href={`/${locale}/`}>
        <Image src={logo} alt="logo" width={60} height={60} />
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
          <div className="drawer-side drawer-end">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>

            <div className=" overflow-y-scroll list-none text-center p-4 w-80 min-h-full bg-base-200 text-base-content">
              <Image
                className="mx-auto"
                src={logo}
                alt="logo"
                width={60}
                height={60}
              />
              {/* Sidebar content here */}
              <li className={liStyle}>
                <Link href={`/${locale}/news`}>
                  {dictionary.navigation.links.news}
                </Link>
              </li>
              <li className={liStyle}>
                <Link href={`/${locale}/concept`}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
