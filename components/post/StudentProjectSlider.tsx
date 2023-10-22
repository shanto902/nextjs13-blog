import { getDictionary } from "@/lib/getDictionary";
import { StudentPost } from "@/types/collection";
import React from "react";
import Slider from "../elements/Slider";

const StudentProjectSlider = async ({
  locale,
  className,
  studentPosts,
}: {
  locale: string;
  className: string;
  studentPosts: StudentPost[];
}) => {
  const dictionary = await getDictionary(locale);
  return (
    <div className={`${className} flex flex-col gap-5`}>
      <h2 className=" text-2xl italic md:text-3xl lg:text-4xl underline underline-offset-auto  decoration-[#0064c6]">
        {dictionary.navigation.links.studentProjects}
      </h2>
      <p>{dictionary.studentProjects.sliderTitle}</p>
      <div>
        <Slider studentPosts={studentPosts} />
      </div>
    </div>
  );
};

export default StudentProjectSlider;
