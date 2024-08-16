/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.themealdb.com"],
    unoptimized: true,
  },
  basePath: "/Cooking-Website", // Set the base path to match your GitHub repository name
  assetPrefix: "/Cooking-Website/", // Prefix for static assets
};

export default nextConfig;
