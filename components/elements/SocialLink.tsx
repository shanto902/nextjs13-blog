import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

const SocialLink = ({ platform, link }: { platform: string; link: string }) => {
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
  return <Link href={link}>{getIcon(platform)}</Link>;
};

export default SocialLink;
