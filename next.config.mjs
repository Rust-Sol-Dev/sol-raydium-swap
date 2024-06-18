/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
        pathname: "**/*",
      },
    ],
  },
};

export default nextConfig;
