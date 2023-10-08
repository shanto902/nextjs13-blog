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
  const postsPerPage = 7;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const currentPosts = posts.slice(startIndex, endIndex);



  const LayoutComponent2 = ({ post }: { post: Post }) => {
    return (
      <div>
        Layout Component 2
        <div key={post.title}>
          Post Title: {post.title}
          <Link href={`http://localhost:3000/post/${post.slug}`}>Visit</Link>
        </div>
      </div>
    );
  };

  const LayoutComponent3 = ({ post }: { post: Post }) => {
    return (
      <div>
        Layout Component 3
        <div key={post.title}>
          Post Title: {post.title}
          <Link href={`http://localhost:3000/post/${post.slug}`}>Visit</Link>
        </div>
      </div>
    );
  };
  const LayoutComponent4 = ({ post }: { post: Post }) => {
    return (
      <div>
        Layout Component 4
        <div key={post.title}>
          Post Title: {post.title}
          <Link href={`http://localhost:3000/post/${post.slug}`}>Visit</Link>
        </div>
      </div>
    );
  };
  const LayoutComponent5 = ({ post }: { post: Post }) => {
    return (
      <div>
        Layout Component 5
        <div key={post.title}>
          Post Title: {post.title}
          <Link href={`http://localhost:3000/post/${post.slug}`}>Visit</Link>
        </div>
      </div>
    );
  };
  const LayoutComponent6 = ({ post }: { post: Post }) => {
    return (
      <div>
        Layout Component 6
        <div key={post.title}>
          Post Title: {post.title}
          <Link href={`http://localhost:3000/post/${post.slug}`}>Visit</Link>
        </div>
      </div>
    );
  };

  const LayoutComponent7 = ({ post }: { post: Post }) => {
    return (
      <div>
        Layout Component 7
        <div key={post.title}>
          Post Title: {post.title}
          <Link href={`http://localhost:3000/post/${post.slug}`}>Visit</Link>
        </div>
      </div>
    );
  };

  const renderPostLayout = (post: Post, index: number) => {
    switch (index % 7) {
      case 0:
        return <LayoutComponent post={post} locale={locale} customLayout = {0}  />;
      case 1:
        return <LayoutComponent post={post} locale={locale} customLayout = {1}   />;
      case 2:
        return<LayoutComponent post={post} locale={locale} customLayout = {2}   />;
      case 3:
        return <LayoutComponent4 post={post} />;
      case 4:
        return <LayoutComponent5 post={post} />;
      case 5:
        return <LayoutComponent6 post={post} />;
      case 6:
        return <LayoutComponent7 post={post} />;
      // Add cases for other layout components
      default:
        return (
          <div key={post.title}>Default Layout: Post ID: {post.title}</div>
        );
    }
  };

  const renderPagination = () => {
    const pageNumbers = Array.from(Array(totalPages).keys()).map(
      (page) => page + 1
    );

    return (
      <div className="pagination">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className=" grid grid-cols-2 gap-16">
        {currentPosts.map((post, index) => (
          <div className={`${index === 0 ? "col-span-2": ""} `} key={index}>{renderPostLayout(post, index)}</div>
        ))}
      </div>

      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default CategoryPostList;
