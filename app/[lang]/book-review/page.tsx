import BookSlider from "@/components/bookReviews/BookSlider";
import PaddingContainer from "@/components/layout/PaddingContainer";
import directus from "@/lib/directus";
import { Review } from "@/types/collection";
import React from "react";

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
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return reviews?.data || [];
      } else {
        const localizedReview = reviews.data?.map((review: Review) => {
          return {
            ...review,
            title: review?.translations[0].title,
            review: review?.translations[0].review,
          };
        });

        return localizedReview || [];
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching reviews");
    }
  };

  const latestBookReview: Review[] = (await getAllBookReview()).reverse();

  return (
    <div className="overflow-y-auto">
      <PaddingContainer>
        <BookSlider locale={locale} reviews={latestBookReview} />
      </PaddingContainer>
    </div>
  );
};

export default BookReview;
