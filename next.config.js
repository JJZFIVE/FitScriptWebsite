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
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
