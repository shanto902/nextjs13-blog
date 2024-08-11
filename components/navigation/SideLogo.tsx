"use client";
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
        <div className=" max-w-7xl relative ">
          <div className=" absolute left-[-90px] top-[91px]   ">
            {" "}
            <Link href={`/${locale}`}>
              <Image
                className=" aspect-square lg:mt-[4px] hidden lg:block opacity-40"
                src={logo}
                alt="logo"
                width={70}
                height={70}
              />
            </Link>
            <div
              className={` -rotate-90 bg-base-100 text-end ${
                locale === "bn"
                  ? params.category === "heritage"
                    ? "text-[43px]  ml-[-41px] mt-[38px]"
                    : params.category === "news"
                    ? "text-[43px] ml-[-47px] mt-[44px] "
                    : params.category === "arts"
                    ? "text-[43px] ml-[-47px] mt-[41px]  "
                    : params.category === "concepts"
                    ? "text-[43px] ml-[-41px] mt-[38px] "
                    : params.category === "personality"
                    ? "text-[43px] ml-[-41px] mt-[38px]"
                    : params.category === "dialogue"
                    ? "text-[43px] ml-[-42px] mt-[37px]"
                    : params.category === "projects"
                    ? "text-[43px] ml-[-41px] mt-[36px] "
                    : pathname.match(/^\/(bn|en)\/student-projects/)
                    ? "text-[43px] pt-[14px] break-words max-w-[195px]  mt-[70px] leading-[34px] ml-[-74px]"
                    : pathname.match(/^\/(bn|en)\/archived/)
                    ? "text-[43px] mt-[38px] ml-[-42px] "
                    : pathname.match(/^\/(bn|en)\/published-magazine/)
                    ? "text-[43px] break-words  max-w-[165px] leading-[43px] pt-[10px] ml-[-52px] mt-[49px]"
                    : params.category === "environment-and-planning"
                    ? "text-[43px] break-words max-w-[171px]  mt-[52px] ml-[-56px] leading-[41px] pt-[10px]"
                    : pathname.match(/^\/(bn|en)\/editorial-board/)
                    ? "text-[43px] break-words  max-w-[158px] leading-[43px] pt-[10px] ml-[-48px] mt-[44px]"
                    : pathname.match(/^\/(bn|en)\/book-review/)
                    ? "text-[43px] break-words  max-w-[190px] leading-[43px] pt-[10px] ml-[-53px] mt-[49px]"
                    : pathname.match(/^\/(bn|en)\/market-cost/)
                    ? "text-[43px] break-words  max-w-[130px] leading-[43px] pt-[10px] ml-[-35px] mt-[30px]"
                    : ""
                  : // FOR ENGLISH FONT
                  params.category === "news"
                  ? "text-[32px] mt-[47px] ml-[-45px] uppercase text-end"
                  : params.category === "heritage"
                  ? "text-[32px] ml-[-63px] mt-[63px] uppercase text-end"
                  : params.category === "arts"
                  ? "text-[32px] uppercase ml-[-45px] mt-[47px] text-end"
                  : params.category === "concepts"
                  ? "text-[32px] ml-[-68px] mt-[70px] uppercase  text-end"
                  : params.category === "personality"
                  ? "text-[32px] uppercase ml-[-90px] mt-[93px] text-end"
                  : params.category === "dialogue"
                  ? "text-[32px] uppercase ml-[-67px] mt-[68px] text-end"
                  : params.category === "projects"
                  ? "text-[32px] uppercase mt-[61px] ml-[-61px] text-end"
                  : pathname.match(/^\/(bn|en)\/student-projects/)
                  ? "text-[32px] uppercase ml-[-69px] mt-[76px] break-words pb-[5px] max-w-[206px] leading-[39px] text-end"
                  : pathname.match(/^\/(bn|en)\/archived/)
                  ? "text-[32px] uppercase ml-[-53px] mt-[53px] text-end"
                  : pathname.match(/^\/(bn|en)\/published-magazine/)
                  ? "text-[32px] uppercase ml-[-71px] mt-[77px] break-words  max-w-[205px] leading-[39px] text-end"
                  : params.category === "environment-and-planning"
                  ? "text-[32px]  uppercase ml-[-94px] mt-[100px] break-words  max-w-[250px] leading-[39px] text-end"
                  : pathname.match(/^\/(bn|en)\/editorial-board/)
                  ? "text-[32px] uppercase break-words text-end max-w-[214px] leading-[39px] pt-[10px] ml-[-80px] mt-[77px]"
                  : pathname.match(/^\/(bn|en)\/book-review/)
                  ? "text-[32px] uppercase break-words text-end max-w-[209px] leading-[39px] pt-[10px] ml-[-60px] mt-[54px]"
                  : pathname.match(/^\/(bn|en)\/market-cost/)
                  ? "text-[32px] uppercase break-words text-end max-w-[209px] leading-[39px] pt-[10px] ml-[-78px] mt-[75px]"
                  : ""
              } hidden lg:block  overflow-hidden`}
            >
              <Link
                href={
                  params.category
                    ? `/${locale}/${params.category}`
                    : pathname.split("/").length > 3
                    ? pathname.split("/").slice(0, -1).join("/")
                    : `/${locale}/book-review`
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
                  (pathname.match(/^\/(bn|en)\/editorial-board/) &&
                    dictionary.navigation.links.editorialBoard) ||
                  (pathname.match(/^\/(bn|en)\/book-review/) &&
                    dictionary.navigation.links.bookReview) ||
                  (pathname.match(/^\/(bn|en)\/market-cost/) &&
                    dictionary.navigation.links.marketCost) ||
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
