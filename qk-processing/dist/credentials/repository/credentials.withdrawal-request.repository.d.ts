import { CredentialsWithdrawalRequest } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
export declare class CredentialsWithdrawalRequestRepository {
    private prismaService;
    constructor(prismaService: PrismaService);
    hasCredentialsUuid(credentialsUuid: string): Promise<boolean>;
    getByUuid(uuid: string): Promise<CredentialsWithdrawalRequest>;
}
