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
      {pathname === "/bn" || pathname === "/en" ? (
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
                width={85}
                height={85}
              />
            </Link>
            <div
              className={` -rotate-90 bg-base-100 ${
                locale === "bn"
                  ? params.category === "heritage"
                    ? "text-[60px] ml-[-19px] mt-[45px]"
                    : params.category === "news"
                    ? "text-[60px] ml-[-50px] mt-[78px] "
                    : params.category === "arts"
                    ? "text-[60px] ml-[-37px] mt-[62px]  "
                    : params.category === "concepts"
                    ? "text-[60px] ml-[2px] mt-[12px]"
                    : params.category === "personality"
                    ? "text-[60px] ml-[-23px] mt-[51px]"
                    : params.category === "dialogue"
                    ? "text-[60px] ml-[-22px] mt-[47px]"
                    : params.category === "projects"
                    ? "text-[60px] ml-[-8px] mt-[35px]"
                    : pathname.match(/^\/(bn|en)\/student-projects/)
                    ? "text-[45px] pt-[14px] break-words max-w-[180px] text-end mt-[60px] leading-[34px] ml-[-57px]"
                    : pathname.match(/^\/(bn|en)\/archived/)
                    ? "text-[60px] mt-[65px] ml-[-37px] "
                    : pathname.match(/^\/(bn|en)\/published-magazine/)
                    ? "text-[45px] break-words text-end max-w-[158px] leading-[45px] pt-[10px] ml-[-44px] mt-[39px]"
                    : params.category === "environment-and-planning"
                    ? "text-[45px] break-words max-w-[171px] text-end mt-[44px] ml-[-57px] leading-[48px] pt-[10px]"
                    : ""
                  : // FOR ENGLISH FONT
                  params.category === "news"
                  ? "text-[45px] mt-[47px] ml-[-15px] uppercase"
                  : params.category === "heritage"
                  ? "text-[45px] ml-[-57px] mt-[88px] uppercase"
                  : params.category === "arts"
                  ? "text-[45px] uppercase ml-[-5px] mt-[37px]"
                  : params.category === "concepts"
                  ? "text-[45px] ml-[-66px] mt-[98px] uppercase"
                  : params.category === "personality"
                  ? "text-[45px] uppercase ml-[-96px] mt-[129px]"
                  : params.category === "dialogue"
                  ? "text-[45px] uppercase ml-[-63px] mt-[95px]"
                  : params.category === "projects"
                  ? "text-[45px] uppercase mt-[88px] ml-[-53px]"
                  : pathname.match(/^\/(bn|en)\/student-projects/)
                  ? "text-[38px] uppercase ml-[-65px] mt-[75px] break-words pb-[5px] max-w-[206px] leading-[39px] text-end"
                  : pathname.match(/^\/(bn|en)\/archived/)
                  ? "text-[45px] uppercase ml-[-43px] mt-[74px]"
                  : pathname.match(/^\/(bn|en)\/published-magazine/)
                  ? "text-[38px] uppercase ml-[-68px] mt-[77px] break-words  max-w-[205px] leading-[39px] text-end"
                  : params.category === "environment-and-planning"
                  ? "text-[38px]  uppercase ml-[-101px] mt-[110px] break-words  max-w-[272px] leading-[39px] text-end"
                  : "" // Add more conditions as needed
              } hidden lg:block  overflow-hidden`}
            >
              <p>
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
            </div>
            {matchingPost?.left_add && (
              <Image
                className="  pt-12 pr-5 hidden lg:block"
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${matchingPost.left_add}?key=optimized`}
                alt="logo"
                width={100}
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
