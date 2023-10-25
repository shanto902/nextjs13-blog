import React from "react";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostHero from "@/components/post/PostHero";
import PostBody from "@/components/post/PostBody";
import directus from "@/lib/directus";
import Image from "next/image";

export const generateStaticParams = async () => {
  try {
    const posts = await directus.items("post").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug", "category.slug"],
    });
    const params = posts?.data?.map((post) => {
      return {
        category: post.category.slug as string,
        slug: post.slug as string,
        lang: "en",
      };
    });
    const localizedParams = posts?.data?.map((post) => {
      return {
        category: post.category.slug as string,
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
  // const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

  const locale = params.lang;

  const getPostData = async () => {
    try {
      const post = await directus.items("post").readByQuery({
        filter: {
          slug: {
            _eq: params.slug,
          },
        },
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
    <div className=" relative max-w-7xl mx-auto">
      {post.left_add && (
        <div className=" hidden xl:block fixed top-72 left-12">
          <Image
            className=" max-h-[400px] object-cover object-center "
            width={100}
            height={400}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.left_add}?key=optimized`}
            alt="Your Image"
          />
        </div>
      )}
      <PaddingContainer>
        <div className=" space-y-10 relative">
          <PostHero locale={locale} post={post} />
          <div className=" flex gap-10 flex-col md:flex-row">
            <PostBody locale={locale} body={post.body} />
          </div>

          {/* Bottom Add  */}
          {post.bottom_add && (
            <div className=" sticky  bottom-0 flex justify-center">
              <Image
                className=" max-h-24 object-cover object-center "
                width={600}
                height={100}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.bottom_add}?key=optimized`}
                alt="Your Image"
              />
            </div>
          )}
        </div>
      </PaddingContainer>
    </div>
  );
};

export default PostPage;
