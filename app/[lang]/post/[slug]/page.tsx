import React from "react";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostHero from "@/components/post/PostHero";
import PostBody from "@/components/post/PostBody";
import directus from "@/lib/directus";

export const generateStaticParams = async () => {
  try {
    const posts = await directus.items("post").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });
    const params = posts?.data?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "en",
      };
    });
    const localizedParams = posts?.data?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "bn",
      };
    });

    const allParams = params?.concat(localizedParams ?? []);
    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching posts");
  }
};

const PostPage = async ({
  params,
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {

  const locale = params.lang;

  const getPostData = async () => {
    try {
      const post = await directus.items("post").readByQuery({
        filter: {
          slug: {
            _eq: params.slug,
          },
          
        },
        limit:3,
        fields: [
          "*",
          "category.id",
          "category.title",
          "author.id",
          "author.first_name",
          "author.last_name",
          "translations.*",
          "category.translations.*",
          "author.translations.*",
        ],
      });

      const postData = post?.data?.[0];

      if (locale === "en") {
        return postData;
      } else {
        const localizedPostData = {
          ...postData,
          title: postData?.translations?.[0]?.title,
          description: postData?.translations?.[0]?.description,
          body: postData?.translations?.[0]?.body,
          category: {
            ...postData?.category,
            title: postData?.category?.translations?.[0]?.title,
            description: postData?.category?.translations?.[0]?.description,
          },
          author: {
            ...postData?.author,
            first_name: postData?.author?.translations?.[0]?.first_name,
            last_name: postData?.author?.translations?.[0]?.last_name,
          },
        };
        return localizedPostData;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching post");
    }
  };

  const post = await getPostData();

  if (!post) {
    return notFound();
  }
  return (
    <PaddingContainer>
      <div className=" space-y-10">
        <PostHero locale={locale} post={post} />
        <div className=" flex gap-10 flex-col md:flex-row">
          <PostBody locale={locale} body={post.body} />
        </div>
      </div>
    </PaddingContainer>
  );
};

export default PostPage;
