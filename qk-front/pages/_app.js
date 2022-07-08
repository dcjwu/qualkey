import "../assets/styles/helpers/_reset.scss"
import "../assets/styles/_globals.scss"
import { Amplify } from "aws-amplify"
import Head from "next/head"
import NextNProgress from "nextjs-progressbar"
import { RecoilRoot } from "recoil"

Amplify.configure({
   aws_cloud_logic_custom: [
      {
         name: "Qualkey-dev-env", // (required) - API Name (This name is used used in the client app to identify the API - API.get('your-api-name', '/path'))
         endpoint: "https://api.igor-dev.com/", // (required) -API Gateway URL + environment
         region: "eu-north-1" // (required) - API Gateway region
      }
   ],
   ssr: true
})

function MyApp({ Component, pageProps }) {
   return (
      <>
         <Head>
            <meta content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
            <meta content="initial-scale=1.0, width=device-width" name="viewport" />
            <title>Certificate Authentication | QualKey</title>
         </Head>

         <RecoilRoot>
            <NextNProgress color="#0880ce" height={2} options={{
               showSpinner: false,
               easing: "ease",
               speed: 500,
            }}/>
            <Component {...pageProps} />
         </RecoilRoot>
      </>
   )
}

export default MyApp
