import PaddingContainer from "@/components/layout/PaddingContainer";
import Image from "next/image";
import React from "react";
import image from "@/assets/number1.png";
import directus from "@/lib/directus";
import { Magazine } from "@/types/collection";
import MagazineCard from "@/components/elements/MagazineCard";
import { getDictionary } from "@/lib/getDictionary";
import { getBlurData } from "@/utils/blur-data-generator";

const page = async ({
  params,
}: {
  params: {
    lang: string;
  };
}) => {
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const getAllMagazines = async () => {
    try {
      const magazines = await directus.items("magazine").readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["*", "translations.*"],
      });
      if (locale === "en") {
        return magazines.data;
      } else {
        const localizedPost = magazines.data?.map((magazine: Magazine) => {
          return {
            ...magazine,
            title: magazine.translations[0].title,
            description: magazine.translations[0].description,
          };
        });

        return localizedPost;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };

  const magazines = await getAllMagazines();

  const processedMagazine = magazines
    ? await Promise.all(
      magazines.map(async (magazine: Magazine) => {
          const { base64 } = await getBlurData(
            `${process.env.NEXT_PUBLIC_ASSETS_URL}${magazine.image}?key=optimized`,
          );
          return {
            ...magazine,
            blurImg: base64,
          };
        }),
      )
    : [];

  return (
    <div className=" min-h-[50vh]">
      <PaddingContainer>
        {processedMagazine ? (
          processedMagazine.map((magazine: Magazine) => (
            <MagazineCard
              key={magazine.id}
              magazine={magazine}
              collectMagazine={dictionary.magazinePage.collectMagazine}
              number={dictionary.magazinePage.number}
              inputName={dictionary.magazinePage.inputName}
              inputEmail={dictionary.magazinePage.inputEmail}
              submitButton={dictionary.magazinePage.submitButton}
              locale={locale}
            />
          ))
        ) : (
          <h2 className=" text-center">No Magazine available</h2>
        )}
      </PaddingContainer>
    </div>
  );
};

export default page;
