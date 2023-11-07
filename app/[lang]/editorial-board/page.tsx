import PaddingContainer from "@/components/layout/PaddingContainer";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import EditorCard from "@/components/cards/EditorCard";
import PostBody from "@/components/post/PostBody";
import EditorBody from "@/components/elements/EditorBody";
const page = async ({
  params,
}: {
  params: {
    lang: string;
  };
}) => {
  const locale = params.lang;

  const getEditorialBoardData = async () => {
    try {
      const editorialBoard = await directus.singleton("editorial_board").read({
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return editorialBoard;
      } else {
        const localizedEditorialBoard = {
          ...editorialBoard,
          write_up: editorialBoard.translations[0].write_up,
          editor_name: editorialBoard.translations[0].editor_name,
          editor_info: editorialBoard.translations[0].editor_info,
          editorial_board: editorialBoard.translations[0].editorial_board,
        };

        return localizedEditorialBoard;
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching editorial board data:", error);
    }
  };

  const editorialBoard = await getEditorialBoardData();

  const dictionary = await getDictionary(locale);

  const getParsedHtml = (body: string) => {
    return parse(body);
  };
  return (
    <>
      <PaddingContainer>
        <div className=" @container max-w-3xl mx-auto">
          <div className=" text-center border border-red-700 rounded-lg px-10 py-5 ">
            {editorialBoard.write_up}
          </div>

          {/* Editor Section */}
          <div>
            <h2 className=" text-center font-semibold text-4xl mt-14 mb-10">
              {dictionary.editor_board.editor}
            </h2>
            <div className=" flex flex-col md:flex-row gap-14">
              <Image
                alt={"Photo of: " + editorialBoard.editor_name}
                height={500}
                width={500}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${editorialBoard.editor_image}?key=optimized`}
                className="lg:max-w-[200px] place-self-end col-span-1 object-cover object-center aspect-square rounded-full "
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(1200, 675),
                )}`}
              />
              <div className=" place-self-center">
                <h2 className=" text-3xl font-semibold">
                  {" "}
                  {editorialBoard.editor_name}
                </h2>
                <div className=" editor-info mt-7">
                  {getParsedHtml(editorialBoard.editor_info)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" py-10">
          <EditorBody body={editorialBoard.editorial_board} locale={locale} />
        </div>
      </PaddingContainer>
    </>
  );
};

export default page;
