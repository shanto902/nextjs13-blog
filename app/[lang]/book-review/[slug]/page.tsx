import PaddingContainer from "@/components/layout/PaddingContainer";
import PostBody from "@/components/post/PostBody";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { Review } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
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
