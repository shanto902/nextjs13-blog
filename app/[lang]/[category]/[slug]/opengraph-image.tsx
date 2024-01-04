/* eslint-disable @next/next/no-img-element */

import directus from "@/lib/directus";
import { Post } from "@/types/collection";

import { ImageResponse } from "next/og";
import { cache } from "react";

export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Sthapattay O Nirman | Article";
export const contentType = "image/png";

export default async function og({
  params: { slug, lang },
}: {
  params: { slug: string; lang: string };
}) {
  const getPostData = cache(async (postSlug: string) => {
    try {
      const post = await directus.items("post").readByQuery({
        filter: {
          _and: [
            {
              slug: {
                _eq: postSlug,
              },
              status: {
                _eq: "published",
              },
            },
          ],
        },
        fields: ["*", "author.first_name", "author.last_name"],
      });

      const postData = post?.data?.[0];

      return postData;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching post");
    }
  });
  // Get Data from CMS
  const post: Post = await getPostData(slug);

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1 object-cover w-full h-full object-center"
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`}
            alt={post?.title!!}
          />
          {/* Overlay */}
          {/* <div tw="absolute flex inset-0 bg-black bg-opacity-50 " /> */}
        </div>
        <div tw="flex flex-col text-neutral-50 ">
          {/* Title */}
          {/* <div tw="text-[60px]">{post?.title}</div> */}
          {/* Description */}
          {/* <div tw="text-2xl max-w-4xl">{post?.description}</div> */}
          {/* Tags */}
          {/* <div tw="flex mt-6 flex-wrap items-center text-3xl text-neutral-200">
            <div tw={`font-medium`}>{post?.category.title}</div>
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300 " />
            <div>{`${post?.author.first_name} ${post?.author.last_name}`}</div>
          </div> */}
        </div>
      </div>
    ),
    size
  );
}
