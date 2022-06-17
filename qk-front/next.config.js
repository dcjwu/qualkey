/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   serverRuntimeConfig: {
      // Will only be available on the server side
      apiUrl: process.env.PROCESSING_NETWORK
   },
   publicRuntimeConfig: {
      // Will be available on both server and client
      apiUrl: process.env.NEXT_PUBLIC_PROCESSING_URL
   },
   images: { domains: ["portal.rgsl.edu.lv"] }
}

module.exports = nextConfig
