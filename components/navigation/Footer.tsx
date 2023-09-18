import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import siteConfig from "@/config/site";
import SocialLink from "../elements/SocialLink";
import logo from '@/assets/logo.svg'
import Image from "next/image";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";

const Footer = async ({locale}:{locale:string}) => {
  const liStyle = 'pt-2 font-bold border-t-4 uppercase hover:text-red-800  hover:border-red-800'
  const dictionary = await getDictionary(locale)
  return (
    <div className=" py-8 mt-10 border-t bg-[#FCFCFC]">
      <PaddingContainer>

        {/* Title Description */}
       <div className=" grid grid-cols-3 ">
       <div className=" col-span-1">
          <Image src={logo} alt="Logo" width={135} height={160} />
       
       <p className=" mt-4 grid grid-cols-5  w-fit space-y-2  text-sm">
        <span className=" font-bold mt-2">{dictionary.footer.editor}</span> <span className=" text-center"> : </span>  <span className=" col-span-3 text-left">{dictionary.footer.editorName}</span> 
        <span className=" font-bold">{dictionary.footer.email}</span> <span className=" text-center">  : </span>  <span className=" col-span-3 text-left">sthapattyanonirman@gmail.com</span> 
        <span className=" font-bold">{dictionary.footer.phone}</span> <span className=" text-center">  : </span>  <span className=" col-span-3 text-left">{dictionary.footer.phoneNo}</span> 
        <span className=" font-bold">{dictionary.footer.address}</span> <span className=" text-center">  : </span>  <span className=" col-span-3 text-left">{dictionary.footer.addressValue}</span> 
        <span className=" col-span-5">{dictionary.footer.addressValue2}</span>
       </p>
       <button className=" btn bg-black text-white mt-4 hover:text-black">Editorial Board</button>
        </div>
     
  
      
       
    <ul className='col-span-2 grid grid-cols-2 gap-x-8'>
    <Link className = {liStyle} href={`/${locale}/news`}><li >{dictionary.navigation.links.news}</li></Link>
    <Link className = {liStyle} href={`/${locale}/concepts`}><li >{dictionary.navigation.links.concepts}</li></Link>
    <Link className = {liStyle} href={`/${locale}/arts`}><li >{dictionary.navigation.links.arts}</li></Link>
    <Link className = {liStyle} href={`/${locale}/heritage`}> <li >{dictionary.navigation.links.heritage}</li></Link>
    <Link className = {liStyle} href={`/${locale}/personality`}> <li >{dictionary.navigation.links.personality}</li></Link>
    <Link className = {liStyle} href={`/${locale}/dialogue`}>   <li >{dictionary.navigation.links.dialogue}</li></Link>
    <Link className = {liStyle} href={`/${locale}/projects`}>   <li >{dictionary.navigation.links.projects}</li></Link>
    <Link className = {liStyle} href={`/${locale}/student-projects`}>  <li >{dictionary.navigation.links.studentProjects}</li></Link>
    <Link className = {liStyle} href={`/${locale}/technology`}>  <li >{dictionary.navigation.links.technology}</li></Link>
    <Link className = {liStyle} href={`/${locale}/archive`}> <li >{dictionary.navigation.links.archive}</li></Link>
    <Link className = {liStyle} href={`/${locale}/environment-and-planning`}>  <li >{dictionary.navigation.links.environmentPlaning}</li></Link>
        <div>
            <div className=" flex gap-3 items-center text-neutral-600 mt-2">
            <SocialLink platform="twitter" link={siteConfig.socialLinks.twitter}/>
            <SocialLink platform="youtube" link={siteConfig.socialLinks.youtube}/>
            <SocialLink platform="facebook" link={siteConfig.socialLinks.facebook}/>
            <SocialLink platform="linkedin" link={siteConfig.socialLinks.linkedin}/>
            </div>
          </div>
    </ul>

          
   
        {/* Social and Currently At Section  */}
       </div>






        {/* Bottom Section */}
        <div className=" border-t py-3 flex flex-warp gap-4 items-center justify-between mt-16 flex-warp">
          <div className=" text-sm text-neutral-400">
          All rights reserved | © Copyright {new Date().getFullYear()} 
          </div>
          <div className=" text-sm">
            Made with love by Ashik Ali Shanto
          </div>
          
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Footer;
