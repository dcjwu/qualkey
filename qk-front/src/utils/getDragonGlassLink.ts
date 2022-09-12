export const getDragonGlassLink = (smartContractId: string | undefined): string => {
   const environment = process.env.NEXT_PUBLIC_ENV

   if (smartContractId) {
      if (environment === "dev") return `https://testnet.dragonglass.me/hedera/contracts/${smartContractId}`
      if (environment === "prod") return `https://app.dragonglass.me/hedera/contracts/${smartContractId}`
   }

   return "https://app.dragonglass.me/hedera/home"
}
