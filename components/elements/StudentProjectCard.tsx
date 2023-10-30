import { Post } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";
import {
  AppWindow,
  GraduationCap,
  PanelRightCloseIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StudentProjectCard = ({
  latestThreePosts,
  locale,
}: {
  latestThreePosts: Post[];
  locale: string;
}) => {
  return (
    <div className=" flex flex-col gap-5">
      {latestThreePosts.map((post) => (
        <div className=" flex flex-row items-center gap-5" key={post.id}>
          <Link
            href={`/${locale}/${post.category.slug}/${post.slug}`}
            className="md:max-w-[200px] max-w-[150px]"
          >
            <Image
              className=" md:aspect-video  aspect-[5/4] object-cover object-center"
              width={300}
              height={150}
              alt={post.title}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(300, 150),
              )}`}
            />
          </Link>

          <div className=" flex-1">
            <Link
              href={`/${locale}/${post.category.slug}/${post.slug}`}
              className=" text-lg line-clamp-2"
            >
              {post.title}
            </Link>
            <div className=" gap-2 text-xs @md:text-sm flex flex-wrap items-center mt-2">
              <Link
                href={`/${locale}/${post.category.slug}`}
                className=" flex flex-row items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                {`${post.university.name}`}
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
        </div>
      ))}
    </div>
  );
};

export default StudentProjectCard;
