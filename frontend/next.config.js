// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/api/nest/:path*",
                    destination: "http://localhost:5000/api/v1/:path*",
                },
            ],
            fallback: [
                {
                    source: "/api/nest/:path*",
                    destination: "http://localhost:5000/api/v1/:path*",
                }]
        };
    },
};
module.exports = nextConfig;