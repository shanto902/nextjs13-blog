"use client";

import React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const SideLogo = ({
  dictionary,
  locale,
}: {
  dictionary: any;
  locale: string;
}) => {
  const params = useParams();
  const pathname = usePathname();
  return (
    <>
      {pathname === "/bn" || pathname === "/en" ? (
        <div></div>
      ) : (
        <div className=" max-w-7xl relative">
          <div className=" absolute left-[-170px] top-16">
            {" "}
            <Link href={`/${locale}`}>
              <Image
                className=" pt-8 hidden xl:block"
                src={logo}
                alt="logo"
                width={150}
                height={190}
              />
            </Link>
            <h2 className="text-right text-3xl font-semibold right-2 pt-4 absolute ">
              {(params.category === "heritage" &&
                dictionary.navigation.links.heritage) ||
                (params.category === "arts" &&
                  dictionary.navigation.links.arts) ||
                (params.category === "news" &&
                  dictionary.navigation.links.news) ||
                (params.category === "concepts" &&
                  dictionary.navigation.links.concepts) ||
                (params.category === "personality" &&
                  dictionary.navigation.links.personality) ||
                (params.category === "dialogue" &&
                  dictionary.navigation.links.dialogue) ||
                (params.category === "projects" &&
                  dictionary.navigation.links.projects) ||
                (params.category === "student-projects" &&
                  dictionary.navigation.links.studentProjects) ||
                (params.category === "technology" &&
                  dictionary.navigation.links.technology) ||
                (params.category === "environment-and-planning" &&
                  dictionary.navigation.links.environmentPlaning) ||
                (params.category === "archive" &&
                  dictionary.navigation.links.archive)}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default SideLogo;
