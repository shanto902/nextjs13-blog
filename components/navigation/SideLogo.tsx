"use client";

import React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
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
      {pathname === "/bn" || pathname === "/en" ? (
        <div></div>
      ) : (
        <div className=" max-w-7xl relative">
          <div className=" absolute left-[-90px] top-16 -mt-[4px]">
            {" "}
            <Link href={`/${locale}`}>
              <Image
                className=" aspect-square hidden lg:block opacity-40"
                src={logo}
                alt="logo"
                width={70}
                height={70}
              />
            </Link>
            <div
              className={` -rotate-90 bg-base-100 ${
                locale === "bn"
                  ? params.category === "heritage"
                    ? "text-[43px] ml-[-37px] mt-[43px]"
                    : params.category === "news"
                    ? "text-[43px] ml-[-57px] mt-[66px] "
                    : params.category === "arts"
                    ? "text-[43px] ml-[-48px] mt-[56px]  "
                    : params.category === "concepts"
                    ? "text-[43px] ml-[-40px] mt-[49px] text-end"
                    : params.category === "personality"
                    ? "text-[43px] ml-[-40px] mt-[46px]"
                    : params.category === "dialogue"
                    ? "text-[43px] ml-[-37px] mt-[43px]"
                    : params.category === "projects"
                    ? "text-[43px] ml-[-38px] mt-[44px] text-end"
                    : pathname.match(/^\/(bn|en)\/student-projects/)
                    ? "text-[43px] pt-[14px] break-words max-w-[180px] text-end mt-[72px] leading-[34px] ml-[-64px]"
                    : pathname.match(/^\/(bn|en)\/archived/)
                    ? "text-[43px] mt-[57px] ml-[-48px] "
                    : pathname.match(/^\/(bn|en)\/published-magazine/)
                    ? "text-[43px] break-words text-end max-w-[158px] leading-[43px] pt-[10px] ml-[-47px] mt-[56px]"
                    : params.category === "environment-and-planning"
                    ? "text-[43px] break-words max-w-[171px] text-end mt-[64px] ml-[-55px] leading-[41px] pt-[10px]"
                    : ""
                  : // FOR ENGLISH FONT
                  params.category === "news"
                  ? "text-[38px] mt-[52px] ml-[-43px] uppercase text-end"
                  : params.category === "heritage"
                  ? "text-[38px] ml-[-75px] mt-[83px] uppercase text-end"
                  : params.category === "arts"
                  ? "text-[38px] uppercase ml-[-43px] mt-[53px] text-end"
                  : params.category === "concepts"
                  ? "text-[38px] ml-[-82px] mt-[92px] uppercase  text-end"
                  : params.category === "personality"
                  ? "text-[38px] uppercase ml-[-108px] mt-[119px] text-end"
                  : params.category === "dialogue"
                  ? "text-[38px] uppercase ml-[-81px] mt-[89px] text-end"
                  : params.category === "projects"
                  ? "text-[38px] uppercase mt-[82px] ml-[-73px] text-end"
                  : pathname.match(/^\/(bn|en)\/student-projects/)
                  ? "text-[38px] uppercase ml-[-68px] mt-[87px] break-words pb-[5px] max-w-[206px] leading-[39px] text-end"
                  : pathname.match(/^\/(bn|en)\/archived/)
                  ? "text-[38px] uppercase ml-[-63px] mt-[72px] text-end"
                  : pathname.match(/^\/(bn|en)\/published-magazine/)
                  ? "text-[38px] uppercase ml-[-70px] mt-[87px] break-words  max-w-[205px] leading-[39px] text-end"
                  : params.category === "environment-and-planning"
                  ? "text-[38px]  uppercase ml-[-103px] mt-[122px] break-words  max-w-[272px] leading-[39px] text-end"
                  : "" // Add more conditions as needed
              } hidden lg:block  overflow-hidden`}
            >
              <Link
                href={
                  params.category
                    ? `/${locale}/${params.category}`
                    : `${pathname}`
                }
              >
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
              </Link>
            </div>
          </div>
          <div className=" absolute left-[-90px] top-96">
            {matchingPost?.left_ad && (
              <Image
                className="  object-cover max-h-[400px] max-w-[80px] hidden aspect-[1/5] lg:block mt-20"
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${matchingPost.left_ad}?key=optimized`}
                alt="logo"
                width={80}
                height={400}
              />
            )}
          </div>
          <div className=" absolute right-[-135px] top-96">
            {matchingPost?.right_ad && (
              <Image
                className="  object-cover max-h-[400px] max-w-[80px] hidden aspect-[1/5] lg:block mt-20"
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${matchingPost.right_ad}?key=optimized`}
                alt="logo"
                width={80}
                height={400}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SideLogo;
