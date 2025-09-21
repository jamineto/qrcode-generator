/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    basePath: '/qrcode-generator',
    assetPrefix: '/qrcode-generator/',
    trailingSlash: true
};

export default nextConfig;
