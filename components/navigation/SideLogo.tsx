"use client";

import React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import ScaleText from "react-scale-text";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Post } from "@/types/collection";

const SideLogo = ({
  dictionary,
  locale,
  posts,
}: {
  dictionary: any;
  locale: string;
  posts: Post[];
}) => {
  const params = useParams();
  const pathname = usePathname();
  const parts = pathname.split("/");

  const lastValue = parts[parts.length - 1];

  const matchingPost = posts && posts.find((post) => post.slug === lastValue);

  return (
    <>
      {/* {pathname === "/bn" || pathname === "/en" ? (
        <div></div>
      ) : (
        <div className=" max-w-7xl relative">
          <div className=" absolute left-[-100px] top-16">
            {" "}
            <Link href={`/${locale}`}>
              <Image
                className=" aspect-square hidden lg:block opacity-40"
                src={logo}
                alt="logo"
                width={80}
                height={80}
              />
            </Link>
            <div
              className="parent hidden lg:block text-right overflow-hidden leading-tight"
              style={{ width: "80px", height: "120px" }}
            >
              <div
                className="parent hidden lg:block text-right overflow-hidden leading-tight"
                style={{ width: "80px", height: "120px" }}
              >
                <ScaleText>
                  <p className="child">
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
                      (pathname.match(/^\/(bn|en)\/student-projects/) &&
                        dictionary.navigation.links.studentProjects) ||
                      (params.category === "technology" &&
                        dictionary.navigation.links.technology) ||
                      (params.category === "environment-and-planning" &&
                        dictionary.navigation.links.environmentPlaning) ||
                      (pathname.match(/^\/(bn|en)\/archived/) &&
                        dictionary.navigation.links.archived) ||
                      (pathname.match(/^\/(bn|en)\/published-magazine/) &&
                        dictionary.navigation.links.publishedMagazine) ||
                      "Not Found"}
                  </p>
                </ScaleText>
              </div>
            </div>
            {matchingPost?.left_add && (
              <Image
                className=" pt-24 pr-5 hidden lg:block -z-10"
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${matchingPost.left_add}?key=optimized`}
                alt="logo"
                width={100}
                height={400}
              />
            )}
          </div>
        </div>
      )} */}
    </>
  );
};

export default SideLogo;
