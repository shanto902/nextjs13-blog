/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: "images.unsplash.com",
                protocol: "https"
            },{
                hostname: "sthapattaya-o-nirman.up.railway.app",
                protocol: "https"
            }
        ]
    }
}

module.exports = nextConfig
