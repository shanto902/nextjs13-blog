"use client";
import React, { useState } from "react";
import { Post } from "@/types/collection";
import LayoutComponent from "./LayoutComponent";

interface CategoryPostListProps {
  posts: Post[];
  locale: string;
}

const CategoryPostList = ({ posts, locale }: CategoryPostListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const handlePaginationButtonClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
  };

  const currentPosts = posts.slice(startIndex, endIndex);
  const publishedPosts = currentPosts
    .sort(
      (a, b) =>
        new Date(a.date_created).getTime() - new Date(b.date_created).getTime(),
    )
    .filter((post) => post.status === "published")
    .reverse();
  const possibleLayouts = [0, 1, 2, 3, 4, 5, 6, 7];

  // Shuffle the array using the Fisher-Yates algorithm
  function shuffleArray(array: Number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(possibleLayouts);

  const renderPostLayout = (post: Post, index: number) => {
    const randomLayout = possibleLayouts[index % possibleLayouts.length];
    return (
      <LayoutComponent
        post={post}
        locale={locale}
        customLayout={randomLayout}
      />
    );
  };

  const getLocalizedPageNumber = (pageNumber: number, locale: string) => {
    const numbersInEnglish = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const numbersInBengali = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    if (locale === "en") {
      return numbersInEnglish[pageNumber - 1] || pageNumber.toString();
    } else if (locale === "bn") {
      return numbersInBengali[pageNumber - 1] || pageNumber.toString();
    } else {
      return pageNumber.toString();
    }
  };

  const renderPagination = () => {
    const pageNumbers = Array.from(Array(totalPages).keys()).map(
      (page) => page + 1,
    );

    return (
      <div className=" w-full flex gap-5 justify-center items-center mt-20">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePaginationButtonClick(page)}
            className={`${
              currentPage === page
                ? " bg-red-600 rounded-full text-white  "
                : ""
            } font-bold w-8 h-8`}
          >
            {getLocalizedPageNumber(page, locale)}
          </button>
        ))}
      </div>
    );
  };
  const getRandomOddNumber = () => {
    const oddNumbers = [1, 3, 5, 7];
    const randomIndex = Math.floor(Math.random() * oddNumbers.length);
    return oddNumbers[randomIndex];
  };
  return (
    <div>
      <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-5">
        {publishedPosts.map((post, index) => (
          <div
            suppressHydrationWarning
            className={`${getRandomOddNumber() === 1 ? "md:col-span-2" : ""} `}
            key={index}
          >
            {renderPostLayout(post, index)}
          </div>
        ))}
      </div>

      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default CategoryPostList;
