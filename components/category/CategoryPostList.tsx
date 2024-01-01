"use client";
import React, { useState } from "react";
import { Post } from "@/types/collection";
import LayoutComponent from "./LayoutComponent";

interface CategoryPostListProps {
  posts: Post[];
  locale: string;
  categorySlug: string;
}

const CategoryPostList = ({
  categorySlug,
  posts,
  locale,
}: CategoryPostListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const publishedPosts = posts
    .sort((a, b) => {
      const serialA = a.serial_no || 0;
      const serialB = b.serial_no || 0;

      // Compare by serial_no if both have serial_no or if serial_no is not 0
      if (serialA !== 0 && serialB !== 0) {
        return serialA - serialB;
      }

      // If only a has serial_no, a comes first
      if (serialA !== 0) {
        return -1;
      }

      // If only b has serial_no, b comes first
      if (serialB !== 0) {
        return 1;
      }

      // If neither has serial_no, compare by date_created
      return (
        new Date(a.date_created).getTime() - new Date(b.date_created).getTime()
      );
    })
    .filter((post) => post.status === "published");
  const postsPerPage = 8;
  const totalPages = Math.ceil(publishedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const handlePaginationButtonClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
  };

  const currentPosts = publishedPosts.slice(startIndex, endIndex);

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
      (page) => page + 1
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

  return (
    <div>
      <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-5">
        {currentPosts.map((post, index) => (
          <div
            className={` ${
              (categorySlug === "projects" ||
                categorySlug === "environment-and-planning") &&
              index % 3 === 0
                ? "md:col-span-2"
                : ""
            } `}
            key={index}
          >
            <LayoutComponent
              post={post}
              locale={locale}
              categorySlug={categorySlug}
              index={index}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default CategoryPostList;
