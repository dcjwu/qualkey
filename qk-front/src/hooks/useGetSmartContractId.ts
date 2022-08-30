import type { ICredentialChange } from "@interfaces/credentials.interface"

export const useGetSmartContractId = (credentialChange: ICredentialChange[]): string | undefined => {
   
   const sortedArray = credentialChange
      .sort((a, b) =>
         new Date(b.createdAt as Date).valueOf() - new Date(a.createdAt as Date).valueOf())

   return sortedArray[0].smartContractId
}