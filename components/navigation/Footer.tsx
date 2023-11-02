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
    <div className=" pt-8 mt-10 border-t flex flex-col bg-base-100 relative lg:z-10">
      <PaddingContainer>
        {/* Title Description */}
        <div>
          <div className=" grid lg:grid-cols-6 grid-cols-3 gap-5  py-3">
            <div className=" col-span-1 ">
              <Image
                src={logo}
                alt="Logo"
                width={135}
                height={160}
                className=" aspect-square"
              />

              <OurPhotoZoom />
            </div>
            <div className=" col-span-3  md:place-self-end">
              <p className=" mt-4 grid grid-cols-9 col-span-2  w-fit space-y-2  text-sm">
                <span className=" col-span-2 font-bold mt-2">
                  {dictionary.footer.editor}
                </span>{" "}
                <span className=" text-center"> : </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.editorName}
                </span>
                <span className=" col-span-2 font-bold mt-2">
                  {dictionary.footer.administratorPanel}
                </span>{" "}
                <span className=" text-center"> : </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.ratba}
                </span>
                <span className=" col-span-2 font-bold mt-2"></span>{" "}
                <span className=" text-center"> </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.nishi}
                </span>
                <span className=" col-span-2 font-bold mt-2"></span>{" "}
                <span className=" text-center"> </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.faiza}
                </span>
                <span className=" col-span-2 font-bold">
                  {dictionary.footer.email}
                </span>{" "}
                <span className=" text-center"> : </span>{" "}
                <span className=" col-span-6 text-left">
                  sthapattyanonirman@gmail.com
                </span>
                <span className=" col-span-2 font-bold">
                  {dictionary.footer.phone}
                </span>{" "}
                <span className=" text-center"> : </span>{" "}
                <span className=" col-span-6 text-left">
                  {dictionary.footer.phoneNo}
                </span>
                <span className=" col-span-2 font-bold">
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
              <ul className=" grid  text-sm grid-cols-2 w-full gap-x-5 gap-y-2">
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

                <Link className={liStyle} href={`/${locale}/archived`}>
                  {" "}
                  <li>{dictionary.navigation.links.archived}</li>
                </Link>
                <Link
                  className={liStyle}
                  href={`/${locale}/environment-and-planning`}
                >
                  {" "}
                  <li>{dictionary.navigation.links.environmentPlaning}</li>
                </Link>
              </ul>
            </div>

            {/* Social and Currently At Section  */}
          </div>

          <div className=" flex items-center w-full justify-between">
            <button className=" btn btn-sm text-secondary hover:text-accent bg-accent mt-4 mb-4  w-full">
              {dictionary.footer.editorialBoard}
            </button>
            <div className=" flex gap-3 items-center mt-2">
              <SocialLink
                platform="instagram"
                link={siteConfig.socialLinks.instagram}
              />
              <SocialLink
                platform="facebook"
                link={siteConfig.socialLinks.facebook}
              />
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className=" border-t py-2 text-center">
          <div className=" text-sm text-neutral-400">
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
