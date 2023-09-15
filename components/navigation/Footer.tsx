import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import siteConfig from "@/config/site";
import SocialLink from "../elements/SocialLink";
import logo from '@/assets/logo-nav.png'
import Image from "next/image";

const Footer = () => {
  return (
    <div className=" py-8 mt-10 border-t bg-[#FCFCFC]">
      <PaddingContainer>

        {/* Title Description */}
       <div className=" grid grid-cols-3 ">
       <div>
          <Image src={logo} alt="Logo" width={135} height={160} />
       
       <p className=" mt-4 grid grid-cols-5 w-fit space-y-2  text-sm">
        <span className=" font-bold mt-2">Editor</span> <span className=" text-center"> : </span>  <span className=" col-span-3 text-left">Kazi Anisuddin Iqbal</span> 
        <span className=" font-bold">Email</span> <span className=" text-center">  : </span>  <span className=" col-span-3 text-left">sthapattyanonirman</span> 
        <span className=" font-bold">Phone</span> <span className=" text-center">  : </span>  <span className=" col-span-3 text-left">+880-1679-090901</span> 
        <span className=" font-bold">Address</span> <span className=" text-center">  : </span>  <span className=" col-span-3 text-left">Gagan Shirish </span> 
        <span className=" col-span-5">76 & 76/1, Panthapath (3rd Floor), Dhaka-1215</span>
       </p>
        </div>
        <div>

        </div>
        <div className=" mt-6 flex flex-wrap justify-between gap-4">
          <div>
            <div className=" flex gap-3 items-center text-neutral-600 mt-2">
            <SocialLink platform="twitter" link={siteConfig.socialLinks.twitter}/>
            <SocialLink platform="youtube" link={siteConfig.socialLinks.youtube}/>
            <SocialLink platform="facebook" link={siteConfig.socialLinks.facebook}/>
            <SocialLink platform="linkedin" link={siteConfig.socialLinks.linkedin}/>
            </div>
          </div>
        </div>
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
