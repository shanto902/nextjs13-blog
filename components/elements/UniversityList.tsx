import React from "react";
import { StudentPost, University } from "@/types/collection";
import Image from "next/image";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { AppWindow, PanelRightCloseIcon, User } from "lucide-react";
import Link from "next/link";

const UniversityList = ({
  university,
  locale,
}: {
  university: University;
  locale: string;
}) => {
  return (
    <div className=" flex flex-col gap-4 my-4">
      <h3 className=" underline decoration-red-700 text-lg font-semibold">
        {university.tag_line}
      </h3>
      <div className=" grid grid-cols-3 gap-10">
        {university.posts.map((post: StudentPost) => (
          <div key={post.id} className="">
            <Link href={`/${locale}/${post.category.slug}/${post.slug}`}>
              <Image
                className=" w-[380px] h-[280px] object-cover object-center"
                width={380}
                height={280}
                alt={post.title}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(380, 280),
                )}`}
              ></Image>
              <h2 className=" my-2 font-bold">{post.title}</h2>
            </Link>

            <div className=" gap-2 text-xs @md:text-sm flex flex-wrap items-center justify-center">
              {/* <div className=" flex flex-row items-center gap-2">
                <User className="w-4 h-4" />
                {`${post.author.first_name} ${post.author.last_name}`}
              </div> */}

              <Link
                href={`/${locale}/${post.category.slug}`}
                className=" flex flex-row items-center gap-2"
              >
                <PanelRightCloseIcon className="w-4 h-4" />
                {`${post.category.title}`}
              </Link>

              <div className=" flex flex-row items-center gap-2">
                {" "}
                <AppWindow className="w-4 h-4" />
                {new Date(post.date_created).toLocaleDateString(`${locale}`, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityList;
