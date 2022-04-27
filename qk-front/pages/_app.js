import "../assets/styles/helpers/_reset.scss"
import "../assets/styles/_globals.scss"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
   return (
      <>
         <Head>
            <meta content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
            <meta content="initial-scale=1.0, width=device-width" name="viewport" />
            <title>Certificate Authentication | QualKey</title>
         </Head>

         <Component {...pageProps} />
      </>
   )
}

export default MyApp
