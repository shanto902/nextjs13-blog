import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import siteConfig from "@/config/site";
import SocialLink from "../elements/SocialLink";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";
import "@/components/post/overlayStyle.css";
import OurPhotoZoom from "./OurPhotoZoom";

const Footer = async ({ locale }: { locale: string }) => {
  const liStyle =
    "pt-2 font-bold border-t-4 uppercase hover:text-red-800  hover:border-red-800";
  const dictionary = await getDictionary(locale);

  return (
    <div className=" mt-10 border-t flex flex-col bg-base-100 relative lg:z-10">
      <PaddingContainer>
        {/* Title Description */}
        <div>
          <div className=" grid lg:grid-cols-6 grid-cols-3 gap-2">
            <div className=" col-span-1 ">
              <Image
                src={logo}
                alt="Logo"
                width={135}
                height={160}
                className=" aspect-square p-5"
              />

              <OurPhotoZoom />
            </div>
            <div className=" col-span-3  lg:place-self-end">
              <p
                className={`grid grid-cols-10 col-span-2  w-fit space-y-2  ${
                  locale === "bn" ? "text-sm" : "text-xs"
                }`}
              >
                <span className=" col-span-3 font-bold mt-2">
                  {dictionary.footer.editor}
                </span>{" "}
                <span className=" text-center"> : </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.editorName}
                </span>
                <span className=" col-span-3 font-bold mt-2 whitespace-nowrap">
                  {dictionary.footer.administratorPanel}
                </span>{" "}
                <span className=" text-center"> : </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.ratba}
                </span>
                <span className=" col-span-3 font-bold mt-2"></span>{" "}
                <span className=" text-center"> </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.nishi}
                </span>
                <span className=" col-span-3 font-bold mt-2"></span>{" "}
                <span className=" text-center"> </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.faiza}
                </span>
                <span className=" col-span-3 font-bold">
                  {dictionary.footer.email}
                </span>{" "}
                <span className=" text-center"> : </span>{" "}
                <span className=" col-span-6 text-left">
                  sthapattyanonirman@gmail.com
                </span>
                <span className=" col-span-3 font-bold">
                  {dictionary.footer.phone}
                </span>{" "}
                <span className=" text-center"> : </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.phoneNo}
                </span>
                <span className=" col-span-3 font-bold">
                  {dictionary.footer.address}
                </span>{" "}
                <span className=" text-center"> : </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.addressValue}{" "}
                  {dictionary.footer.addressValue2}
                </span>
              </p>
            </div>

            {/* bottom category */}
            <div className="lg:col-span-2 col-span-3 lg:place-self-end">
              <ul
                className={`${
                  locale == "bn" ? "text-sm " : "text-[10px]"
                } grid   grid-cols-2 w-full gap-x-5 gap-y-2`}
              >
                <Link className={liStyle} href={`/${locale}/news`}>
                  <li>{dictionary.navigation.links.news}</li>
                </Link>
                <Link className={liStyle} href={`/${locale}/concepts`}>
                  <li>{dictionary.navigation.links.concepts}</li>
                </Link>
                <Link className={liStyle} href={`/${locale}/arts`}>
                  <li>{dictionary.navigation.links.arts}</li>
                </Link>
                <Link className={liStyle} href={`/${locale}/heritage`}>
                  {" "}
                  <li>{dictionary.navigation.links.heritage}</li>
                </Link>
                <Link className={liStyle} href={`/${locale}/personality`}>
                  {" "}
                  <li>{dictionary.navigation.links.personality}</li>
                </Link>
                <Link className={liStyle} href={`/${locale}/dialogue`}>
                  {" "}
                  <li>{dictionary.navigation.links.dialogue}</li>
                </Link>
                <Link className={liStyle} href={`/${locale}/projects`}>
                  {" "}
                  <li>{dictionary.navigation.links.projects}</li>
                </Link>
                <Link className={liStyle} href={`/${locale}/student-projects`}>
                  {" "}
                  <li>{dictionary.navigation.links.studentProjects}</li>
                </Link>

                <Link
                  className={liStyle}
                  href={`/${locale}/environment-and-planning`}
                >
                  {" "}
                  <li>{dictionary.navigation.links.environmentPlaning}</li>
                </Link>

                <Link className={liStyle} href={`/${locale}/archived`}>
                  {" "}
                  <li>{dictionary.navigation.links.archived}</li>
                </Link>
              </ul>
            </div>

            {/* Social and Currently At Section  */}
          </div>

          <div className=" flex items-center mb-2 w-full justify-between">
            <Link
              href={`/${locale}/editorial-board`}
              className={` ${
                locale === "bn" ? "  " : "text-[11px]"
              } btn btn-sm text-secondary hover:text-accent bg-accent  w-[129px]`}
            >
              {dictionary.footer.editorialBoard}
            </Link>
            <div className=" flex gap-3 items-center mt-2">
              <SocialLink
                platform="instagram"
                link={siteConfig.socialLinks.instagram}
              />
              <SocialLink
                platform="facebook"
                link={"https://www.facebook.com/SthapattyaONirman"}
              />
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className=" border-t py-2 text-center">
          <div className=" text-xs text-neutral-400">
            © {new Date().getFullYear()} Copyrights by Sthapattya o Nirman. All
            Rights Reserved. Developed by{" "}
            <a
              className="hover:underline hover:text-accent"
              href="https://www.shantosworkshop.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deshi Inc
            </a>
            .
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Footer;
