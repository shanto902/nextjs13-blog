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
import directus from "@/lib/directus";
import parse from "html-react-parser";

const Footer = async ({ locale }: { locale: string }) => {
  const getParsedHtml = (body: string) => {
    return parse(body);
  };

  const getFooterContent = async () => {
    try {
      const footer = await directus.singleton("footer").read({
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return footer;
      } else {
        const localizedFooter = {
          ...footer,
          footer_details: footer?.translations[0]?.footer_details,
        };

        return localizedFooter;
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching editorial board data:", error);
    }
  };

  const footerContent = await getFooterContent();
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

              <div className="mt-[-8px]">
                <OurPhotoZoom footer_image={footerContent.footer_image} />
              </div>
            </div>
            <div
              className={`col-span-3 pt-5 ${
                locale === "bn" ? "footer-text " : "footer-text-en"
              }`}
            >
              {getParsedHtml(footerContent.footer_details)}
            </div>

            {/* bottom category */}
            <div className="lg:col-span-2 col-span-3 pt-[22px]">
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
                locale === "bn" ? "" : "text-[11px]"
              } btn btn-sm text-secondary hover:text-accent bg-accent  w-[130px]`}
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
