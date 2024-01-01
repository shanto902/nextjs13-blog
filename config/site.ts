export interface SiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  siteURL: string;
  socialLinks: {
    twitter: string;
    github: string;
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "Explorer",
  siteURL: "https://sthapattya-o-nirman.com/",
  description: "A travel blog to learn next js 13 with typescript",
  currentlyAt: "Bangladesh",
  socialLinks: {
    twitter: "https://www.twitter.com/",
    github: "https://github.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    linkedin: "https://www.linkedin.com/",
  },
};
export default siteConfig;
