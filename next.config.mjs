/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: "images.unsplash.com",
                protocol: "https"
            },{
                hostname: "sthapattaya-o-nirman.up.railway.app",
                protocol: "https"
            },{
                hostname: "directus-production-616f.up.railway.app",
                protocol: "https"
            }
        ]
    }
}

export default withPlaiceholder(nextConfig);
