import { CredentialChange } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
export declare class CredentialsChangeRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getById(id: number): Promise<CredentialChange>;
    hasHash(hash: string): Promise<boolean>;
    getByHash(hash: string): Promise<CredentialChange>;
    getLastByCredentialsDid(credentialDid: string): Promise<CredentialChange>;
}
