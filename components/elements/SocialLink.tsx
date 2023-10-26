import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

const SocialLink = ({
  platform,
  link,
  isShareURL,
}: {
  platform: string;
  link: string;
  isShareURL?: boolean;
}) => {
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
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div
        className={` p-1 ${
          isShareURL
            ? "bg-accent rounded-full text-secondary hover:bg-base-100 hover:text-red-800 duration-100 ease-in-out transition-colors "
            : " bg-accent rounded-full text-secondary hover:bg-secondary hover:text-red-800 duration-100 ease-in-out "
        }`}
      >
      <p className="w-6 h-6">  {getIcon(platform)}</p>
      </div>
    </a>
  );
};

export default SocialLink;
