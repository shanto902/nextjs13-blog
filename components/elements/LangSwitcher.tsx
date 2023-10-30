"use client";

import { englishFont } from "@/app/[lang]/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LangSwitcher = ({ locale }: { locale: string }) => {
  const pathName = usePathname();

  const redirectTarget = (targetLanguage: string) => {
    if (!pathName) return " /";
    const segments = pathName.split("/");
    segments[1] = targetLanguage;
    return segments.join("/");
  };
  return (
    <div className="bg-base-100 border-accent border-2 lg:border w-32 h-11 lg:w-16 lg:h-7 rounded-3xl flex items-center justify-center">
      <Link
        className={`${locale === "en" ? "cursor-default" : ""} flex-1`}
        href={redirectTarget("en")}
        locale="en"
      >
        <span
          className={`  rounded-full cursor-pointer text-center text-lg lg:text-xs font-bold flex justify-center items-center ${
            locale === "en" ? " p-2  text-red-700" : " "
          }`}
        >
          {/* {" "} */}
          EN
        </span>
      </Link>
      <div className=" w-[1px] bg-accent h-7"></div>
      <Link
        className={`${locale === "bn" ? "cursor-default" : ""} flex-1`}
        href={redirectTarget("bn")}
        locale="bn"
      >
        <span
          className={`  rounded-full cursor-pointer text-center text-lg lg:text-xs font-bold flex justify-center items-center ${
            locale === "bn" ? " p-2  text-red-700" : " "
          }`}
        >
          বাং
        </span>
      </Link>
    </div>
  );
};

export default LangSwitcher;
