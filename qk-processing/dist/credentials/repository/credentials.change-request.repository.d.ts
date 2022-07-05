import { CredentialChangeRequest } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
export declare class CredentialsChangeRequestRepository {
    private prisma;
    constructor(prisma: PrismaService);
    hasActiveByCredentialsUuid(credentialUuid: string): Promise<boolean>;
    getByUuid(uuid: string): Promise<CredentialChangeRequest>;
}
