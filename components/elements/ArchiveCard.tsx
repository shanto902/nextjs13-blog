import { getDictionary } from "@/lib/getDictionary";
import { Post } from "@/types/collection";
import Image from "next/image";
import React from "react";
import InputFormArchived from "./InputFormArchived";
import {
  AppWindow,
  GraduationCapIcon,
  PanelRightCloseIcon,
  User,
} from "lucide-react";
import { shimmer, toBase64 } from "@/utils/shimmer";

const ArchiveCard = ({
  post,
  locale,
  dictionary,
}: {
  post: Post;
  locale: string;
  dictionary: any;
}) => {
  return (
    <div>
      <div className="relative group image-full ">
        <figure className="relative">
          <Image
            className="aspect-square object-cover object-center"
            width={600}
            height={600}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
            alt="Shoes"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(600, 600)
            )}`}
          />
        </figure>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className=" p-4 flex flex-col justify-center gap-4 bg-black w-full h-full bg-opacity-50 ">
            <InputFormArchived
              name={dictionary.archivedPage.inputName}
              email={dictionary.archivedPage.inputEmail}
              id={post.id}
              submitButton={dictionary.archivedPage.submitButton}
              message={dictionary.magazinePage.messageText}
              hoverTitle={dictionary.archivedPage.hoverTitle}
            />
          </div>
        </div>
      </div>
      <h2 className="  text-center mt-4 font-bold @md:text-md text-base @lg:text-lg @xl:text-xl mb-2">
        {post.title}
      </h2>
      <div
        className={` gap-2 text-xs @md:text-sm flex flex-wrap items-center justify-center pb-5`}
      >
        <div className=" flex flex-row items-center gap-2">
          <User className="w-4 h-4" />
          {`${post.author.first_name} ${post.author.last_name}`}
        </div>

        {post?.university?.name ? (
          <div className=" flex flex-row items-center gap-2">
            <GraduationCapIcon className="w-4 h-4" />
            {`${post.university.name}`}
          </div>
        ) : (
          <div className=" flex flex-row items-center gap-2">
            <PanelRightCloseIcon className="w-4 h-4" />
            {`${post.category.title}`}
          </div>
        )}

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
  );
};

export default ArchiveCard;
