"use client"
import Image from 'next/image';

import React from 'react'
import logo from "@/assets/logo.svg";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PaddingContainer from '../layout/PaddingContainer';
const HeaderLogo = ({locale}:{locale:string}) => {
    const pathname = usePathname()
    
  return (
    <>
      {(pathname === '/bn' || pathname === '/en')  && <Link href={`/${locale}/`}>
        {" "}
        <Image
          className="mx-auto pt-8 hidden xl:block"
          src={logo}
          alt="logo"
          width={80}
          height={80}
        />
        <PaddingContainer>
         <hr className=" border-neutral-400 mt-4 hidden xl:block " />
         </PaddingContainer>
      </Link>}
      </>
  )
}

export default HeaderLogo