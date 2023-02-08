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
};

module.exports = nextConfig;
