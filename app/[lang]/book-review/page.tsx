import PaddingContainer from "@/components/layout/PaddingContainer";
import directus from "@/lib/directus";
import { Review } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";

const BookReview = async ({
  params,
}: {
  params: {
    lang: string;
  };
}) => {
  const locale = params.lang;

  const getAllBookReview = async () => {
    try {
      const reviews = await directus.items("book_review").readByQuery({
        sort: ["sort"] as never, // Use string[] directly
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return reviews?.data || [];
      } else {
        const localizedReview = reviews.data?.map((review: Review) => {
          return {
            ...review,
            title: review?.translations[0]?.title || review.title,
            review: review?.translations[0]?.review || review.review,
          };
        });

        return localizedReview || [];
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching reviews");
    }
  };

  const latestBookReview = await getAllBookReview();

  return (
    <div className="pb-10">
      <PaddingContainer>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-5">
          {latestBookReview.map((bookReview: Review) => (
            <Link
              key={bookReview.id}
              href={`/${locale}/book-review/${bookReview.slug}`}
            >
              <Image
                className="w-full  object-contain object-center h-full"
                width={850}
                height={600}
                alt={bookReview.title as string}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${bookReview.book_cover}?key=optimized`}
              />
              <h3
                className={` ${
                  locale === "bn"
                    ? "@lg:text-3xl font-bold md:text-2xl text-2xl "
                    : "@lg:text-2xl font-semibold md:text-xl text-lg"
                } underline underline-offset-[8px]  decoration-red-700 @md:pb-5 leading-relaxed pb-4 text-center `}
              >
                {bookReview.title}
              </h3>
            </Link>
          ))}
        </div>
        {/* <BookSlider locale={locale} reviews={latestBookReview} /> */}
      </PaddingContainer>
    </div>
  );
};

export default BookReview;
