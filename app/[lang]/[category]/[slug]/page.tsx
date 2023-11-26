import React, { Suspense } from "react";
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
import { Comments, Post } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";

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
    const params = posts?.data?.map((post: Post) => {
      return {
        category: post?.category?.slug as string,
        slug: post?.slug as string,
        lang: "en",
      };
    });
    const localizedParams = posts?.data?.map((post: Post) => {
      return {
        category: post?.category?.slug as string,
        slug: post?.slug as string,
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

const ArticlePage = async ({
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
          project_description: postData?.translations?.[0]?.project_description,
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
                _eq: "approved",
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

  const getPageView = async (post: Post) => {
    try {
      const views = await directus.items("page_view").readByQuery({
        filter: {
          post_id: post.id,
        },
        fields: ["*"],
      });

      if (views.data && views.data.length > 0) {
        // If views exist, update the counter by 1
        const existingView = views.data[0];
        const updatedCounter = existingView.counter + 1;

        // Update the existing page view after a delay of 20 seconds
        setTimeout(async () => {
          await directus.items("page_view").updateOne(existingView.id, {
            counter: updatedCounter,
          });
        }, 30000); // 20 seconds in milliseconds

        return updatedCounter;
      } else {
        // If no views were found, create a new page view
        const newPageView = {
          post_id: post.id,
          counter: 1, // Initialize the counter with 1
          // You can add other fields for the page view as needed
        };

        // Create the new page view after a delay of 20 seconds
        setTimeout(async () => {
          const createdPageView = (await directus
            .items("page_view")
            .createOne(newPageView)) as { counter: number };

          if (!createdPageView) {
            throw new Error("Error creating page view");
          }
        }, 20000); // 20 seconds in milliseconds

        return 1; // Return 1 as the counter value for the newly created view
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching/updating page view");
    }
  };

  // Assuming you have the `post` object defined

  const updatedCounter = await getPageView(post);

  const formattedCounter = new Intl.NumberFormat(locale).format(updatedCounter);

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
    <div className=" relative  mx-auto">
      <PaddingContainer>
        <div className=" space-y-10 relative">
          <PostHero
            locale={locale}
            post={post}
            formattedCounter={formattedCounter}
          />
          <div className=" flex md:pt-5 gap-10 flex-col md:flex-row">
            <PostBody locale={locale} body={post.body} pagePost id={post.id} />
          </div>

          {/* Bottom Add  */}
          {post.bottom_ad && (
            <div className=" sticky lg:hidden  bottom-0 flex justify-center">
              <Image
                className=" aspect-[1:5] max-h-[130px] object-cover object-center "
                width={650}
                height={130}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.bottom_ad}?key=optimized`}
                alt="Your Image"
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(650, 130)
                )}`}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-10 mt-10">
          <CommentsInput
            title={dictionary.commentsSection.title}
            descriptionPlaceholder={dictionary.commentsSection.description}
            inputName={dictionary.commentsSection.inputName}
            inputEmail={dictionary.commentsSection.inputEmail}
            submitButton={dictionary.commentsSection.submitButton}
            postId={post.id}
            postSlug={post.slug}
            loadingText={dictionary.commentsSection.loading}
            message={dictionary.commentsSection.message}
          />
          <div className=" flex-1">
            <div className=" flex flex-row items-center justify-between">
              <h3 className=" text-lg font-semibold underline underline-offset-4 decoration-red-700">
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
            <Suspense fallback={<p>Load</p>}>
              <div>
                {comments &&
                  comments.map((comment: Comments) => (
                    <div key={comment.id} className=" flex gap-5 mt-5 flex-row">
                      <Image src={userImag} alt="User Image" />
                      <div>
                        <h2>{comment.name}</h2>
                        <p>
                          {new Date(comment.date_created).toLocaleDateString(
                            `${locale}`,
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p>{comment.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </Suspense>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default ArticlePage;
