import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import siteConfig from "@/config/site";

const Footer = () => {
  return (
    <div className=" py-8 mt-10 border-t">
      <PaddingContainer>

        {/* Title Description */}
        <div>
          <h2 className=" text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className=" max-w-md mt-2 text-neutral-600 text-lg">
            {" "}
            {siteConfig.description}
          </p>
        </div>
        {/* Social and Currently At Section  */}
        <div className=" mt-6 flex flex-wrap justify-between gap-4">
          <div>
            <div className=" font-bold font-lg">#exploretheworld</div>
            <div>Social Links</div>
          </div>
          <div className=" flex flex-col items-end">
            <div className=" text-sm text-neutral-400 px-1">Currently At</div>
            <div className=" bg-white shadow-md rounded-md py-2 px-3 flex items-center gap-2 ">
                <div className=" bg-emerald-600 w-2 h-2 rounded-full"></div>
                {siteConfig.currentlyAt}
            </div>
          </div>
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
