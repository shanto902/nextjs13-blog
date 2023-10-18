"use client";
import React, { useState, useEffect } from "react";
import { Post } from "@/types/collection";
import Link from "next/link";
import Image from "next/image";
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

  const renderPostLayout = (post: Post, index: number) => {
    switch (index % 8) {
      case 0:
        return <LayoutComponent post={post} locale={locale} customLayout={0} />;
      case 1:
        return <LayoutComponent post={post} locale={locale} customLayout={1} />;
      case 2:
        return <LayoutComponent post={post} locale={locale} customLayout={2} />;
      case 3:
        return <LayoutComponent post={post} locale={locale} customLayout={3} />;
      case 4:
        return <LayoutComponent post={post} locale={locale} customLayout={4} />;
      case 5:
        return <LayoutComponent post={post} locale={locale} customLayout={5} />;
      case 6:
        return <LayoutComponent post={post} locale={locale} customLayout={6} />;
      case 7:
        return <LayoutComponent post={post} locale={locale} customLayout={7} />;
      // Add cases for other layout components
      default:
        return <div key={post.title}>Something went wrong</div>;
    }
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

  return (
    <div>
      <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-5">
        {currentPosts.map((post, index) => (
          <div
            className={`${
              index === 0 ? "md:col-span-2" : index === 5 ? "md:col-span-2" : ""
            } `}
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
