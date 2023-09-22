// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/api/nest/:path*",
                    destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/:path*",
                },
            ],
            fallback: [
                {
                    source: "/api/nest/:path*",
                    destination: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://industries-adapted-grande-architecture.trycloudflare.com/' + "/api/v1/:path*",
                }]
        };
    },
};
module.exports = nextConfig;
