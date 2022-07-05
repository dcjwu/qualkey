import { CredentialShare, User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
export declare class CredentialsShareRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getByUuid(uuid: string): Promise<CredentialShare>;
    findAllByUser(user: User): Promise<CredentialShare[]>;
    findAllByCredentialUuid(user: User, credentialUuid: string): Promise<CredentialShare[]>;
    findAllNotExpiredByCredentialUuid(credentialUuid: string): Promise<CredentialShare[]>;
}
