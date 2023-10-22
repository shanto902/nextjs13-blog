import PaddingContainer from "@/components/layout/PaddingContainer";
import { getDictionary } from "@/lib/getDictionary";
import React from "react";

const page = async ({
    params,
  }: {
    params: {
      lang: string;
    };
  }) => {
    const locale = params.lang;

    const dictionary = await getDictionary(locale);
  return (
    <div>
      <PaddingContainer>
        <div className=" border border-red-700 rounded-lg p-4">
          <p>
            {dictionary.studentProjects.topDesc}
            <br />
            <br />
           {dictionary.studentProjects.botDesc}
          </p>
        </div>{" "}
      </PaddingContainer>
    </div>
  );
};

export default page;
