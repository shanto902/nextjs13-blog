"use client";
import Image from "next/image";

import React from "react";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PaddingContainer from "../layout/PaddingContainer";
const HeaderLogo = ({ locale }: { locale: string }) => {
  const pathname = usePathname();

  return (
    <>
      {(pathname === "/bn" || pathname === "/en") && (
        <Link href={`/${locale}/`}>
          {" "}
          <Image
            className="mx-auto aspect-square pt-8 hidden lg:block"
            src={logo}
            alt="logo"
            width={120}
            height={120}
          />
          <PaddingContainer>
            <hr className=" border-neutral-400 mt-4 hidden lg:block " />
          </PaddingContainer>
        </Link>
      )}
    </>
  );
};

export default HeaderLogo;
