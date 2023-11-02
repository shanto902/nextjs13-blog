import directus from "@/lib/directus";
import React from "react";

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
        fields: ["write_up"],
      });

      if (locale === "en") {
        return editorialBoard;
      } else {
        const localizedEditorialBoard = await directus
          .singleton("editorial_board_translations")
          .read({
            fields: ["write_up"],
          });
        return localizedEditorialBoard[0];
      }
    } catch (error) {
      // Handle the error, e.g., logging it or rethrowing it for upper-level handling.
      console.error(error);
      throw error; // Optionally rethrow the error for upper-level handling
    }
  };

  const editorialBoard = await getEditorialBoardData();

  console.log(editorialBoard);

  return <div>page</div>;
};

export default page;
