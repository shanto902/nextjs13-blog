import React from "react";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostHero from "@/components/post/PostHero";
import PostBody from "@/components/post/PostBody";
import directus from "@/lib/directus";
import Image from "next/image";
import CommentsInput from "@/components/comments/CommentsInput";
import { getDictionary } from "@/lib/getDictionary";
import userImag from "@/assets/userImage.svg";
import SocialLink from "@/components/elements/SocialLink";

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
          _and: [
            {
              slug: {
                _eq: params.slug,
              },
              status: {
                _eq: "published",
              },
            },
          ],
        },
        fields: [
          "*",
          "category.id",
          "category.title",
          "category.slug",
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

  const getCommentsData = async () => {
    try {
      const comments = await directus.items("comments").readByQuery({
        filter: {
          _and: [
            {
              post_slug: {
                _eq: post.slug,
              },
              status: {
                _eq: "published",
              },
            },
          ],
        },

        fields: ["*"],
      });

      return comments.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching category");
    }
  };

  const comments = await getCommentsData();

  if (!post) {
    return notFound();
  }

  const dictionary = await getDictionary(locale);

  const getLocalizedNumber = (number: number, locale: string) => {
    const numbersInEnglish = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const numbersInBengali = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    if (locale === "en") {
      return numbersInEnglish[number - 1] || number.toString();
    } else if (locale === "bn") {
      return numbersInBengali[number - 1] || number.toString();
    } else {
      return number.toString();
    }
  };
  return (
    <div className=" relative max-w-[1380px] mx-auto">
      {post.left_add && (
        <div className=" hidden xl:block fixed top-72 ">
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
        <div className="flex flex-col-reverse md:flex-row gap-10">
          <CommentsInput
            title={dictionary.commentsSection.title}
            descriptionPlaceholder={dictionary.commentsSection.description}
            inputName={dictionary.commentsSection.inputName}
            inputEmail={dictionary.commentsSection.inputEmail}
            submitButton={dictionary.commentsSection.submitButton}
            postId={post.id}
            postSlug={post.slug}
          />
          <div className=" flex-1">
           <div className=" flex flex-row items-center justify-between">
           <h3 className=" text-lg font-semibold underline underline-offset-4 decoration-blue-700">
              {comments && getLocalizedNumber(comments?.length + 1, locale)}{" "}
              {dictionary.commentsSection.comment}
            </h3>
            <div className=" flex flex-row gap-2">
            <SocialLink
                isShareURL
                platform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/${post.category.slug}/${post.slug}`}`}
              />
              <SocialLink
                isShareURL
                platform="twitter"
                link={`https://twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/${post.category.slug}/${post.slug}`}`}
              />
              <SocialLink
                isShareURL
                platform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/${post.category.slug}/${post.slug}`}`}
              />
            </div>
           </div>
            <div>
              {comments &&
                comments.map((comment) => (
                  <div key={comment.id} className=" flex gap-5 mt-5 flex-row">
                    <Image src={userImag} alt=" User Image" />
                    <div>
                      <h2>{comment.name}</h2>
                      <p>
                        {new Date(comment.date_created).toLocaleDateString(
                          `${locale}`,
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                      <p>{comment.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default PostPage;
