import { shimmer, toBase64 } from "@/utils/shimmer";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import { jointEditor } from "@/types/collection";

interface jointEditorProps {
  jointEditor: jointEditor;
  isAdminPanel?: boolean;
}
const getParsedHtml = (body: string) => {
  return parse(body);
};
const EditorCard = ({ jointEditor, isAdminPanel }: jointEditorProps) => {
  return (
    <div className={`${isAdminPanel ? "gap-3" : "gap-5"}  grid grid-cols-2 `}>
      <Image
        alt={"Photo of: " + jointEditor.name}
        height={500}
        width={500}
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${jointEditor.image}?key=optimized`}
        className="col-span-1 max-w-[150px] place-self-end object-cover object-center aspect-square rounded-full "
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(1200, 675),
        )}`}
      />
      <div className="col-span-1  place-self-center">
        <h2
          className={`${isAdminPanel ? " text-xl" : "text-2xl"} font-semibold`}
        >
          {" "}
          {jointEditor.name}
        </h2>
        <div className={` ${isAdminPanel ? "mt-2" : "mt-3"} editor-info `}>
          {getParsedHtml(jointEditor.info)}
        </div>
      </div>
    </div>
  );
};

export default EditorCard;
