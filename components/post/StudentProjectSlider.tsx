import { getDictionary } from "@/lib/getDictionary";
import { Post } from "@/types/collection";
import React from "react";
import Slider from "../elements/Slider";

const StudentProjectSlider = async ({
  locale,
  className,
  studentPosts,
}: {
  locale: string;
  className?: string;
  studentPosts: Post[];
}) => {
  const dictionary = await getDictionary(locale);
  const publishedPosts = studentPosts.filter(
    (post) => post.status === "published",
  );
  return (
    <div className={`${className} flex flex-col gap-5`}>
      <h2 className=" text-2xl italic md:text-3xl lg:text-4xl underline  underline-offset-[10px] pb-[5px]  decoration-red-700">
        {dictionary.navigation.links.studentProjects}
      </h2>
      <p>
        {publishedPosts[0]?.university.name}{" "}
        {dictionary.studentProjects.sliderTitle}
      </p>
      <div className=" z-[0]">
        <Slider studentPosts={publishedPosts} locale={locale} />
      </div>
    </div>
  );
};

export default StudentProjectSlider;
