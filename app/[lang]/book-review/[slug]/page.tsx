import PaddingContainer from "@/components/layout/PaddingContainer";
import PostBody from "@/components/post/PostBody";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { Review } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon } from "lucide-react";
import Image from "next/image";

const getAllReviewSlugs = async () => {
  try {
    const reviews = await directus.items("book_review").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      sort: ["sort"] as never,
      fields: ["slug"],
    });
    return reviews?.data?.map((review: Review) => review.slug) || [];
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching review slugs");
  }
};

const getAllBookReview = async (reviewSlug: string, locale: string) => {
  try {
    const reviews = await directus.items("book_review").readByQuery({
      filter: {
        _and: [
          {
            slug: {
              _eq: reviewSlug,
            },
            status: {
              _eq: "published",
            },
          },
        ],
      },
      fields: ["*", "translations.*"],
    });
    const reviewData = reviews?.data?.[0];
    if (locale === "en") {
      return reviewData;
    } else {
      const localizedReview = {
        ...reviewData,
        title: reviewData?.translations[0]?.title,
        review: reviewData?.translations[0]?.review || reviewData.review,
      };
      return localizedReview;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching reviews");
  }
};
export const generateStaticParams = async () => {
  try {
    const reviews = await directus.items("book_review").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });
    const params = reviews?.data?.map((post: Review) => {
      return {
        slug: post?.slug as string,
        lang: "en",
      };
    });
    const localizedParams = reviews?.data?.map((post: Review) => {
      return {
        slug: post?.slug as string,
        lang: "bn",
      };
    });

    const allParams = params?.concat(localizedParams ?? []);
    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching Book Reviews");
  }
};

const page = async ({
  params,
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  const locale = params.lang;
  const reviewSlug = params.slug;

  const review: Review = await getAllBookReview(reviewSlug, locale);
  const allSlugs = await getAllReviewSlugs();

  const dictionary = await getDictionary(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: review.title,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/book-review/${review.slug}/opengraph-image.png`,
    publisher: dictionary.metaData.title,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/book-review/${review.slug}`,

    description: review.title,
    articleBody: review.review,
  };
  // Find the current index, next slug, and previous slug
  const currentIndex = allSlugs.indexOf(reviewSlug);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length]; // Loop back to the first item if it's the last one
  const prevSlug =
    allSlugs[(currentIndex - 1 + allSlugs.length) % allSlugs.length]; // Loop to the last item if it's the first one

  const getBookPageViews = async (review: Review) => {
    try {
      const views = await directus.items("bookPageViews").readByQuery({
        filter: {
          book_id: review.id,
        },
        fields: ["*"],
      });

      if (views.data && views.data.length > 0) {
        // If views exist, update the counter by 1
        const existingView = views.data[0];
        const updatedCounter = existingView.counter + 1;

        // Update the existing bookPageViews after a delay of 20 seconds
        setTimeout(async () => {
          try {
            await directus.items("bookPageViews").updateOne(existingView.id, {
              counter: updatedCounter,
            });
          } catch (error) {
            console.error("Error updating bookPageViews counter", error);
          }
        }, 30000); // 30 seconds in milliseconds

        return updatedCounter;
      } else {
        // If no views were found, create a new bookPageViews
        const newPageView = {
          book_id: review.id,
          counter: 1, // Initialize the counter with 1
        };

        // Create the new bookPageViews after a delay of 20 seconds
        setTimeout(async () => {
          try {
            await directus.items("bookPageViews").createOne(newPageView);
          } catch (error) {
            console.error("Error creating bookPageViews", error);
          }
        }, 20000); // 20 seconds in milliseconds

        return 1; // Return 1 as the counter value for the newly created view
      }
    } catch (error) {
      console.error("Error fetching/updating bookPageViews", error);
      throw new Error("Error fetching/updating bookPageViews");
    }
  };

  // Assuming you have the `post` object defined

  const updatedCounter = await getBookPageViews(review);

  const formattedCounter = new Intl.NumberFormat(locale).format(updatedCounter);
  return (
    <PaddingContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="px-10 py-10">
        <h3 className="text-center text-2xl font-semibold mb-5">
          {review.title}
        </h3>
        <div className="flex justify-center items-center gap-2">
          <EyeIcon /> <span className="text-lg">{formattedCounter}</span>
        </div>
        <Image
          className="mx-auto my-5"
          width={600}
          height={500}
          alt="Book Review"
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${review.book_cover}?key=optimized`}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(500, 500)
          )}`}
        />
        <PostBody body={review.review} locale={locale} />

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10">
          <a
            href={`/${locale}/book-review/${prevSlug}`}
            className="text-blue-500 hover:underline"
          >
            <ChevronLeftIcon
              className="h-8 w-8 bg-black text-red-600"
              aria-hidden="true"
            />
          </a>
          <a
            href={`/${locale}/book-review/${nextSlug}`}
            className="text-blue-500 hover:underline"
          >
            <ChevronRightIcon
              className="h-8 w-8 bg-black text-red-600 "
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </PaddingContainer>
  );
};

export default page;
