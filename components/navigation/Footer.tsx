import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import siteConfig from "@/config/site";
import SocialLink from "../elements/SocialLink";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";

const Footer = async ({ locale }: { locale: string }) => {
  const liStyle =
    "pt-2 font-bold border-t-4 uppercase hover:text-red-800  hover:border-red-800";
  const dictionary = await getDictionary(locale);
  return (
    <div className=" pt-8 mt-10 border-t bg-base-100 relative">
      <PaddingContainer>
        {/* Title Description */}
        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-5  py-3">
          <div className=" col-span-1 ">
            <Image src={logo} alt="Logo" width={135} height={160} />

            <p className=" mt-4 grid grid-cols-5  w-fit space-y-2  text-sm">
              <span className=" font-bold mt-2">
                {dictionary.footer.editor}
              </span>{" "}
              <span className=" text-center"> : </span>{" "}
              <span className=" col-span-3 text-left">
                {dictionary.footer.editorName}
              </span>
              <span className=" font-bold">{dictionary.footer.email}</span>{" "}
              <span className=" text-center"> : </span>{" "}
              <span className=" col-span-3 text-left">
                sthapattyanonirman@gmail.com
              </span>
              <span className=" font-bold">{dictionary.footer.phone}</span>{" "}
              <span className=" text-center"> : </span>{" "}
              <span className=" col-span-3 text-left">
                {dictionary.footer.phoneNo}
              </span>
              <span className=" font-bold">{dictionary.footer.address}</span>{" "}
              <span className=" text-center"> : </span>{" "}
              <span className=" col-span-3 text-left">
                {dictionary.footer.addressValue}
              </span>
              <span className=" col-span-5">
                {dictionary.footer.addressValue2}
              </span>
            </p>
            <button className=" btn text-secondary hover:text-accent bg-accent mt-4 ">
              Editorial Board
            </button>
          </div>

          <ul className="col-span-2 grid lg:grid-cols-2 grid-cols-1 gap-x-8">
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
            <div>
              <div className=" flex gap-3 items-center mt-2">
                <SocialLink
                  platform="twitter"
                  link={siteConfig.socialLinks.twitter}
                />
                <SocialLink
                  platform="youtube"
                  link={siteConfig.socialLinks.youtube}
                />
                <SocialLink
                  platform="facebook"
                  link={siteConfig.socialLinks.facebook}
                />
                <SocialLink
                  platform="linkedin"
                  link={siteConfig.socialLinks.linkedin}
                />
              </div>
            </div>
          </ul>

          {/* Social and Currently At Section  */}
        </div>

        {/* Bottom Section */}
        <div className=" border-t py-2 text-center">
          <div className=" text-sm text-neutral-400">
          ©  {new Date().getFullYear()} Copyrights by Sthapattya o Nirman. All Rights Reserved. Developed by DeshiInc.
      
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Footer;
