import { getDictionary } from "@/lib/getDictionary";
import { Post } from "@/types/collection";
import Image from "next/image";
import React from "react";
import InputFormArchived from "./InputFormArchived";
import { AppWindow, PanelRightCloseIcon, User } from "lucide-react";

const ArchiveCard = async ({
  post,
  locale,
}: {
  post: Post;
  locale: string;
}) => {
  const dictionary = await getDictionary(locale);
  return (
    <div>
      <div className="relative group image-full object-cover object-center">
        <figure className="relative">
          <Image
            className="aspect-square object-cover object-center"
            width={600}
            height={600}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`}
            alt="Shoes"
          />
        </figure>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className=" p-4 flex flex-col justify-center gap-4 bg-black w-full h-full bg-opacity-50">
            <h3 className=" text-xl text-white text-center">
              {dictionary.archivedPage.hoverTitle}
            </h3>
            <InputFormArchived
              name={dictionary.archivedPage.inputName}
              email={dictionary.archivedPage.inputEmail}
            />
            <button className=" w-fit self-center btn px-4 py-2 rounded-lg">
              {dictionary.archivedPage.submitButton}
            </button>
          </div>
        </div>
      </div>
      <h2 className="  text-center mt-4 font-bold mb-2">
        {post.title}
      </h2>
      <div
        className={` gap-2 text-xs @md:text-sm flex flex-wrap items-center justify-center pb-5`}
      >
        
        <div className=" flex flex-row items-center gap-2"><User className="w-4 h-4" />{`${post.author.first_name} ${post.author.last_name}`}</div>
        
        <div className=" flex flex-row items-center gap-2"><PanelRightCloseIcon className="w-4 h-4" />{`${post.category.title}`}</div>
        
        <div className=" flex flex-row items-center gap-2"> <AppWindow className="w-4 h-4" />
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
