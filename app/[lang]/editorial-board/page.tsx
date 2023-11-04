import PaddingContainer from "@/components/layout/PaddingContainer";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import EditorCard from "@/components/cards/EditorCard";
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
        };

        return localizedEditorialBoard;
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching editorial board data:", error);
    }
  };

  const getJointEditorsData = async () => {
    try {
      const jointEditors = await directus.items("joint_editor").readByQuery({
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return jointEditors?.data || [];
      } else {
        const localizedEditors = jointEditors.data?.map((Editors) => {
          return {
            ...Editors,
            name: Editors.translations[0].name,
            info: Editors.translations[0].info,
          };
        });

        return localizedEditors || [];
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching jointEditors");
    }
  };

  const getAdminData = async () => {
    try {
      const admin = await directus.items("administration_panel").readByQuery({
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return admin?.data || [];
      } else {
        const localizedAdmins = admin.data?.map((Editors) => {
          return {
            ...Editors,
            name: Editors.translations[0].name,
            info: Editors.translations[0].info,
          };
        });

        return localizedAdmins || [];
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching admin");
    }
  };

  const getTeamActionData = async () => {
    try {
      const team = await directus.items("action_team").readByQuery({
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return team?.data || [];
      } else {
        const localizedTeam = team.data?.map((Editors) => {
          return {
            ...Editors,
            name: Editors.translations[0].name,
          };
        });

        return localizedTeam || [];
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching Team");
    }
  };
  const editorialBoard = await getEditorialBoardData();

  const adminEditors = await getAdminData();

  const jointEditors = await getJointEditorsData();
  const actionTeam = await getTeamActionData();

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
            <h2 className=" text-center  text-4xl mt-14 mb-10">
              {dictionary.editor_board.editor}
            </h2>
            <div className=" grid grid-cols-2 gap-14">
              <Image
                alt={"Photo of: " + editorialBoard.editor_name}
                height={500}
                width={500}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${editorialBoard.editor_image}?key=optimized`}
                className="lg:max-w-[365px] col-span-1 object-cover object-center aspect-square rounded-full "
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

        {/* Joint Editors  */}
        <div className=" mt-10">
          <h2 className=" text-center py-5  text-4xl mt-14 mb-10">
            {dictionary.editor_board.joint_editor}
          </h2>
          <div className=" grid grid-cols-2 gap-5">
            {jointEditors.map((jointEditor) => (
              <EditorCard key={jointEditor.id} jointEditor={jointEditor} />
            ))}
          </div>
        </div>

        {/* Admin Panel  */}
        <div className=" mt-10">
          <h2 className=" text-center py-5  text-4xl mt-14 mb-10">
            {dictionary.editor_board.administrator_Panel}
          </h2>
          <div className=" grid grid-cols-3 gap-3">
            {adminEditors.map((jointEditor) => (
              <EditorCard
                key={jointEditor.id}
                jointEditor={jointEditor}
                isAdminPanel={true}
              />
            ))}
          </div>
        </div>

        <div className=" mt-10">
          <h2 className="py-5  text-4xl mt-14 mb-10">
            {dictionary.editor_board.action_team}
          </h2>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-12">
            {actionTeam.map((person) => (
              <div key={person.id}>
                <Image
                  alt={"Photo of: " + person.name}
                  height={500}
                  width={500}
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${person.image}?key=optimized`}
                  className=" col-span-1 object-cover object-center aspect-square rounded-md "
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 675),
                  )}`}
                />

                <p className=" text-center text-2xl font-semibold py-5">
                  {person.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PaddingContainer>
    </>
  );
};

export default page;
