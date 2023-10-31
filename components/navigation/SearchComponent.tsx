"use client";
import {
  Lightbulb,
  LightbulbIcon,
  MoonIcon,
  SearchIcon,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react"; // Import useState hook
import LangSwitcher from "../elements/LangSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { Post } from "@/types/collection";
import { Combobox } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchComponent = ({
  locale,
  posts,
}: {
  locale: string;
  posts: Post[];
}) => {
  const [selectedPosts, setSelectedPosts] = useState("");
  const [query, setQuery] = useState(""); // Initialize state to track input focus
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const filteredPost =
    query === ""
      ? posts
      : posts.filter((post) => {
          const lowerCaseQuery = locale === "bn" ? query : query.toLowerCase();
          return (
            post.slug.toLowerCase().includes(lowerCaseQuery) ||
            post.title.toLowerCase().includes(lowerCaseQuery)
          );
        });

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (selectedPosts) {
      // Find the selected post based on selectedPosts value
      const selectedPost = posts.find((post) => post.id === selectedPosts);

      if (selectedPost) {
        // Construct the target URL
        const targetUrl = `/${locale}/${selectedPost.category.slug}/${selectedPost.slug}`;

        // Navigate to the target URL
        router.push(targetUrl);
        setSelectedPosts("");
      }
    }
  }, [selectedPosts, locale, posts, router]);

  return (
    <div className="flex flex-nowrap gap-2 items-center ">
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} onClick={focusInput} className=" cursor-pointer">
          <SearchIcon />
        </label>
        <ul
          tabIndex={0}
          className=" dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-96"
        >
          <Combobox value={""} onChange={setSelectedPosts}>
            <Combobox.Input
              className="text-lg  outline-red-800 outline-2 outline-offset-2 p-2"
              ref={inputRef}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Options className="max-h-56 overflow-auto">
              {query !== "" &&
                filteredPost.map((post) => (
                  <Combobox.Option key={post.id} value={post.id}>
                    <div className="flex flex-row gap-2">
                      <div className="avatar">
                        <div className="w-16 rounded">
                          <Image
                            className=" object-cover object-center"
                            height={40}
                            width={40}
                            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
                            alt={post.title}
                          />
                        </div>
                      </div>

                      <div>
                        <h2 className="font-bold line-clamp-2">{post.title}</h2>
                        <h2 className=" text-red-700 font-semibold">
                          {post.category.title}
                        </h2>
                      </div>
                    </div>
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </Combobox>
        </ul>
      </div>
      <div className={`flex gap-2 h-full`}>
        {" "}
        {/* Toggle opacity class based on input focus */}
        <LangSwitcher locale={locale} />
        {/* <ThemeSwitcher /> */}
      </div>
    </div>
  );
};

export default SearchComponent;
