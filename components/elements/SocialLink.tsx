import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

const SocialLink = ({ platform, link, isShareURL }: { platform: string; link: string; isShareURL?:boolean; }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter />;
      case "facebook":
        return <Facebook />;
      case "linkedin":
        return <Linkedin />;
      case "youtube":
        return <Youtube />;
      case "instagram":
        return <Instagram />;
    }
  };
  return <Link href={link}><div className={`${isShareURL ? "px-3 py-2 bg-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-800 hover:text-neutral-100 duration-100 ease-in-out transition-colors ": ""}`}>
    {getIcon(platform)}</div></Link>;
};

export default SocialLink;
