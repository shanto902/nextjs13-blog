/* eslint-disable @next/next/no-img-element */

import directus from "@/lib/directus";
import { ImageResponse } from "next/og";
import { cache } from "react";

export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Sthapattay O Nirman | Category";
export const contentType = "image/png";

export default async function og({
  params: { category, lang },
}: {
  params: { category: string; lang: string };
}) {
  // Get Data from CMS
  const getCategoryData = cache(async (categorySlug: string) => {
    try {
      const category = await directus.items("category").readByQuery({
        filter: {
          slug: {
            _eq: categorySlug,
          },
        },

        fields: ["*"],
      });

      return category?.data?.[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching category");
    }
  });
  const categoryData = await getCategoryData(category);

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0 bg-black">
          {/* Overlay */}
          <div tw={`absolute flex inset-0 bg-opacity-80`} />
        </div>
        <div tw="flex flex-col text-white">
          {/* Title */}
          <div tw="text-[60px]">{categoryData?.title}</div>
          {/* Description */}
        </div>
      </div>
    ),
    size
  );
}
