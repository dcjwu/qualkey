import React from "react"

import dynamic from "next/dynamic"

import { url } from "@constants/urls"
import { Button, Heading, Modal, Text } from "@lib/components"

import type { CertificateType } from "@customTypes/components"
import type { CertificateShareModalEmailType, CertificateShareModalType } from "@customTypes/components/Modals"


const Certificate = dynamic<CertificateType>(() => import("@components/Certificate/Certificate")
   .then(module => module.Certificate))

const CertificateShareModalEmail = dynamic<CertificateShareModalEmailType>(() => import("@components/Modals")
   .then(module => module.CertificateShareModalEmail))

export const CertificateShareModal: React.FC<CertificateShareModalType> = ({
   data,
   isOpen,
   handleCloseModal
}): JSX.Element => {

   const [isShareEmailModalOpen, setIsShareEmailModalOpen] = React.useState<boolean>(false)

   return (
      <>
         <Modal handleCloseModal={handleCloseModal} isOpen={isOpen}>
            <Heading color="blue" component="h3" size="md">
               Your certificate
            </Heading>
            <Certificate showQR data={data}/>
            <Text thin color="500" component="p"
                  size="paragraph"
                  style={{ marginTop: ".8rem" }}>
               Your QualKey certificate may look different to the paper or digital certificate issued by your Academic
               institution. QualKey adds a unique QR code so that third parties can securely and instantly authenticate
               your qualification.
            </Text>
            <div style={{
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               gap: "1.6rem",
               marginTop: "1.2rem"
            }}>
               <Button icon={<svg fill="none" height="24" viewBox="0 0 24 24"
                                  width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                     stroke="white" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M16.5 21.75C18.1569 21.75 19.5 20.4069 19.5 18.75C19.5 17.0931 18.1569 15.75 16.5 15.75C14.8431 15.75 13.5 17.0931 13.5 18.75C13.5 20.4069 14.8431 21.75 16.5 21.75Z"
                     stroke="white" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M16.5 8.25C18.1569 8.25 19.5 6.90685 19.5 5.25C19.5 3.59315 18.1569 2.25 16.5 2.25C14.8431 2.25 13.5 3.59315 13.5 5.25C13.5 6.90685 14.8431 8.25 16.5 8.25Z"
                     stroke="white" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M13.9777 6.87207L8.52148 10.3783" stroke="white" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M8.52148 13.6221L13.9777 17.1283" stroke="white" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"/>
               </svg>} loading={false} size="md"
                       style={{ marginTop: 0 }}
                       variant="primary"
                       onClick={(): void => setIsShareEmailModalOpen(true)}>
                  Email
               </Button>
               <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}/${data.did}`} rel="noreferrer"
                  target="_blank">
                  <Button icon={<svg fill="none" height="24" viewBox="0 0 24 24"
                                     width="24" xmlns="http://www.w3.org/2000/svg"
                                     xmlnsXlink="http://www.w3.org/1999/xlink">
                     <rect fill="url(#pattern0)" height="24" width="24"/>
                     <defs>
                        <pattern height="1" id="pattern0" patternContentUnits="objectBoundingBox"
                                 width="1">
                           <use transform="scale(0.000976562)" xlinkHref="#image0_2685_3437"/>
                        </pattern>
                        <image height="1024" id="image0_2685_3437" width="1024"
                               xlinkHref="data:image/png;base64,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"/>
                     </defs>
                  </svg>} loading={false} size="md"
                          style={{ marginTop: 0 }}
                          variant="secondary">Linkedin</Button>
               </a>
            </div>
         </Modal>

         {isShareEmailModalOpen &&
            <CertificateShareModalEmail handleCloseModal={(): void => setIsShareEmailModalOpen(false)} isOpen={isShareEmailModalOpen}
                                        name={data.graduatedName}
                                        uuid={data.uuid}/>}
      </>
   )
}