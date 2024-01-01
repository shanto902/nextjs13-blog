import PaddingContainer from "@/components/layout/PaddingContainer";
import directus from "@/lib/directus";
import React from "react";
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
          write_up: editorialBoard?.translations[0]?.write_up,
          editor_name: editorialBoard?.translations[0]?.editor_name,
          editor_info: editorialBoard?.translations[0]?.editor_info,
          editorial_board: editorialBoard?.translations[0]?.editorial_board,
        };

        return localizedEditorialBoard;
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching editorial board data:", error);
    }
  };

  const editorialBoard = await getEditorialBoardData();

  return (
    <>
      <PaddingContainer>
        <div className=" @container max-w-3xl mx-auto">
          <div className="text-center border border-red-700 rounded-lg px-10 py-5">
            <EditorBody body={editorialBoard?.write_up} locale={locale} />
          </div>
        </div>

        <div className=" py-10">
          <EditorBody body={editorialBoard?.editorial_board} locale={locale} />
        </div>
      </PaddingContainer>
    </>
  );
};

export default page;
