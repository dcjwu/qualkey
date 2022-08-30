/** @type {import('next').NextConfig} */

module.exports = {
   async redirects() { // eslint-disable-line @typescript-eslint/explicit-function-return-type
      return [
         {
            source: "/",
            destination: "/dashboard",
            permanent: true,
         },
      ]
   },
   reactStrictMode: true,
   images: { domains: ["public-images-qualkey-test.s3.eu-north-1.amazonaws.com"] }
}
