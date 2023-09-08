export interface SiteConfig {
    siteName: string;
    description: string;
    currentlyAt: string;
    socialLinks: {
        twitter:string;
        github:string;
        facebook:string;
    }
}

const siteConfig : SiteConfig = {
    siteName: "Explorer",
    description : "A travel blog to learn next js 13 with typescript",
    currentlyAt: "Bangladesh",
    socialLinks: {
        twitter:"https://www.twitter.com/shanto902" ,
        github :"https://github.com/shanto902/",
        facebook: "https://www.facebook.com/shanto902"
    }

};
export default siteConfig;