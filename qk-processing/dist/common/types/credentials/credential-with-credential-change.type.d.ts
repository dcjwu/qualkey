import { Prisma } from "@prisma/client";
declare function getCredentialWithCredentialChange(): Promise<(import(".prisma/client").Credential & {
    credentialChanges: import(".prisma/client").CredentialChange[];
})[]>;
export declare type CredentialWithCredentialChange = Prisma.PromiseReturnType<typeof getCredentialWithCredentialChange>;
export {};
