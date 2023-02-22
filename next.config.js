/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    RECAPTCHA_PUBLIC: process.env.RECAPTCHA_PUBLIC,
    RECAPTCHA_PRIVATE: process.env.RECAPTCHA_PRIVATE,
    API_URL: process.env.API_URL,
    WEBSITE_SIGNATURE: process.env.WEBSITE_SIGNATURE,
  },
  // This allows CORS from Vercel deployment
  async headers() {
    return [
      {
        // Allow requests from your Vercel deployment
        source: "/",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://fit-script-website.vercel.app",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
