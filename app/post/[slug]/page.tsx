import { DUMMY_POSTS } from "@/DUMMY_DATA";
import React from "react";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostHero from "@/components/post/PostHero";
import SocialLink from "@/components/elements/SocialLink";
import PostBody from "@/components/post/PostBody";
import CTACard from "@/components/elements/CTACard";

export const generateStaticParams = async () => {
  return DUMMY_POSTS.map((post) => {
    return {
      slug: post.slug,
    };
  });
};

const PostPage = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const post = DUMMY_POSTS.find((post) => post.slug === params.slug);
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
