import { Html, Main, NextScript, Head } from "next/document"

export default function MyDocument() {
   return (
      <Html>
         <Head>
            <meta content="Qualkey creates a secure, permanent and auditable record of certifications. Learners can instantly share their secure and verified credentials with a click of a button. Employers use Qualkey to verify a candidate's certification record reliably and quickly. Saving time and cost while building trust."
               name="description"/>
            <link href="/favicon.ico" rel="icon"/>
            <link href="https://fonts.googleapis.com" rel="preconnect"/>
            <link crossOrigin="true" href="https://fonts.gstatic.com" rel="preconnect"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
               rel="stylesheet"/>
         </Head>
         <body>
            <Main/>
            <NextScript/>
         </body>
      </Html>
   )
}