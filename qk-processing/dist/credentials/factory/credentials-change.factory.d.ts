import { Credential, CredentialChange, User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
export declare class CredentialsChangeFactory {
    private prisma;
    constructor(prisma: PrismaService);
    create(credentials: Credential, hash: string): Promise<CredentialChange>;
    createFromUpdate(credentials: Credential, hash: string, changedBy: User, changedFrom: string[], changedTo: string[], fieldName: string[]): Promise<CredentialChange>;
}
