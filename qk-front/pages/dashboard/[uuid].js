import axios from "axios"
import getConfig from "next/config"
import Head from "next/head"
import { useRecoilState, useRecoilValue } from "recoil"

import { confirmWithdrawModalState, deleteCredentialsModalState, showEditCredentialsState, viewCertificateModalState } from "../../atoms"
import CredentialsInfo from "../../components/CredentialsInfo/CredentialsInfo"
import InstitutionViewCredentialsItem from "../../components/DashboardItem/InstitutionViewCredentialsItem"
import StudentViewCredentialsItem from "../../components/DashboardItem/StudentViewCredentialsItem"
import InstitutionEditCredentials from "../../components/Institution/InstitutionEditCredentials/InstitutionEditCredentials"
import InstitutionView from "../../components/Institution/InstitutionView/InstitutionView"
import StudentView from "../../components/Student/StudentView/StudentView"
import { IconShare } from "../../components/UI/_Icon"
import Button from "../../components/UI/Button/Button"
import Heading from "../../components/UI/Heading/Heading"
import ConfirmWithdrawModal from "../../components/UI/Modal/ConfirmWithdrawModal"
import DeleteCredentialsModal from "../../components/UI/Modal/DeleteCredentialsModal"
import ViewCertificateModal from "../../components/UI/Modal/ViewCertificateModal"
import Text from "../../components/UI/Text/Text"
import { userRoles } from "../../utils"
import Error from "../_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function CredentialsView({ data, userData, notificationsData, serverErrorMessage }) {
   
   const viewCertificateModal = useRecoilValue(viewCertificateModalState)
   const showEditCredentials = useRecoilValue(showEditCredentialsState)

   const [withdrawModal, setWithdrawModal] = useRecoilState(confirmWithdrawModalState)
   const [deleteCredentialsModal, setDeleteCredentialsModal] = useRecoilState(deleteCredentialsModalState)


   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>

   const { role } = userData

   const handleWithdrawalRequest = async () => {
      setWithdrawModal(true)
   }

   const handleDeleteCredentials = () => {
      setDeleteCredentialsModal(true)
   }

   if (role === userRoles.institution) return (
      <>
         <Head>
            <title>View Credentials | QualKey</title>
         </Head>
         <InstitutionView institution notificationsData={notificationsData} userData={userData}>
            <Heading blue h1>View Credentials</Heading>
            <Text large>browse all credential records</Text>
            <InstitutionViewCredentialsItem data={data[0]}/>
            {!showEditCredentials
               ? <CredentialsInfo data={data[0]}/>
               : <InstitutionEditCredentials data={data[0]}/>}
            <div className="withdraw__button" onClick={handleWithdrawalRequest}>
               {data[0].status !== "WITHDRAWN" && <Text grey>- Withdraw Credentials -</Text>}
            </div>
            {withdrawModal && <ConfirmWithdrawModal/>}
         </InstitutionView>
      </>
   )

   if (role === userRoles.student) return (
      <>
         <Head>
            <title>View Credentials | QualKey</title>
         </Head>
         <StudentView notificationsData={notificationsData} userData={userData}>
            <Heading blue h1>View Credentials</Heading>
            <Text large>view, share and manage your credentials</Text>
            <StudentViewCredentialsItem data={data[0]}/>
            <Button blue thin disabled={data[0].status !== "ACTIVATED"}>
               <div className="buttonRow">
                  <IconShare/>
                  <Text semiBold style={{ color: data[0].status !== "ACTIVATED" ? "white" : "" }}>Share Credential</Text>
               </div>
            </Button>
            <CredentialsInfo data={data[0]}/>
            <div className="withdraw__button" onClick={handleDeleteCredentials}>
               <Text grey>- Delete Credentials -</Text>
            </div>
            {viewCertificateModal && <ViewCertificateModal data={data[0]}/>}
            {deleteCredentialsModal && <DeleteCredentialsModal/>}
         </StudentView>
      </>
   )
}

export const getServerSideProps = async (ctx) => {
   const { req, query } = ctx

   try {
      const response = await axios.get(`${apiUrl}/credential?uuid=${query.uuid}`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const responseUser = await axios.get(`${apiUrl}/user/me`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const responseNotifications = await axios.get(`${apiUrl}/action`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data } = response
      const { data: userData } = responseUser
      const { data: notificationsData } = responseNotifications
      return { props: { data, userData, notificationsData } }
   } catch (error) {
      if (error.response.statusText === "Forbidden" || error.response.statusText === "Unauthorized") {
         return {
            redirect: {
               permanent: false,
               destination: "/"
            }
         }
      }
      return { props: { serverErrorMessage: error.response ? error.response.statusText : "Something went wrong" } }
   }
}