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
        return <Twitter size={18} strokeWidth={2} />;
      case "facebook":
        return <Facebook size={18} strokeWidth={2} />;
      case "linkedin":
        return <Linkedin size={18} strokeWidth={2} />;
      case "youtube":
        return <Youtube size={18} strokeWidth={2} />;
      case "instagram":
        return <Instagram size={18} strokeWidth={2} />;
    }
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div
        className={` p-[3px]${
          isShareURL
            ? "bg-accent  text-secondary hover:bg-base-100 hover:text-red-800 duration-100 ease-in-out transition-colors "
            : " bg-accent  text-secondary hover:bg-secondary hover:text-red-800 duration-100 ease-in-out "
        }`}
      >
        <p className="text-xs"> {getIcon(platform)}</p>
      </div>
    </a>
  );
};

export default SocialLink;
