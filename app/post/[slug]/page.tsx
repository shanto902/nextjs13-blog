import { DUMMY_POSTS } from "@/DUMMY_DATA";
import React from "react";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostHero from "@/components/post/PostHero";
import SocialLink from "@/components/elements/SocialLink";
import PostBody from "@/components/post/PostBody";
import CTACard from "@/components/elements/CTACard";
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
    const params = posts.data?.map((post) => {
      return {
        slug: post.slug as string,
      };
    });
    return params || [];
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
  };
}) => {
  // const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

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
      ],

    });

    return post?.data?.[0];
    
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
        <PostHero post={post} />
        <div className=" flex gap-10 flex-col md:flex-row">
          <div className=" relative">
            <div className=" sticky top-20 flex items-center it md:flex-col gap-5">
              <div className="font-medium md:hidden">Share this content</div>
              <SocialLink
                isShareURL
                platform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareURL
                platform="twitter"
                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareURL
                platform="instagram"
                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareURL
                platform="linkedin"
                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
            </div>
          </div>
          <PostBody body={post.body} />
        </div>
        <CTACard />
      </div>
    </PaddingContainer>
  );
};

export default PostPage;
